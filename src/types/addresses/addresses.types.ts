import { GeolocationPoint } from '../../services/Geolocation.service';
import { HasBaseCmsConfigs } from '../cms.types';
import { WarehouseEntity, WarehouseTypeEnum } from '../warehousing';
import { HasCmsParams } from '../cms/cms-params.types';
import { HasLabel, HasType, IBase, OnlyUUID, PartialRecord } from '../utils.types';

export enum AddressSlotTypeEnum {
  address = 'address',
  country = 'country',
  region = 'region',
  district = 'district',
  city = 'city',
  street = 'street',
  building = 'building',
  apartment = 'apartment',
  zip = 'zip',
  note = 'note',
  physical = 'physical',
  dropoff = 'dropoff',
  legal = 'legal',
  postal = 'postal',
  pickup = 'pickup',
  customs = 'customs',
}

export interface AddressDto extends PartialRecord<AddressSlotTypeEnum, string> {
  location?: GeolocationPoint;

  locale?: string;
}

export interface AddressSlotDto extends HasBaseCmsConfigs {
  locale?: string;
  type: AddressSlotTypeEnum;
  label: string;
  extId?: string;
}

export enum AddressProviderEnum {
  novapost = 'novapost',
  ukrpost = 'ukrpost',
  default = 'default',
}

type AddressSlotExtra = Record<string, any>;
export interface AddressSlotEntity extends IBase, HasType<AddressSlotTypeEnum>, HasLabel, HasCmsParams {
  parent?: AddressSlotEntity;
  children?: AddressSlotEntity[];

  provider?: AddressProviderEnum;

  locale?: string;

  location?: GeolocationPoint;
  extra?: AddressSlotExtra;
}

interface HasAddressProvider {
  provider?: AddressProviderEnum;
}
interface HasAddressWarehouseDto {
  warehouse?: HasType<WarehouseTypeEnum> &
    Partial<OnlyUUID> & {
      label?: string;
    };
}
export interface DestinationAddressDto
  extends PartialRecord<AddressSlotTypeEnum, string>,
    HasAddressWarehouseDto,
    HasAddressProvider {}

type AddressDtoFieldValue = {
  label?: string;
  type?: AddressSlotTypeEnum;
};

export interface CreateAddressDto
  extends PartialRecord<AddressSlotTypeEnum, AddressDtoFieldValue>,
    HasAddressWarehouseDto,
    HasAddressProvider {
  customerId?: string;
  warehouseId?: string;

  extId?: string;
  extRef?: string;
}
export interface AddressEntity extends IBase, Record<AddressSlotTypeEnum, AddressSlotEntity> {
  warehouse?: Pick<WarehouseEntity, '_id' | 'label' | 'code' | 'type'>;
  customer?: IBase;
}
