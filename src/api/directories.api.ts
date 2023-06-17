import baseApi from './baseApi';
import { ITransactionRes } from 'redux/transactions/transactions.types';
import APP_CONFIGS, { ApiDirType } from '../redux/APP_CONFIGS';
import { IAllCategoriesRes } from '../redux/categories/categoriesThunks';
import { ICategory } from '../redux/categories/categories.types';
import { AppResponse } from '../redux/global.types';

export interface ICategoryRes extends AppResponse<ICategory> {}

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

  // public static async getById(id: string): Promise<ITransactionRes> {
  //   return this.api.get(this.endpoints.getById(id));
  // }
  //
  // public static async deleteById(id: string): Promise<ITransactionRes> {
  //   return this.api.delete(this.endpoints.deleteById(id));
  // }
}
