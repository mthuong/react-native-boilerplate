import * as React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { ScaledSheet } from 'rn-scaled-sheet'
import { ConversationFunc, TConversation } from 'scenes/chat/models'
import { ChatServices } from 'scenes/chat/services/ChatServices'
import { conversationsFunctions } from 'scenes/chat/store/conversationsFunctions'
import { getCurrentUser } from 'stores/authSelectors'
import { useAppDispatch, useAppSelector } from 'stores/hook'
import { Theme, useTheme } from 'theme'

type ConversationItemProps = {
  currentUserId: string
  conversationId: string
  data: TConversation
  onPressConversation: (conversation: TConversation) => void
}

const bgColors = ['red', 'green', 'blue']

export function ConversationItem(props: ConversationItemProps) {
  const { conversationId, data, currentUserId, onPressConversation } = props
  const currentUser = useAppSelector(getCurrentUser)
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    // Start listen conversation changed
    return ChatServices.listenForConversationChanged(
      conversationId,
      currentUser,
      (conversation: TConversation) => {
        dispatch(conversationsFunctions.updateConversation(conversation))
      }
    )
  }, [conversationId, dispatch, currentUser])

  React.useEffect(() => {
    // Start listen message unread changed
    return ChatServices.listenForMessagesUnreadChanged(
      conversationId,
      currentUserId,
      (unread: number) => {
        dispatch(
          conversationsFunctions.updateUnreadCount(conversationId, unread)
        )
      }
    )
  }, [currentUserId, conversationId, dispatch])

  const conversationName = ConversationFunc.getConversationName(
    data,
    currentUserId
  )
  const backgroundColor =
    bgColors[conversationName.charCodeAt(0) % bgColors.length]

  const styles = makeStyles(useTheme())

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPressConversation(data)}>
      <View style={[styles.avatarView, { backgroundColor }]}>
        <Text style={styles.avatarText}>{conversationName.charAt(0)}</Text>
      </View>
      <View style={styles.contentView}>
        <Text style={styles.conversationName}>{conversationName}</Text>
        {!!data.lastMessage && (
          <Text style={styles.lastMessage}>{data.lastMessage}</Text>
        )}
      </View>
      <View style={styles.unreadContainer}>
        {!!data.unreadCount && (
          <View style={styles.unreadView}>
            <Text style={styles.unreadText}>{data.unreadCount}</Text>
          </View>
        )}
        {!!data.updatedAt && (
          <Text style={styles.updatedAtText}>
            {ConversationFunc.updatedAtText(data)}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  )
}

const makeStyles = ({ colors }: Theme) =>
  ScaledSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 8,
      paddingHorizontal: 16,
    },
    avatarView: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    avatarText: {
      color: '#FFF',
      fontWeight: 'bold',
      fontSize: 18,
    },
    contentView: {
      flex: 1,
      marginHorizontal: 8,
    },
    conversationName: {
      fontWeight: 'bold',
      fontSize: 18,
      color: colors.primary,
    },
    lastMessage: {
      color: '#979797',
      fontSize: 15,
      marginTop: 4,
    },
    unreadContainer: {
      alignItems: 'flex-end',
    },
    unreadView: {
      width: 18,
      height: 18,
      borderRadius: 9,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    unreadText: {
      color: '#FFF',
      fontSize: 12,
    },
    updatedAtText: {
      color: '#707070',
      fontSize: 12,
      marginTop: 8,
    },
  })
