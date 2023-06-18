import baseApi from './baseApi';
import { ITransactionRes } from 'redux/transactions/transactions.types';
import APP_CONFIGS, { ApiDirType, Endpoints } from '../redux/APP_CONFIGS';
import { IAllCategoriesRes } from '../redux/categories/categoriesThunks';
import { ICategory } from '../redux/categories/categories.types';
import { AppResponse } from '../redux/global.types';
import { IBaseDirItem } from '../components/Directories/dir.types';
import { AppQueryParams } from './index';

type GetAllByDirTypeOptions = Required<Pick<AppQueryParams, 'dirType'>> & {
  params?: Pick<AppQueryParams, 'isArchived' | 'createTreeData'>;
};

export interface ICategoryRes extends AppResponse<ICategory> {}

export interface IDirRes<RD = any> extends AppResponse<RD> {}

export default class DirectoriesApi {
  private static api = baseApi;
  private static endpoints = APP_CONFIGS.endpoints.directories;

  public static async getAllCategories(): Promise<IAllCategoriesRes> {
    return this.api.get(this.endpoints.getAll(ApiDirType.categories));
  }

  public static async createCategory(data: ICategory): Promise<ICategoryRes> {
    return this.api.post(this.endpoints.create(ApiDirType.categories), data);
  }

  public static async editCategory({ data, _id }: { data: ICategory; _id: string }): Promise<ICategoryRes> {
    return this.api.patch(this.endpoints.updateById(ApiDirType.categories, _id), data);
  }

  public static async deleteCategory(id: string): Promise<ITransactionRes> {
    return this.api.delete(this.endpoints.deleteById(ApiDirType.categories, id));
  }

  public static async create<DTO = any, RD = IBaseDirItem>({
    dirType,
    dto,
  }: {
    dirType: ApiDirType;
    dto: DTO;
  }): Promise<IDirRes<RD>> {
    return this.api.post(this.endpoints[Endpoints.create](dirType), dto);
  }

  public static async getAllByDirType<RD = IBaseDirItem>({
    dirType,
    params,
  }: GetAllByDirTypeOptions): Promise<IDirRes<RD[]>> {
    return this.api.get(this.endpoints[Endpoints.getAll](dirType), {
      params: {
        ...params,
        isArchived: false,
        createTreeData: false,
      },
    });
  }
}
