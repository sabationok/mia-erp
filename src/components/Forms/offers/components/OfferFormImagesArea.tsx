import { OfferFormAreaProps } from '../types';
import { AppSubmitHandler } from '../../../../hooks/useAppForm.hook';
import { OfferEntity, OfferImageSlotEntity } from '../../../../types/offers/offers.types';
import { useOfferLoadersProvider } from '../../../Modals/CreateOfferModal';
import { ServiceName, useAppServiceProvider } from '../../../../hooks/useAppServices.hook';
import { useMemo, useState } from 'react';
import { AccordionForm } from '../../FormArea/AccordionForm';
import FormOfferImagesComponent from './FormOfferImagesComponent';
import { getIdRef } from '../../../../utils';
import { t } from '../../../../lang';

export interface OfferFormImagesAreaProps extends OfferFormAreaProps<OfferImageSlotEntity[]> {
  onSubmit?: AppSubmitHandler<Partial<OfferImageSlotEntity>[]>;
  onSuccess?: (data: OfferEntity) => void;
  update?: string;
}

export const OfferFormImagesArea = ({
  offer,
  onSubmit,
  onSuccess,
  disabled,
  defaultValues,
}: OfferFormImagesAreaProps) => {
  const loaders = useOfferLoadersProvider();
  const [state, setState] = useState<Partial<OfferImageSlotEntity>[]>(defaultValues || loaders?.state?.images || []);

  const service = useAppServiceProvider()[ServiceName.offers];
  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();

    if (onSubmit) {
      onSubmit(state);
    } else if (offer) {
      service.updateById({
        data: { ...getIdRef(offer), data: { images: state as OfferImageSlotEntity[] }, refreshCurrent: true },
        onSuccess: onSuccess,
        onLoading: loaders.onLoading('images'),
      });
    } else {
      console.warn('Offer not passed');
    }
  };
  const canSubmit = useMemo(() => {
    return true;
  }, []);

  return (
    <AccordionForm
      label={t('Images')}
      onSubmit={handleSubmit}
      disabled={disabled || !canSubmit}
      isLoading={loaders.isLoading?.images}
      isOpen={false}
    >
      <FormOfferImagesComponent
        hideLabel
        initialData={state}
        onChangeState={setState}
        contentContainerStyle={{
          flex: 1,
          // borderTop: `1px solid ${theme.sideBarBorderColor}`,
          // borderBottom: `1px solid ${theme.sideBarBorderColor}`,
        }}
      />
    </AccordionForm>
  );
};
