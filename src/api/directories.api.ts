import APP_CONFIGS, { Endpoints } from '../redux/APP_CONFIGS';
import { ApiResponse } from '../redux/app-redux.types';
import { IBaseDirItem } from '../types/dir.types';
import { ApiQueryParams } from './index';
import { ClientApi } from './client.api';

export type GetAllByDirTypeOptions = Required<Pick<ApiQueryParams, 'dirType'>> & {
  params?: Pick<ApiQueryParams, 'isArchived' | 'createTreeData'>;
};

export interface IDirRes<RD = any> extends ApiResponse<RD> {}

export default class DirectoriesApi {
  private static api = ClientApi.clientRef;
  private static endpoints = APP_CONFIGS.endpoints.directories;

  public static async create<DTO = any, RD = IBaseDirItem>({
    dirType,
    data,
    params,
  }: {
    data: DTO;
  } & GetAllByDirTypeOptions): Promise<IDirRes<RD[]>> {
    return this.api.post(this.endpoints[Endpoints.create](dirType), data, {
      params: {
        isArchived: false,
        createTreeData: true,
        ...params,
      },
    });
  }

  public static async changeArchiveStatus<RD = IBaseDirItem>({
    dirType,
    params,
    _id,
    isArchived,
  }: {
    _id: string;
    isArchived: boolean;
  } & GetAllByDirTypeOptions): Promise<IDirRes<RD[]>> {
    return this.api.patch(
      this.endpoints[Endpoints.changeArchiveStatus](dirType, _id),
      { isArchived },
      {
        params: {
          isArchived: false,
          createTreeData: true,
          ...params,
        },
      }
    );
  }

  public static async update<DTO = any, RD = IBaseDirItem>({
    dirType,
    _id,
    data,
    params,
  }: {
    data: Omit<DTO, '_id' | 'createdAt' | 'updatedAt'>;
    _id: string;
  } & GetAllByDirTypeOptions): Promise<IDirRes<RD[]>> {
    return this.api.patch(this.endpoints[Endpoints.updateById](dirType, _id), data, {
      params: {
        isArchived: false,
        createTreeData: true,
        ...params,
      },
    });
  }

  public static async delete<RD = IBaseDirItem>({
    dirType,
    _id,
    params,
  }: {
    _id: string;
  } & GetAllByDirTypeOptions): Promise<IDirRes<RD[]>> {
    return this.api.delete(this.endpoints[Endpoints.deleteById](dirType, _id), {
      params: {
        isArchived: false,
        deleted: false,
        createTreeData: true,
        ...params,
      },
    });
  }

  public static async getAllByDirType<RD = IBaseDirItem>(args?: GetAllByDirTypeOptions): Promise<IDirRes<RD[]>> {
    return this.api.get(this.endpoints[Endpoints.getAllByType](args?.dirType), {
      params: {
        isArchived: false,
        createTreeData: true,
        ...args?.params,
      },
    });
  }

  public static async getAllDirectoriesGroupedData() {
    return this.api.get(this.endpoints[Endpoints.getAllGrouped](''));
  }

  public static async getDefaultDirectories() {
    return this.api.get(this.endpoints[Endpoints.getDefaultDirectories](''));
  }
}
