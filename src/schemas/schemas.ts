import * as YUP from 'yup';
import { PartialRecord, Values } from '../types/utils.types';
import { isValidURL } from '../utils/validators/isValidUrl.validator';
import { ObjectEntries, ObjectFromEntries } from '../utils';
import { t } from '../i18e';

export const IsUUID = () => YUP.string().uuid();
export const IsUUIDRef = () =>
  YUP.object().shape({
    _id: IsUUID().required(),
  });
export const IsEnum = <T extends object | string[]>(objOrArr: T) =>
  YUP.string().oneOf<Values<T>>(Object.values(objOrArr), `Available values: ${Object.values(objOrArr).join(', ')}`);
export const IsString64 = () => YUP.string().max(64);
export const IsString255 = () => YUP.string().max(255);
export const isString500 = () => YUP.string().max(500);

export const IsUrl = (params?: Parameters<typeof isValidURL>[1]) => {
  return YUP.string().test('isValidUrl', 'Is not valid url', value => {
    return value ? isValidURL(value, params) : true;
  });
};
/// * =============== EMAIL
const EmailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i;

export const IsEmail = (params?: { domainsList: { white?: string[]; black?: string[]; ignore?: string[] } }) =>
  YUP.string().when({
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
        .email(t('')) // Валідація на формат email
        .matches(EmailRegExp, t('')) // Додатковий regex
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

export const IsPassword = (length: number = 6) =>
  IsString64().min(length, t('').replace('{{length}}', length.toString()));
export const IsUaMobilePhone = () => YUP.string().matches(/^\+380\d{9}$/, t(''));

type FieldsMap = Record<string, () => YUP.Schema<any>>;

function IsFieldsSet<Fields extends FieldsMap>({ required, fields }: { required: (keyof Fields)[]; fields: Fields }) {
  return ObjectFromEntries(
    ObjectEntries(fields).map(([key, value]) => {
      return [String(key), required.includes(key) ? value().required() : value()] as const;
    })
  );
}

const nameFields = {
  second: IsString255,
  first: IsString255,
  middle: IsString255,
};

export function isNameFields({
  required = ['first', 'second'],
}: {
  required?: (keyof typeof nameFields)[];
} = {}) {
  return IsFieldsSet({ fields: nameFields, required });
}

export const isNameSchema = (required?: (keyof typeof nameFields)[]) => YUP.object().shape(isNameFields({ required }));

const labelFields = {
  base: IsString255,
  print: IsString255,
};

export function isLabelFields({
  required = ['base'],
}: {
  required?: (keyof typeof labelFields)[];
} = {}) {
  return IsFieldsSet({ fields: labelFields, required });
}
export const isLabelSchema = (required?: (keyof typeof labelFields)[]) =>
  YUP.object().shape(isLabelFields({ required }));

export const IsDynamicValue = <T extends PartialRecord<string, string[]>>(
  dataKey: string,
  valuesMap: T,
  _options?: {
    message?: string;
  }
) => {
  return YUP.array()
    .of(YUP.string())
    .when(dataKey as string, ([currentValue], schema, options) => {
      const validScopes = currentValue ? valuesMap[currentValue] : undefined;
      const { path } = options as { path?: string };

      if (validScopes?.length) {
        return schema
          .of(YUP.string().oneOf(validScopes))
          .required(`Value ${path} is required`)
          .min(1, `At least one value in ${path} is required`);
      } else {
        return schema;
      }
    });
};
export const passwordFields = {
  password: IsPassword().required(t('')),
  passwordCheck: IsString64()
    .required(t(''))
    .oneOf([YUP.ref('password')], t('Pa')),
};
