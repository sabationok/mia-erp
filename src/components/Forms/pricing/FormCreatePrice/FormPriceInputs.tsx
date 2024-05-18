import {
  BasePriceInfoPath,
  IPriceBase,
  PriceAmountAndPercentageFieldsEnum,
  PriceAmountAndPercentageFieldsKey,
} from '../../../../types/price-management/priceManagement.types';
import FlexBox from '../../../atoms/FlexBox';
import InputLabel from '../../../atoms/Inputs/InputLabel';
import InputText from '../../../atoms/Inputs/InputText';
import { t } from '../../../../lang';
import styled from 'styled-components';
import { UseFormReturn } from 'react-hook-form/dist/types';
import { enumToArray } from '../../../../utils';
import { ChangeHandler } from 'react-hook-form/dist/types/form';
import { Text } from '../../../atoms/Text';
import { PriceFormDataPath } from './FormCreatePrice';
import { Fragment, useMemo } from 'react';

export interface FormPriceInputsProps {
  onChange?: (price: IPriceBase) => void;
  form: UseFormReturn<IPriceBase>;
  handleBlur: HandleUseFormBlur<PriceFormDataPath>;
}

const PriceAmountAndPercentageInputsNames = enumToArray(PriceAmountAndPercentageFieldsEnum);
const PriceBaseInputsNames: (keyof Pick<IPriceBase, 'in' | 'out'>)[] = ['in', 'out'];

const priceInputsPropsMap = new Map<
  PriceFormDataPath,
  {
    disabled?: boolean;
    label?: string;
    placeholder?: string;
    required?: boolean;
    autoFocus?: boolean;
  }
>([
  ['in', { label: t(''), placeholder: t(''), required: true, disabled: false, autoFocus: true }],
  ['out', { label: t(''), placeholder: t(''), required: true, disabled: false }],

  ['commission.amount', { label: t(''), placeholder: t('') }],
  ['commission.percentage', { label: t(''), placeholder: t('') }],

  ['markup.amount', { label: t(''), placeholder: t('') }],
  ['markup.percentage', { label: t(''), placeholder: t('') }],

  ['discount.amount', { label: t(''), placeholder: t('') }],
  ['discount.percentage', { label: t(''), placeholder: t('') }],

  ['cashback.amount', { label: t(''), placeholder: t('') }],
  ['cashback.percentage', { label: t(''), placeholder: t('') }],

  ['bonus.amount', { label: t(''), placeholder: t('') }],
  ['bonus.percentage', { label: t(''), placeholder: t('') }],

  ['discountLabel', { label: t(''), placeholder: t('') }],
  ['cashbackLabel', { label: t(''), placeholder: t('') }],
]);
const FormBaseInputs = ({
  form,
  handleBlur,
}: {
  form: UseFormReturn<IPriceBase>;
  handleBlur: (name: PriceFormDataPath, callback: ChangeHandler) => (ev: React.FocusEvent<HTMLInputElement>) => void;
}) => {
  const { register } = form;

  return (
    <>
      <FlexBox justifyContent={'center'}>
        <Text>{t('Price').toUpperCase()}</Text>
      </FlexBox>

      {PriceBaseInputsNames.map(name => {
        const props = priceInputsPropsMap.get(name);
        const registerProps = register(name, { valueAsNumber: true });

        return (
          <InputLabel key={name} label={props?.label}>
            <InputText
              type={'number'}
              align={'center'}
              defaultValue={0}
              {...props}
              {...registerProps}
              onBlur={handleBlur(name, registerProps.onBlur)}
            />
          </InputLabel>
        );
      })}
    </>
  );
};

type HandleUseFormBlur<Name = any> = (
  name: Name,
  callback: ChangeHandler
) => (ev: React.FocusEvent<HTMLInputElement>) => void;
const FormPriceAmountAnPercentageInputsByName = ({
  handleBlur,
  form: { register },
  name,
}: {
  name: PriceAmountAndPercentageFieldsKey;
  form: UseFormReturn<IPriceBase>;
  handleBlur: HandleUseFormBlur<BasePriceInfoPath>;
}) => {
  return (
    <>
      {['amount', 'percentage'].map(type => {
        const inputName: BasePriceInfoPath = `${name}.${type as 'amount' | 'percentage'}`;
        const inputProps = priceInputsPropsMap.get(inputName);
        const registerProps = register(inputName, { valueAsNumber: true });

        return (
          <InputLabel key={`${name}_${type}`}>
            <InputText
              type={'number'}
              align={'center'}
              defaultValue={0}
              disabled={!inputProps?.disabled}
              {...registerProps}
              onBlur={handleBlur(inputName, registerProps.onBlur)}
            />
          </InputLabel>
        );
      })}
    </>
  );
};
const FormPriceAmountAndPercentageInputs = ({
  form,
  handleBlur,
}: {
  form: UseFormReturn<IPriceBase>;
  handleBlur: HandleUseFormBlur<BasePriceInfoPath>;
}) => {
  // const { register } = form;

  return (
    <>
      {PriceAmountAndPercentageInputsNames.map(name => {
        return (
          <Fragment key={name}>
            <FlexBox justifyContent={'center'}>
              <Text>{t(name).toUpperCase()}</Text>
            </FlexBox>

            <FormPriceAmountAnPercentageInputsByName {...{ form, name, handleBlur }} />
          </Fragment>
        );
      })}
    </>
  );
};

const FormPriceInputs: React.FC<FormPriceInputsProps> = ({ form, handleBlur }) => {
  return (
    <FlexBox fillWidth padding={'8px 0'}>
      <InputsHeader headers={['', `${t('Input')} *`, `${t('Output')} *`]} />

      <TBody fillWidth>
        <FormBaseInputs form={form} handleBlur={handleBlur} />
      </TBody>

      <InputsHeader headers={['', t('Amount'), t('Percentage, %')]} />

      <TBody fillWidth>
        <FormPriceAmountAndPercentageInputs form={form} handleBlur={handleBlur} />
      </TBody>

      <Header>
        <Text></Text>
        <Text></Text>
        <Text>{t('Cms configs')}</Text>
      </Header>

      <InputLabel label={t('Discount label')}>
        <InputText {...form.register('discountLabel')} />
      </InputLabel>
      <InputLabel label={t('Cashback label')}>
        <InputText {...form.register('cashbackLabel')} />
      </InputLabel>
    </FlexBox>
  );
};

const InputsHeader = ({ headers = [] }: { headers: string[] }) => {
  const renderHeaders = useMemo(() => {
    return headers.map(label => {
      return (
        <HeaderBox>
          <Text $weight={500} $size={12}>
            {label}
          </Text>
        </HeaderBox>
      );
    });
  }, [headers]);
  return <Header>{renderHeaders}</Header>;
};
const TBody = styled(FlexBox)`
  display: grid;
  grid-template-columns: 1.25fr 1fr 1fr;

  padding: 8px 2px;
  input {
    margin: 2px;
  }

  background-color: ${p => p.theme.modalBackgroundColor};
`;
const Header = styled(FlexBox)`
  display: grid;
  grid-template-columns: 1.25fr 1fr 1fr;

  padding: 8px 0;

  border-bottom: 1px solid ${p => p.theme.tableHeaderBackground};
  border-top: 1px solid ${p => p.theme.tableHeaderBackground};
`;
const HeaderBox = styled(FlexBox)`
  justify-content: center;
  align-items: center;
`;

export default FormPriceInputs;

// const getPriceAmountAndPercentageInputsPropsByKey = <Key extends PriceAmountAndPercentageFieldsKey = any>(
//   key: Key
// ): Record<
//   `${Key}.amount` | `${Key}.percentage`,
//   {
//     name?: string;
//     label?: string;
//     placeholder?: string;
//   }
// > => {
//   return {
//     [`${key}.amount`]: {
//       name: `${key}.amount`,
//       label: priceAmountAndPercentageFieldsLabels[key].amount,
//       placeholder: priceAmountAndPercentageFieldsLabels[key].amount,
//     },
//     [`${key}.amount`]: {
//       name: `${key}.percentage`,
//       label: priceAmountAndPercentageFieldsLabels[key].percentage,
//       placeholder: priceAmountAndPercentageFieldsLabels[key].percentage,
//     },
//   } as Record<
//     `${Key}.amount` | `${Key}.percentage`,
//     {
//       name?: string;
//       label?: string;
//       placeholder?: string;
//     }
//   >;
// };

// const PriceLabelsInputsNames: (keyof Pick<IPriceBase, 'cashbackLabel' | 'discountLabel'>)[] = [
//   'cashbackLabel',
//   'discountLabel',
// ];

// export const getPriceAmountAndPercentageInputsProps = (
//   form: UseFormReturn<IPriceBase>
// ): ({ name: BasePriceInfoPath } | Record<string, any>)[] => {
//   const names = enumToArray(PriceAmountAndPercentageFieldsEnum);
//
//   const props: ({ name: BasePriceInfoPath } | Record<string, any>)[][] = [];
//
//   names.forEach(key => props.push(getPriceAmountAndPercentageInputsPropsByKey(key)));
//
//   return props;
// };

// const priceInputsProps: ({
//   name: BasePriceInfoPath;
//   label?: string;
// } & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>)[] = [
//   { name: 'in', label: t(''), placeholder: t('') },
//   { name: 'out', label: t(''), placeholder: t('') },
//
//   { name: 'discount', label: t(''), placeholder: t('') },
//   { name: 'discount.percentage', label: t(''), placeholder: t('') },
//
//   { name: 'cashback', label: t(''), placeholder: t('') },
//   { name: 'cashback.percentage', label: t(''), placeholder: t('') },
//
//   { name: 'bonus.amount', label: t(''), placeholder: t('') },
//   { name: 'bonus.percentage', label: t(''), placeholder: t('') },
//
//   { name: 'discountLabel', label: t(''), placeholder: t('') },
//   { name: 'cashbackLabel', label: t(''), placeholder: t('') },
// ];
