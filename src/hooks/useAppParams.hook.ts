import { useParams } from 'react-router-dom';

export enum AppUrlParamKeys {
  companyId = 'companyId',
  permissionId = 'permissionId',
  warehouseId = 'warehouseId',
  priceListId = 'priceListId',
  priceId = 'priceId',
  productId = 'productId',
  orderId = 'orderId',
  refundId = 'refundId',
  customerId = 'customerId',
}
export type AppUrlParams = Record<AppUrlParamKeys, string>;
const useAppParams = (): Readonly<Partial<AppUrlParams>> => useParams<AppUrlParams>();

export default useAppParams;
