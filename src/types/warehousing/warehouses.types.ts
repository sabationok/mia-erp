import { HasEmail, HasLabel, HasPhone, HasStatus, HasType, IBase, MaybeNull, OnlyUUID, UUID } from '../utils.types';
import { CompanyEntity } from '../companies/companies.types';
import { ApiQueryParams } from '../../api';
import { AddressDto, AddressEntity } from '../addresses/addresses.types';
import { InputConnectionEntity } from '../integrations.types';
import { WarehouseInventoryEntity } from './warehouse-inventory.types';
import { WarehousingDocumentEntity } from './warehouse-documents.types';

export enum WarehouseTypeEnum {
  WAREHOUSE = 'warehouse',
  STORE = 'store',
}
export enum WarehouseStatusEnum {
  active = 'active',
  closed = 'closed',
}
export interface WarehouseBaseEntity extends HasType<WarehouseTypeEnum>, HasLabel, HasEmail, HasPhone {
  code?: string;
}
export interface WarehouseEntity extends IBase, HasStatus<WarehouseStatusEnum>, WarehouseBaseEntity {
  owner?: CompanyEntity;
  manager?: OnlyUUID;

  parent?: WarehouseEntity;
  children?: WarehouseEntity[];

  inventories?: WarehouseInventoryEntity[];
  documents?: WarehousingDocumentEntity[];

  integrations?: InputConnectionEntity[];

  address?: AddressEntity;
}

export interface WarehouseDto extends WarehouseBaseEntity {
  managerId?: UUID;
  address?: AddressDto;
}

export interface IWarehouseReqData {
  _id?: string;
  data: WarehouseDto;
  params?: ApiQueryParams;
}

export interface HasWarehouse {
  warehouse?: MaybeNull<WarehouseEntity>;
}
