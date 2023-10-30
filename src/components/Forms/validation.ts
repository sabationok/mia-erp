import * as yup from 'yup';
import { AddressDto } from '../../redux/global.types';

export const UUIDSchema = yup.string().uuid();
export const UUIDRefSchema = yup.object().shape({
  _id: UUIDSchema,
});
export const arrOfUUIDSchema = yup.array().of(UUIDSchema).min(1);

export const orderInfoBaseSchema = yup.object().shape({
  manager: UUIDRefSchema.required('Is required field'),
  status: yup.string(),

  customer: UUIDRefSchema.required('Is required field'),
  customerCommunicationMethods: arrOfUUIDSchema,
  receiver: UUIDRefSchema,
  receiverCommunicationMethods: arrOfUUIDSchema,

  invoiceInfo: yup.object().shape({
    method: UUIDRefSchema,
    expiredAt: yup.date().required('Is required field'),
    createForOrders: yup.boolean(),
  }),

  shipmentInfo: yup.object().shape({
    method: UUIDRefSchema,
    paymentMethod: UUIDRefSchema,
    destination: yup.object().shape({
      country: yup.string().required('Is required field'),
      region: yup.string().required('Is required field'),
      area: yup.string(),
      house: yup.string(),
      street: yup.string().required('Is required field'),
      room: yup.string(),
      office: yup.string(),
      district: yup.string(),
    } as Record<keyof AddressDto, any>),
  }),
});
