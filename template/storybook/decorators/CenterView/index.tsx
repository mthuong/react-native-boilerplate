import React, { ReactNode } from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'

interface Props {
  children?: ReactNode
}

export default function CenterView({ children }: Props) {
  return <View style={styles.main}>{children}</View>
}

CenterView.defaultProps = {
  children: null,
}

CenterView.propTypes = {
  children: PropTypes.node,
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
})
