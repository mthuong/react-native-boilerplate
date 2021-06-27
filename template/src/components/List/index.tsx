import React from 'react'
import {
  ActivityIndicator,
  FlatList as FL,
  FlatListProps as FP,
  Image,
  StyleSheet,
} from 'react-native'
import { Box } from 'components/Box'
import { Text } from 'components/Text'
import { Theme, ThemeContext } from 'theme'

type FlatListProps<T> = Omit<FP<T>, 'renderItem'> & {
  children: (item: T, index: number) => React.ReactElement
  emptyOption?: {
    icon: number
    text: string
  }
  isLoading?: boolean
  loadingText?: string
  loadingComponent?: () => React.ReactElement
}

export class List<T> extends React.Component<FlatListProps<T>> {
  static contextType = ThemeContext

  _renderItem = ({ item, index }: { item: T; index: number }) =>
    this.props.children(item, index)

  render() {
    if (typeof this.props.children !== 'function') {
      throw new Error('Children must be a function')
    }
    const styles = makeStyles(this.context)
    const {
      data,
      emptyOption,
      isLoading,
      loadingComponent,
      loadingText,
      ...rest
    } = this.props
    if (isLoading) {
      if (loadingComponent) {
        return (
          <List data={[1, 2, 3]} keyExtractor={item => String(item)}>
            {() => <React.Fragment>{loadingComponent()}</React.Fragment>}
          </List>
        )
      }
      return (
        <Box full center>
          <ActivityIndicator size='small' />
          {!!loadingText && <Text style={styles.text}>{'Loading...'}</Text>}
        </Box>
      )
    }
    if ((!data || data.length === 0) && emptyOption) {
      return (
        <Box full center>
          <Image source={emptyOption.icon} />
          <Text style={styles.text}>{emptyOption.text}</Text>
        </Box>
      )
    }
    return <FL data={data} renderItem={this._renderItem} {...rest} />
  }
}

const makeStyles = ({ dimensions }: Theme) =>
  StyleSheet.create({
    text: {
      marginTop: dimensions.navigation.height,
    },
  })
