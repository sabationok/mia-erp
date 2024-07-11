import { IBase } from '../../redux/app-redux.types';
import { GeolocationPoint } from '../../services/Geolocation.service';

export interface AddressDto {
  country?: string;
  region?: string;
  district?: boolean;

  area?: string;
  city?: string;
  street?: string;

  postCode?: string;
  postalCode?: string;

  house?: number;
  office?: string;
  room?: string;

  warehouse?: string;
  parcelShop?: string;
  postMachine?: string;

  location?: GeolocationPoint;
}

export interface IAddressBase extends AddressDto {}
export interface AddressEntity extends AddressDto, IBase {}
