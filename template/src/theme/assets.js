import { readdirSync, writeFileSync } from 'fs'

const imageFileNames = () => {
  const array = readdirSync('src/theme/assets')
    .filter((file) => {
      return file.endsWith('.png')
    })
    .map((file) => {
      return file
        .replace('@2x.png', '')
        .replace('@3x.png', '')
        .replace('.png', '')
    })
  return Array.from(new Set(array))
}
const generate = () => {
  const properties = imageFileNames()
    .map((name) => {
      return `${name.replace(/-/g, '_')}: require('./assets/${name}.png')`
    })
    .join(',\n  ')
  const string = `const images = {
  ${properties}
}
export type ImageAssetTypes = keyof typeof images

export default images
`
  writeFileSync('src/theme/images.ts', string, 'utf8')
}
generate()
