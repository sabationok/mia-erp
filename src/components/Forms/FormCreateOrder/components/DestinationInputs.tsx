import { AddressDto } from 'redux/app-redux.types';
import { HTMLAttributes } from 'react';
import { t } from 'i18e';

export const destinationAddressInputsProps: ({
  name: keyof AddressDto;
  label: string;
  required?: boolean;
} & HTMLAttributes<HTMLInputElement>)[] = [
  { name: 'country', label: t('Country'), required: false },
  { name: 'region', label: t('Region'), required: false },
  { name: 'area', label: t('Area'), required: false },
  { name: 'city', label: t('City'), required: false },
  { name: 'street', label: t('Street'), required: false },
  { name: 'house', label: t('House'), required: false },
  { name: 'office', label: t('Office'), required: false },
  { name: 'room', label: t('Room'), required: false },
];
