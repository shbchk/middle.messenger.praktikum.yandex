import isObject from './isObject';

type StringIndexed = Record<string, any>;

const obj: StringIndexed = {
  key: 1,
  key2: 'test',
  key3: false,
  key4: true,
  key5: [1, 2, 3],
  key6: { a: 1 },
  key7: { b: { d: 2 } },
};

function queryStringify(data: StringIndexed): string | never {
  if (!isObject) {
    throw new Error('input must be an object');
  }

  function subObj(objct: Record<string, any>): string {
    console.log('objct', objct);

    let result: string = '';

    Object.entries(objct).forEach(([key, value]) => {
      if (isObject(value)) {
        result = `[${key}]${subObj(value)}`;
        return;
      }

      result = `[${key}]=${value}`;
    });

    return result;
  }

  const result: string[] = [];

  Object.entries(data).forEach(([key, val]) => {
    if (typeof val !== 'object') {
      result.push(`${key}=${val}`);
    } else if (Array.isArray(val)) {
      val.forEach((value, index) => {
        result.push(`${key}[${index}]=${value}`);
      });
    } else if (val === null) {
      result.push(`${key}=null`);
    } else if (isObject(val)) {
      result.push(`${key}${subObj(val)}`);
    } else {
      result.push(`${key}=${val.toString()}`);
    }
  });

  return result.join('&');
}

export default queryStringify;

// 'key=1&key2=test&key3=false&key4=true&key5[0]=1&key5[1]=2&key5[2]=3&key6[a]=1&key7[b][d]=2'
console.log(queryStringify(obj));
