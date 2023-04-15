export default function isObject(obj: unknown): boolean {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    obj.constructor === Object &&
    Object.prototype.toString.call(obj) === '[object Object]'
  );
}
