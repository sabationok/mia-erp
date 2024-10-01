import { ClientApi } from './client.api';
import { WarehousesSdk } from '../sdk/warehouses.sdk';

export const WarehousesApi = new WarehousesSdk(ClientApi);
export default WarehousesApi;
