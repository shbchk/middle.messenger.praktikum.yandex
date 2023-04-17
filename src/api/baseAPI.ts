import HTTPTransport from '../utils/http';

export default abstract class BaseAPI {
  protected http: HTTPTransport;

  constructor(endpoint: string) {
    this.http = new HTTPTransport(endpoint);
  }
}
