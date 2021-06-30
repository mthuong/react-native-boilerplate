import React from 'react'
import {
  ActivityIndicator,
  Dimensions,
  Platform,
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import { delay } from 'common/func'
import { Box } from 'components/Box'
import { Icon } from 'components/Icon'
import { List } from 'components/List'
import { Text } from 'components/Text'
import { useKeyboard } from 'hook/use-keyboard-hook'
import { debounce } from 'lodash'
import { ScaledSheet } from 'rn-scaled-sheet'
import { Theme, useTheme } from 'theme'

import { ErrorView } from './ErrorView'

const LIST_ITEM_HEIGHT = 50

export type Option = {
  name: string
  value: string
}

type ForwardedProps = {
  data: Option[]
  onOptionSelected?: (option?: Option) => void
  selectedOption?: Option
  handleSearch?: (text: string) => Promise<Option[]>
  // allow user to tap outside to dismiss
  tapToDismiss?: boolean
  optionContainerStyle?: ViewStyle
  optionTextStyle?: TextStyle
}

type DropDownListModalProps = {
  visible?: boolean
  onRequestClose: () => void
  width: number
  height: number
  pageX: number
  pageY: number
  maxHeight?: number
  selectedOption?: Option
} & ForwardedProps

function DropDownListView(props: DropDownListModalProps) {
  const {
    visible,
    data,
    onRequestClose,
    onOptionSelected,
    tapToDismiss,
    height,
    width,
    pageX,
    pageY,
    selectedOption,
    maxHeight,
  } = props

  const [keyboardHeight] = useKeyboard()

  const SCREEN_HEIGHT = Dimensions.get('window').height

  const optionStyles = useOptionStyles(useTheme())

  const keyExtractor = React.useCallback(
    (option: Option) => option.value + option.name,
    []
  )

  const listHeight = maxHeight || 200
  const maxItems = Math.min(data.length, 5)
  // calculate position of view
  let y = pageY
  if (
    SCREEN_HEIGHT - keyboardHeight - (pageY + height) <
    maxItems * LIST_ITEM_HEIGHT
  ) {
    console.log('go top')
    y = -(LIST_ITEM_HEIGHT * maxItems < listHeight
      ? LIST_ITEM_HEIGHT * maxItems
      : listHeight)
  } else {
    console.log('go bottom')
    y = height
  }

  if (!visible) {
    return null
  }

  const viewStyle: ViewStyle = {
    position: 'absolute',
    top: y,
    maxHeight: listHeight,
    backgroundColor: 'green',
    zIndex: 10,
  }

  return (
    <View style={[optionStyles.list, viewStyle]}>
      <List
        keyboardShouldPersistTaps='handled'
        extraData={selectedOption}
        ItemSeparatorComponent={() => <Box style={optionStyles.separator} />}
        ListFooterComponent={null}
        keyExtractor={keyExtractor}
        data={data}
        style={{ height: LIST_ITEM_HEIGHT * maxItems }}>
        {option => {
          const selected =
            selectedOption && selectedOption.value === option.value
          return (
            <TouchableOpacity
              onPress={() => onOptionSelected && onOptionSelected(option)}
              style={[optionStyles.container]}>
              <Text numberOfLines={1} preset={selected ? 'bold' : 'default'}>
                {option.name}
              </Text>
            </TouchableOpacity>
          )
        }}
      </List>
    </View>
  )
}

const useOptionStyles = ({ sharedStyle, colors }: Theme) =>
  ScaledSheet.create({
    list: {
      ...sharedStyle.shadow,
      backgroundColor: colors.backgroundColor,
      borderRadius: 4,
      width: '100%',
    },
    container: {
      height: 50,
      justifyContent: 'center',
      // paddingHorizontal: CONTAINER_PADDING,
      paddingHorizontal: 10,
      backgroundColor: 'white',
    },
    text: {
      color: colors.primaryText,
    },
    separator: {
      // ...sharedStyles.container,
      height: 0.5,
      backgroundColor: colors.borderColor,
    },
  })

type AutocompleteInputProps = {
  error?: any
  label?: string
  style?: StyleProp<ViewStyle>
  inputProps?: TextInputProps
} & ForwardedProps

type DropDownButtonState = {
  width: number
  height: number
  pageX: number
  pageY: number
  visible: boolean
}

export function AutoCompleteInput({
  onOptionSelected,
  selectedOption,
  style,
  error,
  label,
  inputProps,
  handleSearch,
  ...rest
}: AutocompleteInputProps) {
  const ref = React.useRef<TouchableOpacity>() as React.MutableRefObject<TouchableOpacity>
  const inputRef = React.useRef<TextInput>() as React.MutableRefObject<TextInput>
  const [isLoading, setIsLoading] = React.useState(false)
  const [data, setData] = React.useState<Option[]>([])
  const [text, setText] = React.useState('')

  const theme = useTheme()
  const { colors } = theme
  const styles = useStyles(theme)

  const [state, setState] = React.useState<DropDownButtonState>({
    width: 0,
    height: 0,
    pageX: 0,
    pageY: 0,
    visible: false,
  })

  const _onOptionSelected = React.useCallback(
    (option?: Option) => {
      setState({
        ...state,
        visible: false,
      })
      // console.log(onOptionSelected);
      onOptionSelected && onOptionSelected(option)
    },
    [state, onOptionSelected]
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handlerChange = React.useCallback(
    debounce(async (t: string) => {
      try {
        if (handleSearch && t) {
          setIsLoading(true)
          const locas = await handleSearch(t)
          setIsLoading(false)

          setData(locas)
          ref.current.measure((_, __, width, height, pageX, pageY) => {
            console.log({ width, height, pageX, pageY })

            setState({
              ...state,
              width,
              height,
              pageX,
              pageY,
              visible: !!locas.length,
            })
          })
        } else {
          setState({
            ...state,
            visible: false,
          })
        }
      } catch (e) {
        setIsLoading(false)
        console.log(e)
      }
    }, 1000),
    []
  )

  const onPressClear = React.useCallback(async () => {
    setText('')
    onOptionSelected && onOptionSelected(undefined)
    await delay(300)
    inputRef.current?.focus()
  }, [inputRef, onOptionSelected])

  const { width, height, pageX, pageY, visible } = state

  const displayText =
    (selectedOption && selectedOption.name) || selectedOption || 'Select'
  const textStyle =
    (selectedOption && selectedOption.name) || selectedOption
      ? styles.input
      : styles.placeholderText

  const customStyle =
    Platform.OS === 'ios'
      ? { zIndex: inputRef?.current?.isFocused() ? 3 : 1 }
      : undefined // DO NOT CHANGE undefined FOR ANDROID HERE

  return (
    <Box style={[styles.container, customStyle]}>
      <View renderToHardwareTextureAndroid ref={ref}>
        {label && <Text style={styles.label}>{label}</Text>}
        <View
          style={[
            styles.inputAutocompleteContainer,
            { borderColor: error ? colors.errorText : colors.borderColor },
            style,
          ]}>
          <Box full horizontal>
            {selectedOption ? (
              <Text style={[textStyle]}>{displayText}</Text>
            ) : (
              <TextInput
                value={text}
                ref={inputRef}
                style={styles.input}
                {...inputProps}
                onChangeText={(t: string) => {
                  setText(t)
                  handlerChange(t)
                }}
              />
            )}
            <TouchableOpacity
              onPress={onPressClear}
              disabled={!selectedOption}
              style={styles.iconContainer}>
              {isLoading ? (
                <ActivityIndicator animating />
              ) : (
                <Icon
                  // size={20}
                  style={[styles.inputIconColor]}
                  name={'chevron-down'}
                />
              )}
            </TouchableOpacity>
          </Box>
        </View>
      </View>
      <ErrorView error={error} />

      <DropDownListView
        {...rest}
        visible={visible}
        width={width}
        onOptionSelected={_onOptionSelected}
        height={height}
        pageX={pageX}
        pageY={pageY}
        selectedOption={selectedOption}
        data={data}
        onRequestClose={() => setState({ ...state, visible: false })}
      />
    </Box>
  )
}

const useStyles = ({ colors, sharedStyle, fonts }: Theme) =>
  ScaledSheet.create({
    container: {
      marginBottom: 10,
    },
    inputAutocompleteContainer: {
      paddingLeft: 10,
      // backgroundColor: Colors.inputBackgroundColor,
      borderWidth: 1,
      borderColor: colors.borderColor,
      height: 50,
      justifyContent: 'center',
      borderRadius: 5,
      // ...sharedStyles.shadow1,
    },
    iconContainer: {
      width: 50,
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputIconColor: {
      color: colors.primary,
      fontSize: 16,
    },
    primary: {
      color: colors.primary,
    },
    label: {
      color: colors.primaryText,
      // ...sharedStyle.inputLabelMarginBottom,
    },
    errorContainer: {
      // ...sharedStyle.errorContainer,
    },
    placeholderText: {
      color: colors.secondaryText,
    },
    input: {
      flex: 1,
      color: colors.primaryText,
      // marginLeft: 10,
      fontSize: 16,
      ...fonts.regular,
      alignSelf: 'center',
    },
    button: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  })
