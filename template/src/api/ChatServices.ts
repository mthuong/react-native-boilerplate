import firestore from '@react-native-firebase/firestore'
import { notEmpty } from 'common/func'
import { TConversation } from 'models/conversation'
import { TMessage, TMessageType } from 'models/Message'
import { TUser } from 'models/user'

async function loadUser(userId: string) {
  const document = await firestore()
    .collection<TUser>('users')
    .doc(userId)
    .get()
  return document.data()
}

async function loadConversations(
  user: TUser
): Promise<(TConversation | null)[]> {
  const conversationsPromise = await firestore()
    .collection<TUser>('users')
    .doc(user.uid)
    .collection('conversations')
    .get()
  const promises = conversationsPromise.docs
    .map((c) => c.data())
    .map(({ id }) => {
      return loadConversation(id, user)
    })

  const conversations = await Promise.all(promises)
  console.log('conversations', conversations)
  return conversations
}

async function loadUsers() {
  const userPromise = await firestore().collection<TUser>('users').get()
  const users = userPromise.docs.map((t) => t.data())
  return users
}

function listenForUserAdded(onUserAdded: (users: TUser[]) => void) {
  return firestore()
    .collection<TUser>('users')
    .onSnapshot((snapshot) => {
      if (!snapshot) {
        return
      }
      const users = snapshot
        .docChanges()
        .filter((t) => t.type === 'added')
        .map((doc) => {
          console.log('on snapshot 2', doc)
          // user registered;
          const user = doc.doc.data()
          return user
        })
      onUserAdded(users)
    })
}

function listenForConversationAdd(
  user: TUser,
  onAdded: (conversations: TConversation[]) => void
) {
  console.log('listenForConversationAdd', user.uid)

  return firestore()
    .collection('users')
    .doc(user.uid)
    .collection('conversations')
    .onSnapshot(async (snapshot) => {
      console.log('listenForConversationAdd - snapshot:', snapshot)
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
      onAdded(filtered)
    })
}

async function loadConversation(
  id: string,
  user: TUser
): Promise<TConversation | null> {
  const conversations = (
    await firestore()
      .collection<TConversation>('conversations')
      .where('id', '==', id)
      .get()
  ).docs
    .map((t) => t.data())
    .map(async (t) => {
      // get users array
      const usersRef = t.users
      const usersPromises = usersRef.map(async (userRef) => {
        if (userRef.uid === user.uid) {
          return user
        }
        const mUser = await loadUser(userRef.uid)
        return mUser
      })
      const conversation = t
      const users = (await Promise.all(usersPromises)).filter(notEmpty)
      conversation.users = users
      return conversation
    })
  if (conversations.length > 0) {
    return conversations[0]
  }
  return null
}

function getUserRef(user: TUser) {
  return firestore().collection<TUser>('users').doc(user.uid)
}

async function createConversation(
  user1: TUser,
  user2: TUser
): Promise<TConversation> {
  const conversationId =
    user1.uid < user2.uid
      ? `${user1.uid}_${user2.uid}`
      : `${user2.uid}_${user1.uid}`
  const now = Date.now()
  const data = {
    id: conversationId,
    createdAt: now,
    users: [getUserRef(user1), getUserRef(user2)],
    lastMessage: '',
  }

  // create conversation in /conversations
  const create1 = firestore()
    .collection('conversations')
    .doc(conversationId)
    .set(data)
  // create conversation in users/{id}/conversations
  const create2 = [user1, user2].map((user) => {
    return getUserRef(user)
      .collection('conversations')
      .doc(conversationId)
      .set({
        id: conversationId,
        createdAt: now,
      })
  })

  await Promise.all([create1, ...create2])
  const conversation = data

  // FIXME: Need to check TUser type here
  // @ts-ignore
  conversation.users = [user1, user2]

  // @ts-ignore
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
  createConversation,

  sendMessage,
  markMessageAsRead,
  listenForMessagesUnreadChanged,
  listenForMessages,
}
