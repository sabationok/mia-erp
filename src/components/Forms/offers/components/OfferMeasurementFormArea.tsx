import MeasurementInputs, { MeasurementInputsFormData } from './MeasuremenInputs';
import { useAppForm } from '../../../../hooks';
import { AccordionForm } from '../../FormArea/AccordionForm';
import useOffersService from '../../../../hooks/useOffersService.hook';
import { ToastService } from '../../../../services';
import { IMeasurement } from '../../../../types/utils.types';
import { useState } from 'react';
import { OfferFormAreaProps } from '../types';
import { t } from '../../../../lang';

export interface OfferMeasurementFormProps extends OfferFormAreaProps<IMeasurement> {}

export const OfferMeasurementFormArea = ({ defaultValues, _id, disabled, ...props }: OfferMeasurementFormProps) => {
  const service = useOffersService();
  const [isLoading, setIsLoading] = useState(false);
  const form = useAppForm<MeasurementInputsFormData>({ defaultValues: { measurement: defaultValues } });

  const onValid = (sData: MeasurementInputsFormData) => {
    service.updateById({
      data: { data: sData, _id },
      onSuccess(d) {
        ToastService.success(`Product updated`);
      },
      onError: e => {
        console.error('Product update action', e);
      },
      onLoading: setIsLoading,
    });
  };
  const canSubmit = form.formState.touchedFields?.measurement
    ? Object.values(form.formState.touchedFields?.measurement)?.some(fd => fd)
    : false;
  return (
    <AccordionForm
      onSubmit={form.handleSubmit(onValid)}
      label={t('Measurement info')}
      isLoading={isLoading}
      disabled={!canSubmit || disabled}
      isOpen={false}
      {...props}
    >
      <MeasurementInputs appForm={form} disabled={disabled} />
    </AccordionForm>
  );
};
