export default function isEmpty(value: unknown): boolean {
  if (
    value === '' ||
    value === null ||
    value === undefined // ||
    // typeof value === 'number' ||
    // typeof value === 'boolean'
  ) {
    return true;
  }

  if (typeof value === 'object') {
    if (Array.isArray(value)) {
      return value.length !== 0;
    }

    if (value instanceof Map || value instanceof Set) {
      return value.size !== 0;
    }

    return Object.keys(value).length > 0;
  }

  return false;
}
