import { IBase } from '../../redux/app-redux.types';
import { AppDate, HasEmbeddedLabel, HasEmbeddedName, HasTaxCode, MaybeNull } from '../utils.types';
import { BusinessSubjectTypeEnum } from '../companies/companies.types';
import { CustomerTypeEnum, EngagementSource } from '../customers.types';
import { TagEntity } from '../tags.types';
import { AddressEntity } from '../addresses/addresses.types';
import { IContactsSlot } from 'types/contacts/contacts.types';

export interface IProfileBase {
  email?: string;
  phone?: string;

  age?: string;
  birthDate?: AppDate;

  avatarURL?: string;

  sexType?: MaybeNull<string>;

  type?: CustomerTypeEnum;
  businessType?: BusinessSubjectTypeEnum;
  engagementSource?: EngagementSource;

  contacts?: IContactsSlot[];
}

export interface IProfileRelatedFields extends HasEmbeddedLabel, HasEmbeddedName, HasTaxCode {
  tags?: TagEntity[];

  addresses?: AddressEntity[];
}

export interface ProfileEntity extends IBase, IProfileBase, IProfileRelatedFields {}
