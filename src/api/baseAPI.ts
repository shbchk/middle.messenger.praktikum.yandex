import HTTPTransport from '../utils/http';

export default abstract class BaseAPI {
  protected http: HTTPTransport;

  constructor(endpoint: string) {
    this.http = new HTTPTransport(endpoint);
  }

  abstract create?(data: unknown): Promise<unknown>;

  abstract read?(identifier: string): Promise<unknown>;

  abstract update?(identifier: string, data: unknown): Promise<unknown>;

  abstract delete?(identifier: string): Promise<unknown>;
}
