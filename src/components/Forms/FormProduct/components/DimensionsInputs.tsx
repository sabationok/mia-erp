import { t } from 'lang';
import * as React from 'react';
import FlexBox from '../../../atoms/FlexBox';
import InputLabel from '../../../atoms/Inputs/InputLabel';
import InputText from '../../../atoms/Inputs/InputText';
import styled from 'styled-components';
import { UseFormReturn } from 'react-hook-form/dist/types';
import { DimensionsKeyType, HasDimensions } from 'types/utils.types';

export interface DimensionsFormData extends HasDimensions {}

export const dimensionsInputsProps: {
  label?: string;
  placeholder?: string;
  name: DimensionsKeyType;
}[] = [
  { name: 'height', label: t('Height'), placeholder: t('Sm') },
  { name: 'width', label: t('Width'), placeholder: t('Sm') },
  { name: 'length', label: t('Length'), placeholder: t('Sm') },
  { name: 'weight', label: t('Weight'), placeholder: t('Kg') },
];

const DimensionsInputs = <TContext = any,>({
  form,
  disabled,
}: {
  disabled?: boolean;
  form: UseFormReturn<DimensionsFormData, TContext>;
}) => {
  const errors = form?.formState?.errors?.dimensions;

  return (
    <Box fillWidth>
      {dimensionsInputsProps.map(input => {
        return (
          <InputLabel key={input.name} label={input.label} error={errors && errors[input.name]}>
            <InputText
              placeholder={input.placeholder}
              min={1}
              type={'number'}
              {...form.register(`dimensions.${input.name}`, {
                valueAsNumber: true,
                min: 1,
              })}
              disabled={disabled}
            />
          </InputLabel>
        );
      })}
    </Box>
  );
};

const Box = styled(FlexBox)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 8px;

  @media screen and (min-width: 480px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export default DimensionsInputs;
