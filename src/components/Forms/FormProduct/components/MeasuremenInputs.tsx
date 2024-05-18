import { Path } from 'react-hook-form';
import { MeasurementUnit } from 'types/offers/offers.types';
import { FilterOption } from '../../../atoms/ModalFilter';
import { enumToFilterOptions } from 'utils/fabrics';
import CustomSelect from '../../../atoms/Inputs/CustomSelect/CustomSelect';
import InputLabel from '../../../atoms/Inputs/InputLabel';
import InputText from '../../../atoms/Inputs/InputText';
import FlexBox from '../../../atoms/FlexBox';
import * as React from 'react';
import { UseAppFormReturn } from 'hooks/useAppForm.hook';
import { t } from 'lang';
import { HasMeasurement } from 'types/utils.types';

export interface MeasurementInputsFormData extends HasMeasurement {}

const productsMeasurementUnitOptions = enumToFilterOptions(MeasurementUnit);

const measurementInputs: {
  label?: string;
  placeholder?: string;
  name: Path<MeasurementInputsFormData>;
  type?: HTMLInputElement['type'];
  options?: FilterOption[];
}[] = [
  { name: 'measurement.unit', label: t('unit'), placeholder: t('unit'), options: productsMeasurementUnitOptions },
  { name: 'measurement.min', label: t('min'), placeholder: t('min'), type: 'number' },
  { name: 'measurement.max', label: t('max'), placeholder: t('max'), type: 'number' },
  // { name: 'measurement.step', label: t('step'), placeholder: t('step'), type: 'number' },
];

const MeasurementInputs = ({
  appForm,
  disabled,
}: {
  disabled?: boolean;
  appForm: UseAppFormReturn<MeasurementInputsFormData>;
}) => {
  return (
    <FlexBox fillWidth style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', columnGap: 8 }}>
      {measurementInputs.map(input => {
        return input.options ? (
          <CustomSelect
            key={input.name}
            {...appForm.registerSelect(input?.name, {
              options: input?.options,
              label: input?.label,
              placeholder: input?.label,
              dropDownIsAbsolute: true,
              onlyValue: true,
            })}
            disabled={disabled}
          />
        ) : (
          <InputLabel key={input.name} label={input.label} error={appForm?.formState?.errors[input.name as never]}>
            <InputText
              placeholder={input.placeholder}
              min={input?.type === 'number' ? 1 : undefined}
              type={input?.type}
              {...appForm.register(input.name, {
                valueAsNumber: input?.type === 'number',
                min: input?.type === 'number' ? 1 : undefined,
              })}
              disabled={disabled}
            />
          </InputLabel>
        );
      })}
    </FlexBox>
  );
};

export default MeasurementInputs;
