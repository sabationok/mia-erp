import { ApiQueryParams, ApiQuerySearchParams, ApiQuerySortParams, DatePeriodQuery } from './index';
import { OfferEntity, OfferReqData, OfferStatusEnum, OfferTypeEnum } from '../types/offers/offers.types';
import { ApiAxiosResponse } from '../redux/app-redux.types';
import { ClientApi } from './client.api';
import { UUID } from '../types/utils.types';
import { OfferSearchParam, OfferSortParam } from '../data';

export interface GetOneOfferQuery {
  _id?: UUID;
  getPrices?: boolean;
  getVariations?: boolean;
  getDiscounts?: boolean;
}
export interface GetAllOffersQuery
  extends Pick<
      ApiQueryParams,
      'sku' | 'label' | 'barCode' | 'limit' | 'offset' | 'tagsIds' | 'categoriesIds' | 'brandsIds' | 'propertiesIds'
    >,
    ApiQuerySortParams<OfferSortParam['dataPath']>,
    ApiQuerySearchParams<OfferSearchParam['dataPath']> {
  warehouse?: {
    ids?: string[];
    code?: string;
    label?: string;
  };
  type?: OfferTypeEnum;
  approved?: OfferStatusEnum;
  visible?: boolean;
  isVisible?: boolean;
  createdAt?: DatePeriodQuery;
  updatedAt?: DatePeriodQuery;
  deletedAt?: DatePeriodQuery;
}
export default class OffersApi {
  private static api = ClientApi.clientRef;
  private static endpoints = ClientApi._endpoints.offers;

  public static getAll = async (
    _?: undefined,
    params?: GetAllOffersQuery
  ): Promise<ApiAxiosResponse<OfferEntity[]>> => {
    return this.api.get(this.endpoints.getAll(), {
      params,
    });
  };

  public static create = (data?: OfferReqData): Promise<ApiAxiosResponse<OfferEntity>> => {
    return this.api.post(this.endpoints.create(), data?.data);
  };

  public static updateById = (data?: OfferReqData): Promise<ApiAxiosResponse<OfferEntity>> => {
    return this.api.patch(this.endpoints.updateById(data?._id), data?.data);
  };

  public static getById = (id?: string, params?: ApiQueryParams): Promise<ApiAxiosResponse<OfferEntity>> => {
    return this.api.get(this.endpoints.getById(id), { params });
  };

  public static getOne = ({ params }: { params?: GetOneOfferQuery } = {}): Promise<ApiAxiosResponse<OfferEntity>> => {
    return this.api.get(this.endpoints.getOne(), { params });
  };

  public static getFullInfoById = (id?: string, params?: ApiQueryParams): Promise<ApiAxiosResponse<OfferEntity>> => {
    return this.api.get(this.endpoints.getFullInfoById(id), { params });
  };

  public static deleteById = (id?: string): Promise<ApiAxiosResponse<OfferEntity>> => {
    return this.api.delete(this.endpoints.deleteById(id));
  };
}
