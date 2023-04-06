export default function trim(str: string, chars?: string): string {
  if (!chars) {
    return str.trim();
  }

  const pattern = new RegExp(`^[${chars}]+|[${chars}]+$`, 'g');

  return str.replace(pattern, '');
}
