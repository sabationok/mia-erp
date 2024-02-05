import DimensionsInputs, { DimensionsFormData } from '../FormProduct/components/DimensionsInputs';
import { useAppForm } from '../../../hooks';
import { FormSection } from '../FormSection';
import useProductsService from '../../../hooks/useProductsService.hook';
import { ToastService } from '../../../services';
import { IDimensions } from '../../../types/utils.types';
import { useState } from 'react';
import { OfferFormSectionProps } from './types';
import { t } from '../../../lang';

export interface OfferDimensionsFormSectionProps extends OfferFormSectionProps<IDimensions> {}

export const OfferDimensionsFormSection = ({ defaultValues, _id, ...props }: OfferDimensionsFormSectionProps) => {
  const service = useProductsService();
  const [isLoading, setIsLoading] = useState(false);
  const form = useAppForm<DimensionsFormData>({
    defaultValues: { dimensions: defaultValues },
  });

  const onValid = (sData: DimensionsFormData) => {
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
    <FormSection onSubmit={form.handleSubmit(onValid)} title={t('Package size')} isLoading={isLoading} {...props}>
      <DimensionsInputs form={form} disabled={props.disabled} />
    </FormSection>
  );
};
