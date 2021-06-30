<pre><code>
import * as React from 'react'
import { TextInput } from 'components/TextInput'
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native'

export interface DropDownGuideProps {}

export function DropDownGuide(props: DropDownGuideProps) {
  props

  // IMPORTANT: iOS must set zIndex. Android don't set backgroundColor
  
  const containerStyle = Platform.OS === 'ios' ? { zIndex: 1 } : undefined

  return (
    <View style={containerStyle}>
      {/* THIS IS INPUT/BUTTON Component to show dropdown */}

      <TextInput />

      {/* Dropdown view with absolute. Only need to use measure function to calculate top position against Component above */}

      <View style={styles.dropdown}>
        <TouchableOpacity />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  dropdown: {
    position: 'absolute',
    top: 200,
    maxHeight: 100,
    backgroundColor: 'green',
    zIndex: 10,
  },
})
</code></pre>
