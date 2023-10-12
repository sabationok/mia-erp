import { AppQueryParams } from '../../api';
import { IBase } from '../global.types';
import { IOrder } from '../orders/orders.types';

export interface ICustomerBase extends IBase {
  name?: string;
  secondName?: string;
  email?: string;
  avatarURL?: string;
  tags?: string[];
}
export interface ICustomer extends ICustomerBase {
  orders?: IOrder[];
}

export interface ICustomerDto extends ICustomerBase {}

export interface ICustomerFormData extends ICustomerDto {}

export interface ICustomerReqDta {
  _id?: string;
  data?: ICustomerDto;
  params?: AppQueryParams;
}
