export function escapeInput(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
    '/': '&#x2F;',
  };

  return text.replace(/[&<>"'/]/g, (m) => map[m]);
}

export function escapeObjectValues<T extends { [key: string]: string }>(
  obj: T,
  // eslint-disable-next-line no-unused-vars
): { [key in keyof T]: string } {
  // eslint-disable-next-line no-unused-vars
  const escapedObj = {} as { [key in keyof T]: string };

  Object.keys(obj).forEach((key) => {
    const value = obj[key as keyof T];
    const escapedValue = escapeInput(value);
    escapedObj[key as keyof T] = escapedValue;
  });

  return escapedObj;
}
