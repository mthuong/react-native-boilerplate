import { Icon, IconTypes } from 'components/Icon'
import { RootNavigation } from 'navigator'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useTheme } from 'theme'
import { Text } from 'components/text'

type HeaderProps = {
  leftIcon?: IconTypes
  onPressLeft?: () => void
  rightIcon?: IconTypes
  onPressRight?: () => void
  title?: string
  backEnabled?: boolean
  subRightIcon?: IconTypes
  onPressSubRight?: () => void
  children?: React.ReactNode
}

export const Header = (props: HeaderProps) => {
  const {
    leftIcon,
    rightIcon,
    title,
    onPressLeft,
    onPressRight,
    backEnabled,
    subRightIcon,
    onPressSubRight,
    children,
  } = props
  const theme = useTheme()
  const iconLeft = leftIcon || (backEnabled ? 'left' : undefined)

  const onLeftPress =
    onPressLeft || backEnabled ? RootNavigation.back : undefined

  return (
    <View
      style={[styles.header, { backgroundColor: theme.colors.navigationBar }]}>
      <TouchableOpacity
        disabled={!iconLeft}
        onPress={onLeftPress}
        style={styles.leftButton}>
        {!!iconLeft && (
          <Icon style={{ color: theme.colors.primary }} name={iconLeft} />
        )}
      </TouchableOpacity>
      {!!subRightIcon && <View style={styles.leftButton} />}

      {/* Title */}
      {children || (
        <Text
          preset='header'
          style={[styles.titleText, { color: theme.colors.primary }]}>
          {title}
        </Text>
      )}
      {!!subRightIcon && (
        <TouchableOpacity
          disabled={!rightIcon}
          onPress={onPressSubRight}
          style={styles.subRightButton}>
          {!!subRightIcon && (
            <Icon style={{ color: theme.colors.primary }} name={subRightIcon} />
          )}
        </TouchableOpacity>
      )}
      <TouchableOpacity
        disabled={!rightIcon}
        onPress={onPressRight}
        style={styles.rightButton}>
        {!!rightIcon && (
          <Icon style={{ color: theme.colors.primary }} name={rightIcon} />
        )}
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftButton: {
    width: 50,
    alignItems: 'center',
  },
  rightButton: {
    width: 50,
    alignItems: 'center',
  },
  subRightButton: {
    width: 50,
    alignItems: 'center',
  },
  titleText: {
    flex: 1,
    textAlign: 'center',
  },
  searchContainer: {
    height: 30,
    flex: 1,
    borderRadius: 5,
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginRight: 8,
  },
})
