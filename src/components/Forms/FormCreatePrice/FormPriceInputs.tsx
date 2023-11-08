import {
  BasePriceInfoPath,
  IPriceBase,
  PriceAmountAndPercentageFieldsKey,
} from '../../../redux/priceManagement/priceManagement.types';
import FlexBox from '../../atoms/FlexBox';
import InputLabel from '../../atoms/Inputs/InputLabel';
import InputText from '../../atoms/Inputs/InputText';
import { t } from '../../../lang';
import styled from 'styled-components';
import { UseFormReturn } from 'react-hook-form/dist/types';
import { priceAmountAndPercentageFieldsLabels } from '../../../utils/tables';

export interface FormPriceInputsProps {
  onChange?: (price: IPriceBase) => void;
  form: UseFormReturn<IPriceBase>;
}

export const getPriceAdditionalInputsProps = (
  form: UseFormReturn<IPriceBase>
): ({ name: BasePriceInfoPath } | Record<string, any>)[][] => {
  const names: PriceAmountAndPercentageFieldsKey[] = [];
  const createPropsByKey = (key: PriceAmountAndPercentageFieldsKey) => [
    {
      name: `${key}.amount`,
      label: priceAmountAndPercentageFieldsLabels[key].amount,
      error: form.formState.errors[key]?.amount,
    },
    {
      name: `${key}.percentage`,
      label: priceAmountAndPercentageFieldsLabels[key].percentage,
      error: form.formState.errors[key]?.percentage,
    },
  ];
  const props: ({ name: BasePriceInfoPath } | Record<string, any>)[][] = [];

  names.forEach(key => props.push(createPropsByKey(key)));

  return props;
};
const priceInputsProps: ({
  name: BasePriceInfoPath;
  label?: string;
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>)[] = [
  { name: 'in', label: '', placeholder: '' },
  { name: 'out', label: '', placeholder: '' },

  { name: 'discount.amount', label: '', placeholder: '' },
  { name: 'discount.percentage', label: '', placeholder: '' },
  { name: 'cashback.amount', label: '', placeholder: '' },
  { name: 'cashback.percentage', label: '', placeholder: '' },

  { name: 'bonus.amount', label: '', placeholder: '' },
  { name: 'bonus.percentage', label: '', placeholder: '' },

  { name: 'discountLabel', label: '', placeholder: '' },
  { name: 'cashbackLabel', label: '', placeholder: '' },
];
const FormPriceInputs: React.FC<FormPriceInputsProps> = ({ form }) => {
  const { register } = form;

  return (
    <Inputs fillWidth flex={1} padding={'0 8px'}>
      {priceInputsProps.map(info => {
        return (
          <InputLabel key={`input_${info.name}`} label={t(info.name)}>
            <InputText placeholder={t(info.name)} {...register(info.name, { valueAsNumber: info.type === 'number' })} />
          </InputLabel>
        );
      })}
    </Inputs>
  );
};
const Inputs = styled(FlexBox)`
  display: grid;
  grid-template-columns: 1fr 1fr;

  column-gap: 8px;

  background-color: ${p => p.theme.modalBackgroundColor};
`;

export default FormPriceInputs;
