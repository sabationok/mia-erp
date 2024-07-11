import { HasCompany, HasReference, IBase, WithPeriod } from '../utils.types';

export interface IWarehousingDocumentBase extends WithPeriod {
  type?: string;
  quantity?: string;
  batch?: string;
}

export interface WarehousingDocumentEntity extends IBase, HasCompany, HasReference {}
