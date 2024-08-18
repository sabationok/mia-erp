import * as yup from 'yup';
import { t } from '../lang';
import { PartialRecord, Values } from '../types/utils.types';
import { isValidURL } from '../utils/validators/isValidUrl.validator';

export const validationErrorMsgs = {
  name: {
    first: 'First name is required',
    second: 'Second name is required',
  },
  email: {
    isRequired: 'Email is required',
    isNotValid: 'Invalid email',
  },
  phone: {
    isRequired: 'Phone number is required',
    isNotValid: 'Phone number is not valid',
  },

  delivery: {
    method: {
      isRequired: t('Delivery method is required'),
      _id: 'Method ID is required',
    },
  },
  password: {
    invalidLength: (length: number = 6) => `Password length should be at least ${length} characters`,
    invalidPassword: 'Password is invalid',
    doNotMatch: 'Passwords do not match',
  },
  destination: {
    isRequired: t('Destination info is required'),
    city: t('City is required'),
    warehouse: t('Warehouse is required'),
  },
  isRequiredField: t('Field is required'),
};

export const isUUID = yup.string().uuid();
export const isEnum = <T extends object | string[]>(objOrArr: T) =>
  yup.string().oneOf<Values<T>>(Object.values(objOrArr), `Available values: ${Object.values(objOrArr).join(', ')}`);
export const isString64 = yup.string().max(64);
export const isString255 = yup.string().max(255);
export const isString500 = yup.string().max(500);
const EmailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i;

export const isUrl = (params?: Parameters<typeof isValidURL>[1]) => {
  return yup.string().test('isValidUrl', 'Is not valid url', (value, context) => {
    return value ? isValidURL(value, params) : true;
  });
};
export const isEmail = yup
  .string()
  .email({ regex: EmailRegExp })
  .matches(EmailRegExp, validationErrorMsgs.email.isNotValid);

export const isPassword = (length: number = 6) =>
  yup.string().min(length, validationErrorMsgs.password.invalidLength(length));
export const isUaMobilePhone = yup.string().matches(/^\+380\d{9}$/, validationErrorMsgs.phone.isNotValid);

const nameFields = {
  second: isString255,
  first: isString255,
  middle: isString255,
};

export function isNameFields({
  required = ['first', 'second'],
}: {
  required?: (keyof typeof nameFields)[];
} = {}) {
  for (const key of required) {
    nameFields[key] = nameFields[key].required(validationErrorMsgs.isRequiredField);
  }

  return nameFields;
}

export const isDynamicValue = <T extends PartialRecord<string, string[]>>(
  dataKey: string,
  valuesMap: T,
  options?: {
    message?: string;
  }
) => {
  return yup
    .array()
    .of(yup.string())
    .when(dataKey as string, ([currentValue], schema, options) => {
      const validScopes = currentValue ? valuesMap[currentValue] : undefined;
      // const sch = schema.test('is-valid-value-from-data-map', options?.message || 'Invalid value', scopes => {
      //   // Перевірка, чи всі введені scopes доступні для обраного provider
      //   return validScopes?.length ? scopes?.every(scope => (scope ? validScopes?.includes(scope) : true)) : true;
      // });
      const { path } = options as { path?: string };

      if (validScopes?.length) {
        return schema
          .of(yup.string().oneOf(validScopes))
          .required(`Value ${path} is required`)
          .min(1, `At least one value in ${path} is required`);
      } else {
        return schema;
      }
    });
};
export const isNameSchema = yup.object().shape(
  isNameFields()
  // {
  // first: nameFields.first.required(validationErrorMsgs.name.first),
  // second: nameFields.second.required(validationErrorMsgs.name.second),
  // middle: nameFields.middle,
  // }
);
export const passwordFields = {
  password: isPassword().required(validationErrorMsgs.isRequiredField),
  passwordCheck: isPassword()
    .required(validationErrorMsgs.isRequiredField)
    .oneOf([yup.ref('password')], validationErrorMsgs.password.doNotMatch),
};
