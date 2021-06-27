import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore'
import { notEmpty } from 'common/func'
import { TUser } from 'models'
import { TConversation, TMessage, TMessageType } from 'scenes/chat/models'

enum CollectionNames {
  users = 'users',
  conversations = 'conversations',
  messages = 'messages',
}

/**
 * Make a conversation key by join a sorted user id by alphabet
 * @param users list of user
 */
function createConversationKey(users: TUser[]): string {
  const array = users.map(u => u.id)
  array.sort((a, b) => (a > b ? 1 : -1))

  const key = array.join('_')
  return key
}

async function loadUser(userId: string) {
  const document = await firestore()
    .collection<TUser>(CollectionNames.users)
    .doc(userId)
    .get()
  const data = document.data()

  return data
}

async function loadConversations(
  user: TUser
): Promise<(TConversation | null)[]> {
  const conversationsPromise = await firestore()
    .collection<TUser>(CollectionNames.users)
    .doc(user.id)
    .collection(CollectionNames.conversations)
    .get()
  const promises = conversationsPromise.docs
    .map(c => c.data())
    .map(({ id }) => {
      return loadConversation(id, user)
    })

  const conversations = await Promise.all(promises)

  return conversations
}

async function loadUsers() {
  const userPromise = await firestore()
    .collection<TUser>(CollectionNames.users)
    .get()
  const users = userPromise.docs.map(t => t.data())
  return users
}

function listenForUserAdded(
  currentUser: TUser,
  onUserAdded: (users: TUser[]) => void
) {
  return firestore()
    .collection<TUser>(CollectionNames.users)
    .onSnapshot(snapshot => {
      let users = snapshot
        ?.docChanges()
        .filter(t => t.type === 'added')
        .map(doc => {
          // user added
          const user = doc.doc.data()
          return user
        })
      // Filter out current user
      users = users.filter(u => u.id != currentUser.id)
      if (users.length > 0) {
        onUserAdded(users)
      }
    })
}

function listenForConversationAdd(
  user: TUser,
  onAdded: (conversations: TConversation[]) => void
) {
  return firestore()
    .collection(CollectionNames.users)
    .doc(user.id)
    .collection(CollectionNames.conversations)
    .onSnapshot(async snapshot => {
      const conversationsPromises = snapshot
        ?.docChanges()
        .filter(t => t.type === 'added')
        .map(async doc => {
          const conversationId = doc.doc.data().id
          console.tron.log('conversationId', conversationId)
          const conversation = await loadConversation(conversationId, user)
          return conversation
        })
      const conversations = await Promise.all(conversationsPromises)

      const filtered = conversations.filter(notEmpty)

      if (filtered.length > 0) {
        onAdded(filtered)
      }
    })
}

async function loadConversation(
  id: string,
  user: TUser
): Promise<TConversation | null> {
  const snapshot = await firestore()
    .collection<TConversation>(CollectionNames.conversations)
    .doc(id)
    .get()

  if (!snapshot) {
    return null
  }

  const conversation = snapshot.data()

  if (!conversation) {
    return null
  }

  // get users array
  const usersRef = conversation.users
  const usersPromises = usersRef.map(async userRef => {
    if (userRef.id === user.id) {
      return user
    }
    const mUser = await loadUser(userRef.id)
    return mUser
  })
  const users = await Promise.all(usersPromises)
  conversation.users = users.filter(notEmpty)
  return conversation
}

function getUserRef(user: TUser) {
  return firestore().collection<TUser>(CollectionNames.users).doc(user.id)
}

async function filterConversation(
  user1: TUser,
  user2: TUser
): Promise<TConversation | undefined> {
  const users = [user1, user2]
  const conversationKey = createConversationKey(users)

  const conversationsRef: FirebaseFirestoreTypes.Query<TConversation> = firestore()
    .collection<TConversation>(CollectionNames.conversations)
    .where('conversationKey', '==', conversationKey)

  const conversations = (await conversationsRef.get()).docs.map(t => {
    const data = t.data()
    data.users = users
    return data
  })

  if (conversations.length > 0) {
    return conversations[0]
  }
}

async function startConversation(
  user1: TUser,
  user2: TUser
): Promise<TConversation> {
  // Search conversation
  const conversation = await filterConversation(user1, user2)
  if (conversation) {
    return conversation
  } else {
    // Create conversation if it's not existing
    return createConversation(user1, user2)
  }
}

async function createConversation(
  user1: TUser,
  user2: TUser
): Promise<TConversation> {
  const conversationRef = firestore()
    .collection(CollectionNames.conversations)
    .doc()
  const conversationId = conversationRef.id
  const now = Date.now()
  const user1Ref = getUserRef(user1)
  const user2Ref = getUserRef(user2)
  const userIds = [user1.id, user2.id]
  const data = {
    id: conversationId,
    conversationKey: createConversationKey([user1, user2]),
    userIds,
    createdAt: now,
    updatedAt: now,
    users: [user1Ref, user2Ref],
    lastMessage: '',
  }

  // create conversation ref
  const createConversationRef = firestore()
    .collection(CollectionNames.conversations)
    .doc(conversationId)

  try {
    await firestore().runTransaction(async t => {
      // Create new conversation in /conversations
      await t.set(createConversationRef, data)

      // create conversation in users/{id}/conversations
      const conversationData = {
        id: conversationId,
        conversationKey: createConversationKey([user1, user2]),
        createdAt: now,
        updatedAt: now,
      }
      const user1ConversationRef = user1Ref
        .collection(CollectionNames.conversations)
        .doc(conversationId)
      await t.set(user1ConversationRef, conversationData)

      const user2ConversationRef = user2Ref
        .collection(CollectionNames.conversations)
        .doc(conversationId)
      await t.set(user2ConversationRef, conversationData)
    })
  } catch (e) {
    throw e
  }

  const conversation: TConversation = {
    id: conversationId,
    conversationKey: createConversationKey([user1, user2]),
    createdAt: now,
    updatedAt: now,
    users: [user1, user2],
    userIds,
    lastMessage: '',
    unreadCount: 0,
  }

  return conversation
}

/**
 * Listen new messages added, modified or removed
 * @param conversation The conversation info
 * @param onMessageReceived This callback will be trigger when receive added message for the conversation
 */
function listenForMessages(
  conversation: TConversation,
  onMessageReceived: (message: TMessage) => void
) {
  return firestore()
    .collection(CollectionNames.conversations)
    .doc(conversation.id)
    .collection(CollectionNames.messages)
    .orderBy('createdAt')
    .onSnapshot(snapshot => {
      snapshot?.docChanges().forEach(doc => {
        switch (doc.type) {
          case 'added':
            // message arrived;
            const message = doc.doc.data() as TMessage

            onMessageReceived(message)
            break

          case 'modified':
            // TODO: Modified message
            break

          case 'removed':
            // TODO: Removed message
            break

          default:
            break
        }
      })
    })
}

async function sendMessage(
  conversationId: string,
  senderId: string,
  content: string,
  type: TMessageType,
  unread: string[]
) {
  const now = Date.now()
  const doc = firestore()
    .collection(CollectionNames.conversations)
    .doc(conversationId)
    .collection(CollectionNames.messages)
    .doc()

  try {
    await firestore().runTransaction(async t => {
      // send message to /conversations/{id}/messages
      t.set(doc, {
        id: doc.id,
        createdAt: now,
        content,
        senderId,
        type,
        unread,
      })

      // update last message to /conversations/{id}/
      t.update(
        firestore()
          .collection(CollectionNames.conversations)
          .doc(conversationId),
        {
          updatedAt: now,
          lastMessage: content,
        }
      )
    })
  } catch (error) {
    console.tron.log('sendMessage error', error)
    throw error
  }
}

/**
 * Listen for conversation updated. MUST to unsubscribe this listener
 * @param conversationId conversation id
 * @param currentUser current logged in user
 * @param onChanged The callback will be trigger when received the updated conversation
 */
function listenForConversationChanged(
  conversationId: string,
  currentUser: TUser | undefined | null,
  onChanged: (conversation: TConversation) => void
) {
  return firestore()
    .collection(CollectionNames.conversations)
    .doc(conversationId)
    .onSnapshot(async snapshot => {
      // conversation data
      const data = snapshot?.data()
      const conversation = data as TConversation
      // get users array
      const usersRef = conversation.users
      const usersPromises = usersRef.map(async userRef => {
        if (userRef.id === currentUser?.id) {
          return { ...currentUser }
        }
        const mUser = await loadUser(userRef.id)
        return mUser
      })
      const users = await Promise.all(usersPromises)
      conversation.users = users.filter(notEmpty)

      console.log('listenForConversationChanged', data)

      onChanged(conversation)
    })
}

/**
 * Load unread count of the conversation that user are attending
 * @param conversationId Conversation id
 * @param userId user id
 */
async function loadUnreadCount(conversationId: string, userId: string) {
  const data = await firestore()
    .collection(CollectionNames.conversations)
    .doc(conversationId)
    .collection(CollectionNames.messages)
    .where('unread', 'array-contains', userId)
    .get()
  return data.docs.length
}

function listenForMessagesUnreadChanged(
  conversationId: string,
  userId: string,
  onUnreadChange: (unreadCount: number) => void
) {
  return firestore()
    .collection(CollectionNames.conversations)
    .doc(conversationId)
    .collection(CollectionNames.messages)
    .onSnapshot(async () => {
      const unreadCount = await loadUnreadCount(conversationId, userId)
      onUnreadChange(unreadCount)
    })
}

async function markMessageAsRead(
  conversationId: string,
  messageId: string,
  userId: string
) {
  try {
    await firestore()
      .collection(CollectionNames.conversations)
      .doc(conversationId)
      .collection(CollectionNames.messages)
      .doc(messageId)
      .update({
        unread: firestore.FieldValue.arrayRemove(userId),
      })
  } catch (e) {
    console.tron.log(e)
  }
}

export const ChatServices = {
  loadUser,
  loadUsers,
  listenForUserAdded,

  loadConversations,
  listenForConversationChanged,
  listenForConversationAdd,
  startConversation,

  sendMessage,
  markMessageAsRead,
  listenForMessagesUnreadChanged,
  listenForMessages,
}
