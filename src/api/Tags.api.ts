import { ClientApi } from './client.api';
import { TagEntity, TagItemDto } from '../types/tags.types';
import { TagTypeEnum } from '../types/directories.types';
import { ApiAxiosResponse } from '../redux/app-redux.types';

export class TagsApi extends ClientApi {
  private static readonly _api = this.clientRef;
  private static readonly endpoints = ClientApi._endpoints.tags;

  public static getAll = (
    _?: undefined,
    params?: { ids?: string[]; type?: TagTypeEnum; types?: TagTypeEnum[] }
  ): Promise<ApiAxiosResponse<TagEntity[]>> => {
    return this._api.get(this.endpoints.getAll(), { params });
  };
  public static getOne = (_?: undefined, params?: { _id: string }): Promise<ApiAxiosResponse<TagEntity>> => {
    return this._api.get(this.endpoints.getOne(), { params });
  };
  public static create = (data?: Omit<TagItemDto, '_id'>): Promise<ApiAxiosResponse<TagEntity>> => {
    return this._api.post(this.endpoints.create(), data);
  };

  public static update = (data?: TagItemDto): Promise<ApiAxiosResponse<TagEntity>> => {
    return this._api.patch(this.endpoints.update(), data);
  };

  public static delete = (
    data?: { _id: string },
    params?: { soft?: boolean }
  ): Promise<ApiAxiosResponse<{ result: boolean }>> => {
    return this._api.delete(this.endpoints.delete(data?._id), { params });
  };
}
