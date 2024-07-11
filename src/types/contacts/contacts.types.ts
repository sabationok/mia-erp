import { HasCompany, IBase } from '../utils.types';
import { HasCustomer } from '../customers.types';

export enum ChatProviderEnum {
  local = 'local',
  telegram = 'telegram',
}

export interface ContactsSlotBase {
  email?: string;
  phone?: string;
  chat?: {
    botId?: string;
    directId?: string;
    provider?: ChatProviderEnum;
  };
}

export interface IContactsSlot extends ContactsSlotBase {}
export interface ContactsEntity extends IBase, ContactsSlotBase, HasCompany, HasCustomer {}

export interface ContactsDto extends ContactsSlotBase {
  ownerId?: string;
}
