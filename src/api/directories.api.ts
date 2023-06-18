import baseApi from './baseApi';
import APP_CONFIGS, { ApiDirType, Endpoints } from '../redux/APP_CONFIGS';
import { AppResponse } from '../redux/global.types';
import { IBaseDirItem } from '../components/Directories/dir.types';
import { AppQueryParams } from './index';

type GetAllByDirTypeOptions = Required<Pick<AppQueryParams, 'dirType'>> & {
  params?: Pick<AppQueryParams, 'isArchived' | 'createTreeData'>;
};

export interface IDirRes<RD = any> extends AppResponse<RD> {}

export default class DirectoriesApi {
  private static api = baseApi;
  private static endpoints = APP_CONFIGS.endpoints.directories;

  public static async create<DTO = any, RD = IBaseDirItem>({
    dirType,
    dto,
  }: {
    dirType: ApiDirType;
    dto: DTO;
  }): Promise<IDirRes<RD>> {
    return this.api.post(this.endpoints[Endpoints.create](dirType), dto);
  }

  public static async delete<RD = IBaseDirItem>({
    dirType,
    _id,
  }: {
    _id: string;
  } & Required<Pick<AppQueryParams, 'dirType'>>): Promise<IDirRes<RD & { deletedChildrens?: number }>> {
    return this.api.delete(this.endpoints[Endpoints.deleteById](dirType, _id));
  }

  public static async update<DTO = any, RD = IBaseDirItem>({
    dirType,
    _id,
    data,
  }: {
    data: DTO;
    _id: string;
  } & Required<Pick<AppQueryParams, 'dirType'>>): Promise<IDirRes<RD>> {
    return this.api.patch(this.endpoints[Endpoints.updateById](dirType, _id), data);
  }

  public static async getAllByDirType<RD = IBaseDirItem>({
    dirType,
    params,
  }: GetAllByDirTypeOptions): Promise<IDirRes<RD[]>> {
    return this.api.get(this.endpoints[Endpoints.getAll](dirType), {
      params: {
        isArchived: false,
        createTreeData: false,
        ...params,
      },
    });
  }
}
