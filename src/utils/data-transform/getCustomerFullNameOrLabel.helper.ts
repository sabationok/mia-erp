import { ICustomer } from '../../types/customers.types';

export function getCustomerFullNameOrLabel(info: ICustomer): string {
  const entry = info?.label ?? info?.name;

  return entry
    ? Object.values(entry)
        .map(value => value ?? '')
        .join(' ')
    : '---';
}
