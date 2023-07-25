import baseApi from './baseApi';
import APP_CONFIGS, { Endpoints } from '../redux/APP_CONFIGS';
import { AppResponse } from '../redux/global.types';
import { IBaseDirItem } from '../components/Directories/dir.types';
import { AppQueryParams } from './index';

export type GetAllByDirTypeOptions = Required<Pick<AppQueryParams, 'dirType'>> & {
  params?: Pick<AppQueryParams, 'isArchived' | 'createTreeData'>;
};

export interface IDirRes<RD = any> extends AppResponse<RD> {}

export default class DirectoriesApi {
  private static api = baseApi;
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

  public static async delete<RD = IBaseDirItem>({
    dirType,
    _id,
  }: {
    _id: string;
  } & GetAllByDirTypeOptions): Promise<IDirRes<RD & { deletedChildren?: number }>> {
    return this.api.delete(this.endpoints[Endpoints.deleteById](dirType, _id));
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
}
