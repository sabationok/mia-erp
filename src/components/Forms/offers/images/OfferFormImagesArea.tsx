import { OfferFormAreaProps } from '../types';
import { AppSubmitHandler } from '../../../../hooks/useAppForm.hook';
import { OfferEntity, OfferImageSlotEntity } from '../../../../types/offers/offers.types';
import { useOfferLoadersProvider } from '../../../Modals/CreateOfferModal';
import { ServiceName, useAppServiceProvider } from '../../../../hooks/useAppServices.hook';
import { useMemo, useState } from 'react';
import { AccordionForm } from '../../../atoms/FormArea/AccordionForm';
import FormOfferImagesComponent from './FormOfferImagesComponent';
import { getIdRef } from '../../../../utils';
import { t } from '../../../../lang';

type OfferField = Partial<OfferImageSlotEntity>[];
export interface OfferFormImagesAreaProps extends OfferFormAreaProps<OfferField> {
  onSubmit?: AppSubmitHandler<OfferField>;
  onSuccess?: (data: { data: OfferEntity }) => void;
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

  const [state, setState] = useState<OfferField>(defaultValues || loaders?.state?.images || []);

  const service = useAppServiceProvider()[ServiceName.offers];
  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    ev.stopPropagation();

    if (onSubmit) {
      onSubmit(state);
    } else if (offer) {
      service.updateById({
        data: { refresh: true, data: { ...getIdRef(offer), data: { images: state as OfferImageSlotEntity[] } } },
        onSuccess: onSuccess,
        onLoading: loaders.onLoading('images'),
      });
    } else {
      console.warn('Offer not passed');
    }
  };
  const canSubmit = useMemo(() => {
    return !!state?.length;
  }, [state?.length]);

  return (
    <AccordionForm
      label={t('Images')}
      onSubmit={handleSubmit}
      canSubmit={canSubmit}
      disabled={disabled}
      isLoading={loaders.isLoading?.images}
      isOpen={false}
      maxHeight={'400px'}
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
