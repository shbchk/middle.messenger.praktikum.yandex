const METHODS = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

function queryStringify(data) {
  let result = '';
  Object.entries(data).forEach(([key, value], index, array) => {
    if (index === 0) {
      result += '?'
    }
    if (index !== array.length - 1) {
      result += `${key}=${value}&`
    } else {
      result += `${key}=${value}`
    }
  })
  return result
}

class HTTPTransport {
  get = (url, options = {}) => {
    console.log('url:', url)
    console.log('options:', options)
    console.log('data', options.data)
    const newdata = queryStringify(options?.data);
    console.log('newdata', newdata)
    return this.request(
      url + newdata,
      { ...options, method: METHODS.GET, data: newdata },
      options.timeout,
    );
  };

  post = (url, options = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.POST },
      options.timeout,
    );
  };

  put = (url, options = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.PUT },
      options.timeout,
    );
  };

  delete = (url, options = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.DELETE },
      options.timeout,
    );
  };

  request = (url, { method, data, headers }, timeout = 5000) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.timeout = timeout;
      xhr.onload = () => resolve(xhr);

      if (headers) {
        const { key, value } = headers
        xhr.setRequestHeader(key, value);
      }

      const errorHandler = () => reject(xhr);

      xhr.onerror = errorHandler;
      xhr.onabort = errorHandler;
      xhr.ontimeout = errorHandler;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
