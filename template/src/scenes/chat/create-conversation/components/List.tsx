import React, { useCallback } from 'react'
import { FlatList, TouchableOpacity, View } from 'react-native'
import { Text } from 'components/Text'
import { TUser, TUserFunc } from 'models'
import { ScaledSheet } from 'rn-scaled-sheet'
import { Theme, useTheme } from 'theme'

type ListProps = {
  users: TUser[]
  onPressUser: (user: TUser) => void
}

function List(props: ListProps) {
  const { onPressUser, users } = props

  const theme = useTheme()
  const styles = makeStyles(theme)

  const _renderItem = useCallback(
    ({ item }: { item: TUser }) => {
      return (
        <TouchableOpacity
          onPress={() => onPressUser(item)}
          style={styles.container}
          activeOpacity={0.7}>
          <View style={styles.avatarView}>
            <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
          </View>
          <Text style={styles.nameText}>{TUserFunc.userDisplayName(item)}</Text>
        </TouchableOpacity>
      )
    },
    [
      onPressUser,
      styles.avatarText,
      styles.avatarView,
      styles.container,
      styles.nameText,
    ]
  )

  const _keyExtractor = useCallback((item: TUser) => {
    return item.id
  }, [])

  return (
    <FlatList
      data={users}
      renderItem={_renderItem}
      keyExtractor={_keyExtractor}
      extraData={users}
    />
  )
}

const makeStyles = ({ colors, spacing }: Theme) =>
  ScaledSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: spacing[2],
      paddingHorizontal: spacing[4],
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
    nameText: {
      flex: 1,
      fontSize: 17,
      fontWeight: 'bold',
      marginLeft: 16,
      color: colors.primary,
    },
  })

export default List
