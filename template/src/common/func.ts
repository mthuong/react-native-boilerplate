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

/**
 * Get type-safe lookups
 * @param obj
 * @param key
 */
export function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key] // Inferred type is T[K]
}

/**
 * Delay function
 *
 * @export
 * @param {number} [milliseconds=300]
 * @returns
 */
export async function delay(milliseconds = 300) {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
