/* eslint-disable no-inline-styles/no-inline-styles */
import * as React from 'react'
import { View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { AutoCompleteInput, Option } from 'components/auto-complete-input'
import faker from 'faker'

export interface StoryBookProps {}

export function StoryBook(props: StoryBookProps) {
  props
  const data = React.useMemo(() => {
    const results = []
    for (let index = 0; index < 10; index++) {
      const item: Option = {
        name: faker.name.findName(),
        value: faker.datatype.uuid(),
      }
      results.push(item)
    }
    return results
  }, [])

  const handleSearch = React.useCallback(
    async (text: string) => {
      console.log('Search results', text, data)
      const results = data.filter(
        i => i.name.toLowerCase().indexOf(text.toLowerCase()) != -1
      )
      console.log('results', results)
      return results
    },
    [data]
  )

  const [option, setOption] = React.useState<Option>()
  const onOptionSelected = React.useCallback((selectedOption?: Option) => {
    setOption(selectedOption)
  }, [])

  const [option1, setOption1] = React.useState<Option>()
  const onOptionSelected1 = React.useCallback((selectedOption?: Option) => {
    setOption1(selectedOption)
  }, [])

  const [option2, setOption2] = React.useState<Option>()
  const onOptionSelected2 = React.useCallback((selectedOption?: Option) => {
    setOption2(selectedOption)
  }, [])

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps='handled'
      style={{ backgroundColor: 'yellow' }}>
      <View style={{ height: 100 }} />
      <AutoCompleteInput
        data={data}
        handleSearch={handleSearch}
        onOptionSelected={onOptionSelected}
        selectedOption={option}
      />
      <View style={{ height: 100, backgroundColor: 'transparent' }} />

      <AutoCompleteInput
        data={data}
        handleSearch={handleSearch}
        onOptionSelected={onOptionSelected1}
        selectedOption={option1}
      />
      <View style={{ height: 100, backgroundColor: 'transparent' }} />

      <AutoCompleteInput
        data={data}
        handleSearch={handleSearch}
        onOptionSelected={onOptionSelected2}
        selectedOption={option2}
      />
      <View style={{ height: 100, backgroundColor: 'transparent' }} />
    </KeyboardAwareScrollView>
  )
}
