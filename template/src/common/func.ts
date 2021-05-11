export function injectValue(
  string: string,
  value: string | number,
  key = '{{value}}'
) {
  const valueString = typeof value === 'number' ? `${value}` : value
  return string.replace(key, valueString)
}

/**
 * Use to filter out null or undefined in array
 * @param value Generic object type can null or undefined
 */
export function notEmpty<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined
}
