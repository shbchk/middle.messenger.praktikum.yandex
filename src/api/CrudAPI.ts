import BaseAPI from './baseAPI';

export default abstract class CrudAPI extends BaseAPI {
  abstract create?(data: unknown): Promise<unknown>;

  abstract read?(identifier: string): Promise<unknown>;

  abstract update?(identifier: string, data: unknown): Promise<unknown>;

  abstract delete?(identifier: string): Promise<unknown>;
}
