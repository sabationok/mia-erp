import { IPriceBase } from '../../../redux/priceManagement/priceManagement.types';
import { Path } from 'react-hook-form';
import { useEffect } from 'react';
import FlexBox from '../../atoms/FlexBox';
import InputLabel from '../../atoms/Inputs/InputLabel';
import InputText from '../../atoms/Inputs/InputText';
import { t } from '../../../lang';
import styled from 'styled-components';
import { UseFormReturn } from 'react-hook-form/dist/types';

export interface FormPriceInputsProps {
  onChange?: (price: IPriceBase) => void;
  form: UseFormReturn<IPriceBase>;
}

const priceInputsProps: ({
  name: Path<IPriceBase>;
  label?: string;
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>)[] = [
  { name: 'price', label: '', placeholder: '' },
  { name: 'cost', label: '', placeholder: '' },
  { name: 'commissionPercentage', label: '', placeholder: '' },
  { name: 'commissionAmount', label: '', placeholder: '' },

  { name: 'discountPercentage', label: '', placeholder: '' },
  { name: 'discountAmount', label: '', placeholder: '' },

  { name: 'discountLabel', label: '', placeholder: '' },
  { name: 'cashbackLabel', label: '', placeholder: '' },
];
const FormPriceInputs: React.FC<FormPriceInputsProps> = ({ form }) => {
  const {
    formState: { errors },
    watch,
    register,
  } = form;

  const values = watch();

  useEffect(() => {
    console.log('FormPriceInputs', values);
  }, [values]);

  return (
    <Inputs fillWidth flex={1} padding={'0 8px'}>
      {priceInputsProps.map(info => {
        return (
          <InputLabel key={`input_${info.name}`} label={t(info.name)} error={errors[info.name]}>
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
