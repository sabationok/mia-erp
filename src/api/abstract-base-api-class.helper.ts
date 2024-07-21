import { PartialRecord } from '../types/utils.types';
import { ApiHeaders } from './api.types';

export abstract class BaseApiClass {
  public static headers: PartialRecord<ApiHeaders | string, string> = {};
  public static setHeader(key: ApiHeaders | string, value: string) {
    this.headers[key] = value;

    return this;
  }
  public static removeHeader(key: ApiHeaders | string) {
    delete this.headers[key];
    return this;
  }
}
