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
  headers?: Record<string, string> | null;
  timeout?: number;
  stringify?: boolean;
};

type HTTPMethod = (url: string, options?: Options) => Promise<unknown>;

export default class HTTPTransport {
  static API_URL = 'https://ya-praktikum.tech/api/v2';

  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = HTTPTransport.API_URL + endpoint;
  }

  get: HTTPMethod = (url, options = { data: {} }) => {
    const newdata = queryStringify(options?.data);
    return this.request(url + newdata, {
      ...options,
      method: METHODS.GET,
      data: newdata,
    });
  };

  post: HTTPMethod = (
    url,
    options = {
      data: {},
    },
  ) => {
    return this.request(url, { ...options, method: METHODS.POST });
  };

  put: HTTPMethod = (
    url,
    options = {
      data: {},
    },
  ) => {
    return this.request(url, { ...options, method: METHODS.PUT });
  };

  delete: HTTPMethod = (
    url,
    options = {
      data: {},
    },
  ) => {
    return this.request(url, { ...options, method: METHODS.DELETE });
  };

  request = (
    url: string,
    {
      method = METHODS.GET,
      data,
      headers = { key: 'Content-Type', value: 'application/json' },
      stringify = true,
      timeout = 5000,
    }: Options,
  ) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, this.endpoint + url);
      xhr.timeout = timeout;
      // xhr.onload = () => resolve(xhr.response);

      if (headers !== null) {
        const { key, value } = headers;
        xhr.setRequestHeader(key, value);
      }

      const errorHandler = () => reject(xhr.response);

      xhr.onreadystatechange = (e) => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };

      if (stringify) {
        // eslint-disable-next-line no-param-reassign
        data = JSON.stringify(data);
      }

      xhr.onerror = errorHandler;
      xhr.onabort = errorHandler;
      xhr.ontimeout = errorHandler;

      xhr.responseType = 'json';
      xhr.withCredentials = true;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}
