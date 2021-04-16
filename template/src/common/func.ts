export function injectValue(
  string: string,
  value: string | number,
  key = '{{value}}'
) {
  const valueString = typeof value === 'number' ? `${value}` : value
  return string.replace(key, valueString)
}
