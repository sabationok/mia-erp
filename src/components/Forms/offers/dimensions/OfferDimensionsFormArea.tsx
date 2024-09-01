import DimensionsInputs, { DimensionsFormData } from './DimensionsInputs';
import { useAppForm } from '../../../../hooks';
import { AccordionForm } from '../../../atoms/FormArea/AccordionForm';
import useOffersService from '../../../../hooks/useOffersService.hook';
import { ToastService } from '../../../../services';
import { useState } from 'react';
import { OfferFormAreaProps } from '../types';
import { t } from '../../../../i18e';
import { OfferFormData } from '../../../../types/offers/offers.types';

export interface OfferDimensionsFormSectionProps extends OfferFormAreaProps<OfferFormData['dimensions']> {}

export const OfferDimensionsFormArea = ({
  defaultValues,
  _id,
  disabled,
  ...props
}: OfferDimensionsFormSectionProps) => {
  const service = useOffersService();
  const [isLoading, setIsLoading] = useState(false);
  const form = useAppForm<DimensionsFormData>({
    defaultValues: { dimensions: defaultValues ?? {} },
  });

  const onValid = (sData: DimensionsFormData) => {
    service.updateById({
      data: { data: { data: sData, _id } },
      onSuccess(d) {
        ToastService.success(`Product updated`);
      },
      onError: e => {
        console.error('Product update action', e);
      },
      onLoading: setIsLoading,
    });
  };

  const canSubmit = form.formState.dirtyFields?.dimensions
    ? Object.values(form.formState.dirtyFields?.dimensions)?.some(fd => fd)
    : false;

  return (
    <AccordionForm
      onSubmit={form.handleSubmit(onValid)}
      label={t('Package size')}
      isLoading={isLoading}
      isOpen={false}
      {...props}
      disabled={!canSubmit || disabled}
    >
      <DimensionsInputs form={form} disabled={disabled} />
    </AccordionForm>
  );
};
