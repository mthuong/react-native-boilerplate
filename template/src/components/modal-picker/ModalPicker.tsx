/* eslint-disable @typescript-eslint/no-var-requires */
import * as React from 'react'
import {
  Dimensions,
  FlatList,
  Image,
  Keyboard,
  ListRenderItemInfo,
  Modal,
  Platform,
  StyleProp,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import { ScaledSheet } from 'rn-scaled-sheet'
import { Theme, useTheme } from 'theme'

import { ButtonImage } from './components/ButtonImage'
import { Row } from './components/row'
import { Separator } from './components/separator'

const icInputSearch = require('./assets/icInputSearch.png')
const icCloseCircle = require('./assets/icCloseCircle.png')
const icChecked = require('./assets/icChecked.png')
const icUnCheck = require('./assets/icUnCheck.png')

const MARGIN_HEADER_HEIGHT = 20
const PADDING_BOTTOM = 20 + (Platform.OS === 'ios' ? 10 : 30)
const FOOTER_HEIGHT = 75
const TITLE_HEIGHT = 50
const SEARCH_BAR_HEIGHT = 50

export interface T {
  id: string
  value: string
}

export interface ModalPickerProps {
  title: string
  required?: boolean
  value?: T

  style?: StyleProp<ViewStyle>

  valueStyle?: StyleProp<TextStyle>

  dataSources: T[]

  // set dropdown max height
  maxHeight?: number

  rowHeight?: number

  onSelect?(item: T, index: number): void

  // allow component to get value text to display
  displayValueGetter?(item: T): string

  // allow component to check data sources item equally
  itemComparison?(item1: T, item2: T): boolean

  // callback when dropdown is completely hidden
  onDropdownHide?(): void

  // Allow search
  searchable?: boolean

  // Implement on search function
  onSearch?(searchText: string, dataSource: T[]): T[]

  // If disable, user can not click and the text is gray out.
  disabled?: boolean

  isVisible: boolean

  onDismiss(): void
}

const ModalPicker: React.FunctionComponent<ModalPickerProps> = props => {
  const { isVisible, onDismiss } = props

  const [position, setPosition] = React.useState({
    width: 0,
    left: 0,
    top: 0,
    bottom: 0,
    maxHeight: props.maxHeight || 0,
  })
  const [displaySources, setDisplaySources] = React.useState(
    props.dataSources || []
  )

  const styles = makeStyles(useTheme())

  const getValueText = (item: T): string => {
    const { displayValueGetter } = props
    if (item && displayValueGetter) {
      return displayValueGetter(item)
    }

    if (typeof item.value === 'string') {
      return item.value
    }
    if (typeof item === 'string') {
      return item
    }
    return ''
  }

  const defaultComparison = (item: T): boolean => {
    const { itemComparison, value } = props
    if (!value) {
      return false
    }
    if (itemComparison) {
      return itemComparison(value, item)
    }
    if (item.value) {
      return value.value == item.value
    }
    if (value && typeof item === 'string') {
      return value == item
    }
    return false
  }

  const renderSearch = () => {
    const { searchable: isSearchable, onSearch, dataSources } = props
    if (!isSearchable) {
      return null
    }
    return (
      <React.Fragment>
        <Row style={styles.SEARCH_VIEW}>
          <TextInput
            placeholder='Enter your keyword'
            blurOnSubmit
            returnKeyType='search'
            multiline={false}
            maxLength={100}
            onChangeText={(text: string) => {
              if (onSearch) {
                const results = onSearch(text, dataSources)
                setDisplaySources(results)
              }
            }}
            style={styles.SEARCH_INPUT}
          />
          <Image source={icInputSearch} />
        </Row>
        <Separator marginLeft={0} marginRight={0} />
      </React.Fragment>
    )
  }

  const renderHeader = () => {
    const { title } = props

    return (
      <View style={styles.HEADER_VIEW}>
        <Row style={styles.HEADER_ROW}>
          {title ? (
            <Text style={styles.HEADER_TITLE} numberOfLines={0}>
              {title}
            </Text>
          ) : null}
          <ButtonImage onPress={toggleDropdown} image={icCloseCircle} />
        </Row>
        {renderSearch()}
      </View>
    )
  }

  const renderDone = () => {
    return (
      <ButtonImage
        text='Done'
        style={styles.DONE_STYLE}
        textStyle={styles.DONE_TEXT_STYLE}
        onPress={toggleDropdown}
      />
    )
  }

  const renderDropdownItem = ({ item, index }: ListRenderItemInfo<any>) => {
    let isSelected = false
    const { rowHeight } = props
    isSelected = defaultComparison(item)

    return (
      <TouchableOpacity
        style={[
          styles.ITEM_CONTAINER,
          {
            height: rowHeight,
          },
        ]}
        onPress={() => {
          itemPress(item, index)
        }}>
        <Image
          style={styles.CHECKBOX}
          source={isSelected ? icChecked : icUnCheck}
        />
        <Text
          style={[
            styles.ITEM_NAME,
            isSelected ? styles.ITEM_NAME_SELECTED : undefined,
          ]}>
          {getValueText(item)}
        </Text>
      </TouchableOpacity>
    )
  }

  const itemPress = (item: T, index: number) => {
    props.onSelect && props.onSelect(item, index)
    toggleDropdown()
  }

  React.useLayoutEffect(() => {
    const { dataSources, rowHeight, searchable: isSearchable } = props
    if (dataSources.length) {
      const optionsHeight =
        rowHeight! * dataSources.length +
        PADDING_BOTTOM +
        TITLE_HEIGHT +
        (isSearchable ? SEARCH_BAR_HEIGHT : 0) +
        FOOTER_HEIGHT +
        MARGIN_HEADER_HEIGHT * 2
      const screenHeight = Dimensions.get('window').height
      const maxHeight = Math.min(optionsHeight, screenHeight - 100)
      const y = screenHeight - maxHeight
      if (isSearchable) {
        setPosition({
          left: 0,
          top: y,
          width: Dimensions.get('window').width,
          maxHeight,
          bottom: 0,
        })
        setDisplaySources(dataSources)
      } else {
        setPosition({
          left: 0,
          top: y,
          width: Dimensions.get('window').width,
          maxHeight,
          bottom: 0,
        })
      }
    }
  }, [isVisible, props])

  const toggleDropdown = () => {
    Keyboard.dismiss()
    // Don't allow user to select dropdown when disabled = true
    if (props.disabled) {
      return
    }
    if (isVisible) {
      // setIsVisible(false)
      onDismiss()
    }
  }

  const { searchable: isSearchable, dataSources } = props

  const { maxHeight, width, left, top, bottom } = position
  const listStyle = {
    maxHeight,
    width,
  }
  const buttonStyle = {
    top: 0,
    height: Dimensions.get('window').height - maxHeight,
  }

  const data = isSearchable ? displaySources : dataSources

  return (
    <Modal
      style={styles.MODAL}
      visible={isVisible}
      onRequestClose={props.onDropdownHide}
      transparent
      animationType='slide'>
      <View style={styles.MODAL_CONTAINER}>
        <ButtonImage
          style={[styles.BUTTON_STYLE, buttonStyle]}
          onPress={toggleDropdown}
        />

        <View
          style={[
            styles.MODAL_CONTENT_VIEW,
            {
              top,
              bottom,
              left,
              width,
              maxHeight,
            },
          ]}>
          {renderHeader()}
          <FlatList
            style={[styles.LIST, listStyle]}
            data={data}
            renderItem={renderDropdownItem}
            keyExtractor={(item, i) => `${item.value}_${i}`}
            ListFooterComponent={<View style={styles.FOOTER_VIEW} />}
          />
          {renderDone()}
        </View>
      </View>
    </Modal>
  )
}

const makeStyles = ({ fonts, colors }: Theme) =>
  ScaledSheet.create({
    MODAL_CONTAINER: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
    },
    MODAL_CONTENT_VIEW: {
      backgroundColor: 'white',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      overflow: 'hidden',
      position: 'absolute',

      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
    },
    ITEM_CONTAINER: {
      backgroundColor: 'white',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    ITEM_NAME: {
      ...fonts.regular,
      fontSize: 16,
      flex: 1,
      paddingLeft: 10,
    },
    ITEM_NAME_SELECTED: {
      ...fonts.bold,
    },
    CHECKBOX: {
      width: 24,
      height: 24,
      tintColor: colors.primary,
    },

    FOOTER_VIEW: {
      height: PADDING_BOTTOM,
    },

    HEADER_VIEW: {
      margin: MARGIN_HEADER_HEIGHT,
    },

    HEADER_ROW: { alignItems: 'center', minHeight: TITLE_HEIGHT },

    HEADER_TITLE: {
      flex: 1,
      flexWrap: 'wrap',
      fontSize: 20,
      ...fonts.medium,
      color: colors.primaryText,
    },

    SEARCH_VIEW: { alignItems: 'center' },

    MODAL: {
      flex: 1,
      margin: 0,
    },

    LIST: {
      flex: 1,
      paddingHorizontal: 15,
    },

    BUTTON_STYLE: {
      backgroundColor: 'transparent',
      flex: 1,
      position: 'absolute',
      width: '100%',
      justifyContent: 'flex-end',
    },

    SEARCH_INPUT: {
      marginTop: 15,
      marginBottom: 5,
      ...fonts.regular,
      fontSize: 16,
      flex: 1,
      height: SEARCH_BAR_HEIGHT,
    },

    DONE_STYLE: {
      backgroundColor: colors.primaryButton,
      height: FOOTER_HEIGHT,
    },

    DONE_TEXT_STYLE: {
      color: colors.tertiaryText,
      fontSize: 16,
      ...fonts.bold,
    },
  })

ModalPicker.defaultProps = {
  dataSources: [],
  rowHeight: 40,
}

export { ModalPicker }
