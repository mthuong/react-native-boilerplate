import React, { useCallback, useMemo } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { storiesOf } from '@storybook/react-native'
import faker from 'faker'

import { AutoCompleteInput, Option } from '.'

storiesOf('components/AutoCompleteInput', module)
  .addDecorator(story => (
    <KeyboardAwareScrollView>{story()}</KeyboardAwareScrollView>
  ))
  .add('default', () => {
    const data = useMemo(() => {
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

    const handleSearch = useCallback(
      async (text: string) => {
        console.log('Search results', text)
        const results = data.filter(i => i.name.indexOf(text) != -1)
        console.log('results', results)
        return results
      },
      [data]
    )

    return <AutoCompleteInput data={data} handleSearch={handleSearch} />
  })
