// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs')

const fontTags = () => {
  const data = fs.readFileSync('src/components/Icon/selection.json')
  const selection = JSON.parse(data)
  return selection.icons.map((i) => `'${i.icon.tags[0]}'`)
}
const generate = () => {
  const properties = fontTags().join(' | ')
  const string = `export type IconTypes = ${properties}`
  fs.writeFileSync('src/components/Icon/types.ts', string, 'utf8')
}
generate()
