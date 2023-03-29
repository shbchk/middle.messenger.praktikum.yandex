const METHODS: Record<string, string> = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
} as const;

function queryStringify(data: any): string {
  return new URLSearchParams(data).toString();
}

type Options = {
  method?: string;
  data: any;
  headers?: Record<string, string>;
  timeout?: number;
};

type HTTPMethod = (url: string, options?: Options) => Promise<unknown>;

export default class HTTPTransport {
  get: HTTPMethod = (url, options = { data: {} }) => {
    const newdata = queryStringify(options?.data);
    return this.request(url + newdata, {
      ...options,
      method: METHODS.GET,
      data: newdata,
    });
  };

  post: HTTPMethod = (url, options = { data: {} }) => {
    return this.request(url, { ...options, method: METHODS.POST });
  };

  put: HTTPMethod = (url, options = { data: {} }) => {
    return this.request(url, { ...options, method: METHODS.PUT });
  };

  delete: HTTPMethod = (url, options = { data: {} }) => {
    return this.request(url, { ...options, method: METHODS.DELETE });
  };

  request = (
    url: string,
    { method = METHODS.GET, data, headers, timeout = 5000 }: Options,
  ) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.timeout = timeout;
      xhr.onload = () => resolve(xhr);

      if (headers) {
        const { key, value } = headers;
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
