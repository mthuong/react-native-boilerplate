import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore'
import { notEmpty } from 'common/func'
import { TConversation } from 'models/conversation'
import { TMessage, TMessageType } from 'models/Message'
import { TUser } from 'models/user'

enum CollectionNames {
  users = 'users',
  conversations = 'conversations',
  messages = 'messages',
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
    .map((c) => c.data())
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
  const users = userPromise.docs.map((t) => t.data())
  return users
}

function listenForUserAdded(
  currentUser: TUser,
  onUserAdded: (users: TUser[]) => void
) {
  return firestore()
    .collection<TUser>(CollectionNames.users)
    .onSnapshot((snapshot) => {
      if (!snapshot) {
        return
      }
      let users = snapshot
        .docChanges()
        .filter((t) => t.type === 'added')
        .map((doc) => {
          // user added
          const user = doc.doc.data()
          return user
        })
      // Filter out current user
      users = users.filter((u) => u.id != currentUser.id)
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
    .onSnapshot(async (snapshot) => {
      if (!snapshot) {
        return
      }
      const conversationsPromises = snapshot
        .docChanges()
        .filter((t) => t.type === 'added')
        .map(async (doc) => {
          const conversationId = doc.doc.data().id
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
  const conversations = (
    await firestore()
      .collection<TConversation>(CollectionNames.conversations)
      .where('id', '==', id)
      .get()
  ).docs
    .map((t) => {
      const data = t.data()
      return data
    })
    .map(async (t) => {
      // get users array
      const usersRef = t.users
      const usersPromises = usersRef.map(async (userRef) => {
        if (userRef.id === user.id) {
          return user
        }
        const mUser = await loadUser(userRef.id)
        return mUser
      })
      const conversation = t
      const users = await Promise.all(usersPromises)
      conversation.users = users.filter(notEmpty)
      return conversation
    })
  if (conversations.length > 0) {
    return conversations[0]
  }
  return null
}

function getUserRef(user: TUser) {
  return firestore().collection<TUser>(CollectionNames.users).doc(user.id)
}

async function filterConversation(
  user1: TUser,
  user2: TUser
): Promise<TConversation | undefined> {
  let conversationsRef: FirebaseFirestoreTypes.Query<TConversation> | undefined
  const users = [user1, user2]

  conversationsRef = firestore()
    .collection<TConversation>(CollectionNames.conversations)
    .where('members', 'array-contains', user2.id)
    .where('members', 'array-contains', user1.id)

  // users.forEach((user) => {
  //   if (!conversationsRef) {
  //     conversationsRef = firestore()
  //       .collection<TConversation>(CollectionNames.conversations)
  //       .where('members', '==', user.id)
  //   } else {
  //     conversationsRef = conversationsRef.where('members', '==', user.id)
  //   }
  // })

  console.tron.log('conversationsRef', conversationsRef)

  if (!conversationsRef) {
    return
  }

  const conversations = (await conversationsRef.get()).docs.map((t) => {
    const data = t.data()
    data.users = users
    return data
  })

  console.tron.log('conversations', conversations)

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
    console.tron.log('filterConversation', conversation)
    return conversation
  } else {
    // Create conversation if it's not existing
    // return createConversation(user1, user2)
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
  const data = {
    id: conversationId,
    createdAt: now,
    updatedAt: now,
    users: [user1Ref, user2Ref],
    lastMessage: '',
    unreadCount: 0,
  }

  // create conversation ref
  const createConversationRef = firestore()
    .collection(CollectionNames.conversations)
    .doc(conversationId)

  try {
    await firestore().runTransaction(async (t) => {
      // Create new conversation in /conversations
      await t.set(createConversationRef, data)

      // create conversation in users/{id}/conversations
      const conversationData = {
        id: conversationId,
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
    createdAt: now,
    updatedAt: now,
    users: [user1, user2],
    lastMessage: '',
    unreadCount: 0,
  }

  return conversation
}

function listenForMessages(
  conversationId: string,
  onMessageReceived: (message: TMessage) => void
) {
  return firestore()
    .collection('conversations')
    .doc(conversationId)
    .collection('messages')
    .orderBy('createdAt')
    .onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((doc) => {
        if (doc.type === 'added') {
          // message arrived;
          const message = doc.doc.data() as TMessage
          onMessageReceived(message)
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
    .collection('conversations')
    .doc(conversationId)
    .collection('messages')
    .doc()
  // send message to /conversations/{id}/messages
  const sendMessagePromise = doc.set({
    id: doc.id,
    createdAt: now,
    content,
    senderId,
    type,
    unread,
  })
  // update last message to /conversations/{id}/
  const updateLastMessagePromise = firestore()
    .collection('conversations')
    .doc(conversationId)
    .update({
      updatedAt: now,
      lastMessage: content,
    })
  await Promise.all([sendMessagePromise, updateLastMessagePromise])
}

function listenForConversationChanged(
  conversationId: string,
  onChanged: (conversation: TConversation) => void
) {
  return firestore()
    .collection('conversations')
    .doc(conversationId)
    .onSnapshot((snapshot) => {
      console.log('listenForConversationChanged', snapshot.data())
      // conversation data
      const data = snapshot.data()
      const conversation = data as TConversation
      onChanged(conversation)
    })
}

async function loadUnreadCount(conversationId: string, userId: string) {
  // TODO: Load unreadCount
  return 0
  const data = await firestore()
    .collection('conversations')
    .doc(conversationId)
    .collection('messages')
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
    .collection('conversations')
    .doc(conversationId)
    .collection('messages')
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
      .collection('conversations')
      .doc(conversationId)
      .collection('messages')
      .doc(messageId)
      .update({
        unread: firestore.FieldValue.arrayRemove(userId),
      })
  } catch (e) {
    console.log(e)
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
