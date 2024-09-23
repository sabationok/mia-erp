import { ApiAxiosResponse, DataView } from './api.types';
import { IBaseDirItem } from '../types/dir.types';
import { ApiQueryParams } from './index';
import { ClientApi } from './client.api';

export type GetAllByDirTypeOptions = Required<Pick<ApiQueryParams, 'dirType'>> & {
  params?: Pick<ApiQueryParams, 'withDeleted' | 'dataView' | 'parentId'>;
};

export interface IDirRes<RD = any> extends ApiAxiosResponse<RD> {}

export default class DirectoriesApi {
  private static api = ClientApi.clientRef;
  private static endpoints = ClientApi._endpoints.directories;

  public static create = <DTO = any, RD = IBaseDirItem>({
    dirType,
    data,
    params,
  }: {
    data: DTO;
  } & GetAllByDirTypeOptions): Promise<IDirRes<RD[]>> => {
    return this.api.post(this.endpoints.create(dirType), data, {
      params: {
        isArchived: false,
        dataView: DataView.tree,
        ...params,
      },
    });
  };

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
      this.endpoints.changeArchiveStatus(dirType, _id),
      { isArchived },
      {
        params: {
          isArchived: false,
          dataView: DataView.tree,
          ...params,
        },
      }
    );
  }

  public static update = <DTO = any, RD = IBaseDirItem>({
    dirType,
    _id,
    data,
    params,
  }: {
    data: Omit<DTO, '_id' | 'createdAt' | 'updatedAt'>;
    _id: string;
  } & GetAllByDirTypeOptions): Promise<IDirRes<RD[]>> => {
    return this.api.patch(this.endpoints.updateById(dirType, _id), data, {
      params: {
        isArchived: false,
        dataView: DataView.tree,
        ...params,
      },
    });
  };

  public static delete = <RD = IBaseDirItem>({
    dirType,
    _id,
    params,
  }: {
    _id: string;
  } & GetAllByDirTypeOptions): Promise<IDirRes<RD[]>> => {
    return this.api.delete(this.endpoints.deleteById(dirType, _id), {
      params: {
        withArchived: false,
        deleted: false,
        dataView: DataView.tree,
        ...params,
      },
    });
  };

  public static getAllByDirType = <RD = IBaseDirItem>(args?: GetAllByDirTypeOptions): Promise<IDirRes<RD[]>> => {
    return this.api.get(this.endpoints.getAllByType(args?.dirType), {
      params: {
        withArchived: true,
        dataView: DataView.tree,
        ...args?.params,
      },
    });
  };

  public static getAllDirectoriesGroupedData = () => {
    return this.api.get(this.endpoints.getAllGrouped(''));
  };
}
