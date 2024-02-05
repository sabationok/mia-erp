import MeasurementInputs, { MeasurementInputsFormData } from '../FormProduct/components/MeasuremenInputs';
import { useAppForm } from '../../../hooks';
import { FormSection } from '../FormSection';
import useProductsService from '../../../hooks/useProductsService.hook';
import { ToastService } from '../../../services';
import { IMeasurement } from '../../../types/utils.types';
import { useState } from 'react';
import { OfferFormSectionProps } from './types';
import { t } from '../../../lang';

export interface OfferMeasurementFormProps extends OfferFormSectionProps<IMeasurement> {}

export const OfferMeasurementForm = ({ defaultValues, _id, ...props }: OfferMeasurementFormProps) => {
  const service = useProductsService();
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

  return (
    <FormSection onSubmit={form.handleSubmit(onValid)} title={t('Measurement info')} isLoading={isLoading} {...props}>
      <MeasurementInputs appForm={form} disabled={props.disabled} />
    </FormSection>
  );
};
