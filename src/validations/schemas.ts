import * as yup from 'yup';
import { t } from '../lang';
import { PartialRecord, Values } from '../types/utils.types';
import { isValidURL } from '../utils/validators/isValidUrl.validator';
import { ObjectEntries, ObjectFromEntries } from '../utils';

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
export const isString64 = () => yup.string().max(64);
export const isString255 = () => yup.string().max(255);
export const isString500 = () => yup.string().max(500);

export const isUrl = (params?: Parameters<typeof isValidURL>[1]) => {
  return yup.string().test('isValidUrl', 'Is not valid url', (value, context) => {
    return value ? isValidURL(value, params) : true;
  });
};
/// * =============== EMAIL
const EmailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i;

export const isEmail = (params?: { domainsList: { white?: string[]; black?: string[]; ignore?: string[] } }) =>
  yup.string().when({
    is: (v: string) => {
      if (!v) return false;
      const domain = v.split('@')[1];
      params?.domainsList?.ignore?.includes(domain) && console.warn(`${v} is ignored`);
      // Якщо домен є в білому списку, пропускаємо всі інші валідації
      return params?.domainsList?.ignore?.includes(domain) ?? false;
    },
    then: schema =>
      schema.test('isWhiteListedEmail', 'Email is valid (ignored)', () => {
        console.warn('Email пропущено, так як домен у білому списку');
        return true;
      }),
    otherwise: schema =>
      schema
        .email(validationErrorMsgs.email.isNotValid) // Валідація на формат email
        .matches(EmailRegExp, validationErrorMsgs.email.isNotValid) // Додатковий regex
        .test('isValidEmail', 'Email is not allowed', v => {
          if (!v) return false;

          const domain = v.split('@')[1];

          // Якщо домен є в чорному списку, валідація не пройде
          if (params?.domainsList?.black?.includes(domain)) {
            console.error('isEmail | domainsList.black');
            return false;
          }

          // Якщо є ignore список, дозволити email
          if (params?.domainsList?.ignore?.includes(domain)) {
            console.error('isEmail | domainsList.ignore');
            return true;
          }

          return true; // Якщо домен не в чорному списку, валідація пройде
        }),
  });
// .test('isIgnoreListedEmail', 'Email is valid (ignored)', function (v) {
//   if (v) {
//     const domain = v.split('@')[1];
//
//     // Якщо домен є в білому списку, пропускаємо всі інші валідації
//     if (params?.domainsList?.ignore?.includes(domain)) {
//       console.error('isEmail | domainsList.white');
//       return true; // Пропускаємо всі інші валідації
//     }
//   }
//   return true; // Продовжуємо інші валідації, якщо домен не в білому списку
// })
// .email({ regex: EmailRegExp })
// .matches(EmailRegExp, validationErrorMsgs.email.isNotValid)
// .test('isCustomEmail', v => {
//   if (v && params?.domainsList?.black?.includes(v?.split('@')[1])) {
//     console.error('isEmail | domainsList.black');
//     return false;
//   }
//   return true;
// })
// .test('isWthiteListed', '', v => {
//   if (v && params?.domainsList?.white?.includes(v?.split('@')[1])) {
//     console.error('isEmail | domainsList.white');
//     return true;
//   }
//   return true;
// });

export const isPassword = (length: number = 6) =>
  yup.string().min(length, validationErrorMsgs.password.invalidLength(length));
export const isUaMobilePhone = () => yup.string().matches(/^\+380\d{9}$/, validationErrorMsgs.phone.isNotValid);

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
  return ObjectFromEntries(
    ObjectEntries(nameFields).map(([key, value]) => {
      return [key, required.includes(key) ? value().required() : value()] as const;
    })
  );
}

export const isNameSchema = (required?: (keyof typeof nameFields)[]) => yup.object().shape(isNameFields({ required }));

const labelFields = {
  base: isString255,
  print: isString255,
};
export function isLabelFields({
  required = ['base'],
}: {
  required?: (keyof typeof labelFields)[];
} = {}) {
  return ObjectFromEntries(
    ObjectEntries(labelFields).map(([key, value]) => {
      return [key, required.includes(key) ? value().required() : value()] as const;
    })
  );
}
export const isLabelSchema = (required?: (keyof typeof labelFields)[]) =>
  yup.object().shape(isLabelFields({ required }));

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
export const passwordFields = {
  password: isPassword().required(validationErrorMsgs.isRequiredField),
  passwordCheck: isPassword()
    .required(validationErrorMsgs.isRequiredField)
    .oneOf([yup.ref('password')], validationErrorMsgs.password.doNotMatch),
};
