import { HttpApi } from '../api/HttpApi';
import type { ApiClientManager } from '../api/ApiClientManager';

export abstract class BaseSdk {
  protected _client: HttpApi.CustomAxiosInstance;
  protected constructor(protected manager: ApiClientManager) {
    this._client = manager.clientRef;
  }
}
