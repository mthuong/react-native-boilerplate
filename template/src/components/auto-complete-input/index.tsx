import React from 'react'
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  LayoutChangeEvent,
  Modal,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import { Box } from 'components/Box'
import { Icon } from 'components/Icon'
import { List } from 'components/List'
import { Separator } from 'components/separator'
import { Text } from 'components/Text'
import { TextInput as CustomTextInput } from 'components/TextInput'
import { debounce } from 'lodash'
import { ScaledSheet } from 'rn-scaled-sheet'
import { Theme, useTheme } from 'theme'

import { ErrorView } from './ErrorView'

const { height: screenHeight } = Dimensions.get('window')

export type Option = {
  value: any
  name: string
  [key: string]: any
}

type ForwardedProps = {
  data: Option[]
  onOptionSelected?: (option: Option) => void
  selectedOption?: Option
  handleSearch?: (text: string) => Promise<Option[]>

  // allow user to tap outside to dismiss
  tapToDismiss?: boolean
  optionContainerStyle?: ViewStyle
  optionTextStyle?: TextStyle
  noError?: boolean
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

const PADDING = 100
const OFFSET = 4

function DropDownListModal(props: DropDownListModalProps) {
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
  const [heightState, setHeightState] = React.useState(0)
  const styles = optionStyles(useTheme())

  const onLayout = React.useCallback(
    (event: LayoutChangeEvent) =>
      setHeightState(event.nativeEvent.layout.height),
    []
  )

  const keyExtractor = React.useCallback(
    (option: Option) => option.value + option.name,
    []
  )

  // calculate position of view
  const x = pageX
  let y = pageY

  if (pageY + height + heightState > screenHeight - PADDING) {
    // go top
    y = pageY - OFFSET - heightState
  } else {
    // go bottom
    y = pageY + height + OFFSET
  }

  const viewStyle: ViewStyle = {
    position: 'absolute',
    left: x,
    top: y,
    width,
    opacity: heightState ? 1 : 0,
  }

  return (
    <Modal
      transparent
      visible={visible}
      animated
      animationType='fade'
      onRequestClose={onRequestClose}>
      <View style={[StyleSheet.absoluteFill]}>
        {tapToDismiss && (
          <TouchableOpacity
            onPress={onRequestClose}
            style={[StyleSheet.absoluteFill]}
            activeOpacity={1}
          />
        )}
        <View
          onLayout={onLayout}
          style={[styles.list, { maxHeight: maxHeight || 300 }, viewStyle]}>
          <List
            extraData={selectedOption}
            ItemSeparatorComponent={() => <Separator />}
            ListFooterComponent={null}
            keyExtractor={keyExtractor}
            data={data}>
            {(option: { [x: string]: any; value: any; name: any }) => {
              const selected =
                selectedOption && selectedOption.value === option.value
              return (
                <TouchableOpacity
                  onPress={() => onOptionSelected && onOptionSelected(option)}
                  style={[styles.container]}>
                  <Text preset={selected ? 'bold' : 'default'}>
                    {option.name}
                  </Text>
                </TouchableOpacity>
              )
            }}
          </List>
        </View>
      </View>
    </Modal>
  )
}

const optionStyles = ({ sharedStyle, colors }: Theme) =>
  ScaledSheet.create({
    list: {
      ...sharedStyle.shadow,
      backgroundColor: colors.backgroundColor,
      borderRadius: 4,
    },
    container: {
      paddingVertical: 15,
      paddingHorizontal: 20,
    },
    text: {
      color: colors.primaryText,
    },
    separator: {
      // ...sharedStyles.container,
      height: 0.5,
      backgroundColor: colors.secondaryText,
    },
  })

type DropDownButtonProps = {
  isLoadingData?: boolean
  placeholder?: string
  error?: any
  label?: string
  style?: StyleProp<ViewStyle>
  hideError?: boolean
  containerStyle?: StyleProp<ViewStyle>

  inputProps?: TextInputProps
  primary?: boolean
} & ForwardedProps

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

export function DropDownButton({
  onOptionSelected,
  isLoadingData,
  placeholder,
  selectedOption,
  style,
  error,
  label,
  inputProps,
  primary,
  containerStyle,
  hideError,
  ...rest
}: DropDownButtonProps) {
  const ref = React.useRef<TouchableOpacity>() as React.MutableRefObject<TouchableOpacity>
  const styles = cStyles(useTheme())

  const [state, setState] = React.useState<DropDownButtonState>({
    width: 0,
    height: 0,
    pageX: 0,
    pageY: 0,
    visible: false,
  })

  const handlePress = React.useCallback(() => {
    if (!ref.current) {
      return
    }
    ref.current.measure((_, __, width, height, pageX, pageY) => {
      setState({
        ...state,
        width,
        height,
        pageX,
        pageY,
        visible: true,
      })
    })
  }, [state, ref])

  const _onOptionSelected = React.useCallback(
    (option: Option) => {
      setState({
        ...state,
        visible: false,
      })
      // console.log(onOptionSelected);
      onOptionSelected && onOptionSelected(option)
    },
    [state, onOptionSelected]
  )

  const { width, height, pageX, pageY, visible } = state

  const displayText =
    (selectedOption && selectedOption.name) ||
    selectedOption ||
    placeholder ||
    'Select'
  const textStyle =
    (selectedOption && selectedOption.name) || selectedOption
      ? undefined
      : styles.placeholderText

  return (
    <Box style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity
        activeOpacity={0.7}
        disabled={isLoadingData}
        onPress={handlePress}
        ref={ref}
        style={[styles.inputContainer, style]}>
        <DropDownListModal
          {...rest}
          visible={visible}
          width={width}
          onOptionSelected={_onOptionSelected}
          height={height}
          pageX={pageX}
          pageY={pageY}
          selectedOption={selectedOption}
          onRequestClose={() => setState({ ...state, visible: false })}
        />
        <Text preset='default' style={textStyle}>
          {displayText}
        </Text>
        <View style={styles.indicatorContainer}>
          {isLoadingData ? (
            <ActivityIndicator animating />
          ) : (
            <Icon
              style={[styles.inputIconColor, primary && styles.primary]}
              name='chevron-down'
            />
          )}
        </View>
      </TouchableOpacity>
      {inputProps && (
        <CustomTextInput
          // error=""
          containerStyle={{ marginTop: 10 }}
          // eslint-disable-next-line no-inline-styles/no-inline-styles
          style={{ paddingLeft: 10 }}
          {...inputProps}
        />
      )}
      {!hideError && <ErrorView error={error} />}
    </Box>
  )
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

  const styles = cStyles(useTheme())

  const [state, setState] = React.useState<DropDownButtonState>({
    width: 0,
    height: 0,
    pageX: 0,
    pageY: 0,
    visible: false,
  })

  const _onOptionSelected = React.useCallback(
    (option: Option) => {
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
    debounce(async (text: string) => {
      console.log('handlerChange')
      try {
        if (handleSearch && text) {
          console.log('handleSearch', text)

          const filterResults = await handleSearch(text)
          console.log('filterResults', filterResults)
          setData(filterResults)
          if (filterResults.length) {
            ref.current.measure((_, __, width, height, pageX, pageY) => {
              console.log(width, height, pageX, pageY)
              setState({
                ...state,
                width,
                height,
                pageX,
                pageY,
                visible: true,
              })
            })
          }
        }
      } catch (e) {
        console.log(e)
      }
    }, 1000),
    []
  )

  const { width, height, pageX, pageY, visible } = state

  const displayText =
    (selectedOption && selectedOption.name) || selectedOption || 'Select'
  const textStyle =
    (selectedOption && selectedOption.name) || selectedOption
      ? undefined
      : styles.placeholderText

  return (
    <Box style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity
        disabled={true}
        ref={ref}
        style={[styles.inputAutocompleteContainer, style]}>
        <DropDownListModal
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
        {/* <Text primary={primary} style={[textStyle]}>
          {displayText}
        </Text> */}
        <Box full horizontal>
          <Box center>
            <Icon name='location_on' />
          </Box>
          <TextInput
            ref={inputRef}
            style={styles.input}
            {...inputProps}
            onChangeText={handlerChange}
          />
          <View style={styles.indicatorContainer}>
            {isLoading ? (
              <ActivityIndicator animating />
            ) : (
              <Icon style={[styles.inputIconColor]} name='chevron-down' />
            )}
          </View>
        </Box>
      </TouchableOpacity>
      <ErrorView error={error} />
    </Box>
  )
}

// export class AutoCompleteInput extends BasePureComponent<DropDownButtonProps, DropDownButtonState> {
//   view: TouchableOpacity | null = null;

//   state = {
//     width: 0,
//     height: 0,
//     pageX: 0,
//     pageY: 0,
//     visible: false,
//   };

//   _handlePress = () => {
//     if (!this.view) {
//       return;
//     }
//     this.view.measure((_, __, width, height, pageX, pageY) => {
//       this.setState({ width, height, pageX, pageY, visible: true });
//     });
//   };

//   _onOptionSelected = (option: Option) => {
//     this.setState({ visible: false });
//     console.log(this.props.onOptionSelected);
//     this.props.onOptionSelected && this.props.onOptionSelected(option);
//   };

//   render() {
//     const { isLoadingData, placeholder, selectedOption } = this.props;
//     const { width, height, pageX, pageY, visible } = this.state;
//     const displayText = (selectedOption && selectedOption.value) || placeholder || '';
//     const styles = this.useStyles(appStyles);
//     return (
//       <TouchableOpacity
//         activeOpacity={0.7}
//         disabled={isLoadingData}
//         onPress={this._handlePress}
//         ref={(r) => (this.view = r)}
//         style={styles.inputContainer}>
//         <DropDownListModal
//           {...this.props}
//           visible={visible}
//           width={width}
//           onOptionSelected={this._onOptionSelected}
//           height={height}
//           pageX={pageX}
//           pageY={pageY}
//           onRequestClose={() => this.setState({ visible: false })}
//         />
//         <Text>{displayText}</Text>
//         <View style={styles.indicatorContainer}>
//           {isLoadingData ? <ActivityIndicator animating /> : <MyIcon name="md-arrow-dropdown" />}
//         </View>
//       </TouchableOpacity>
//     );
//   }
// }

const cStyles = ({ sharedStyle, colors, fonts }: Theme) =>
  ScaledSheet.create({
    container: {
      marginBottom: 10,
    },
    inputContainer: {
      paddingLeft: 20,
      height: 50,
      justifyContent: 'center',
      borderRadius: 5,
      borderWidth: 1,
      borderColor: colors.borderColor,
      // backgroundColor: colors.inputBackgroundColor,
      ...sharedStyle.shadow,
    },
    inputAutocompleteContainer: {
      paddingLeft: 20,
      backgroundColor: colors.backgroundColor,
      height: 50,
      justifyContent: 'center',
      borderRadius: 5,
      // ...sharedStyles.shadow1,
    },
    indicatorContainer: {
      position: 'absolute',
      right: 0,
      top: 0,
      bottom: 0,
      paddingHorizontal: 15,
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
      // FIXME: Set style
      // ...sharedStyle.inputLabelMarginBottom,
    },
    errorContainer: {
      // FIXME: Set style
      // ...sharedStyle.errorContainer,
    },
    placeholderText: {
      color: colors.secondaryText,
    },
    input: {
      color: colors.primaryText,
      flex: 1,
      marginLeft: 20,
      fontSize: 15,
      ...fonts.bold,
    },
  })
