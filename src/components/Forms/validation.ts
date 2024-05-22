import * as yup from 'yup';
import { AddressDto } from '../../redux/global.types';

export const UUIDSchema = yup.string().uuid();

export const UUIDRefSchema = yup.object().shape({
  _id: UUIDSchema,
});
export const arrOfUUIDSchema = yup.array().of(UUIDSchema).min(1);

export const isStringOrNumberSchema = yup
  .mixed()
  .test('is-string-or-number', 'Value must be a string or a number', function (value: any) {
    return typeof value === 'string' || typeof value === 'number';
  });

export const orderInfoBaseSchema = yup.object().shape({
  manager: UUIDRefSchema.required('Is required field'),
  status: yup.string(),

  customer: UUIDRefSchema.required('Is required field'),
  customerCommunicationMethods: arrOfUUIDSchema,
  receiver: UUIDRefSchema,
  receiverCommunicationMethods: arrOfUUIDSchema,

  invoiceInfo: yup.object().shape({
    method: UUIDRefSchema,
    expireAt: yup.date(),
  }),

  deliveryInfo: yup.object().shape({
    method: UUIDRefSchema,
    destination: yup.object().shape({
      country: yup.string(),
      region: yup.string(),
      area: yup.string(),
      house: yup.string(),
      street: yup.string(),
      room: yup.string(),
      office: yup.string(),
      district: yup.string(),
    } as Record<keyof AddressDto, any>),

    invoiceInfo: yup.object().shape({
      method: UUIDRefSchema,
      expireAt: yup.date(),
    }),
  }),

  shipmentInfo: yup.object().shape({
    executeAt: yup.date(),
  }),
});

// export const createCompanyFormSchema = yup.object().shape({
//   name: {
//     first: yup.string(),
//     second: yup.string(),
//     middle: yup.string(),
//   },
//   label: {
//     base: yup.string(),
//     print: yup.string(),
//   },
//   email: yup.string().email().required(),
//   businessSubjectType: yup.string().oneOf(Object.values(BusinessSubjectTypeEnum), 'Недопустиме значення').required(),
//   ownershipType: yup.object().shape({
//     label: yup.string(),
//     value: yup.string().oneOf(Object.values(OwnershipTypeEnum), 'Недопустиме значення'),
//   }),
//   taxCode: yup.string(),
//   phone: yup.string(),
// });
