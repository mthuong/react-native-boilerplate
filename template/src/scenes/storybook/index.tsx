import * as React from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { AutoCompleteInput, Option } from 'components/auto-complete-input'
import faker from 'faker'

export interface StoryBookProps {}

export function StoryBook(props: StoryBookProps) {
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
      console.log('Search results', text)
      const results = data.filter(i => i.name.indexOf(text) != -1)
      console.log('results', results)
      return results
    },
    [data]
  )

  return (
    <KeyboardAwareScrollView>
      <AutoCompleteInput data={data} handleSearch={handleSearch} />
    </KeyboardAwareScrollView>
  )
}
