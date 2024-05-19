import { ModalFormProps } from '../ModalForm';
import { OfferDimensionsFormArea } from '../Forms/offers/OfferDimensionsFormArea';
import ModalBase from './index';
import { t } from '../../lang';
import { toOfferFormData } from '../../utils';
import { useEffect, useState } from 'react';
import { IProductFullFormData, OfferEntity, OfferTypeEnum } from '../../types/offers/offers.types';
import { OfferMeasurementFormArea } from 'components/Forms/offers/OfferMeasurementFormArea';
import { OfferBaseInfoFormArea } from '../Forms/offers/OfferBaseInfoFormArea';
import FlexBox from '../atoms/FlexBox';
import TabSelector from '../atoms/TabSelector';
import { productsFilterOptions } from '../../data/modalFilterOptions.data';
import { OfferFormPropertiesArea } from '../Forms/offers/OfferFormPropertiesArea';
import { useLoaders } from '../../Providers/Loaders/useLoaders.hook';
import { LoadersProvider, useLoadersProvider } from '../../Providers/Loaders/LoaderProvider';
import { OfferFormImagesArea } from '../Forms/offers/OfferFormImagesArea';
import { useAppRouter, useCurrentOffer } from '../../hooks';
import { OfferFormCategoriesArea } from '../Forms/offers/OfferFormCategoriesArea';

export interface UpdateOfferModalProps extends ModalFormProps {
  _id: string;
}
export type OfferLoadersKey = 'offer' | 'formData' | keyof OfferEntity;
export type OfferLoadersData = {
  formData?: IProductFullFormData & { _id?: string };
  offer?: OfferEntity;
} & Partial<OfferEntity>;
export const useOfferLoadersProvider = () => useLoadersProvider<OfferLoadersKey, OfferLoadersData>();
const EditOfferModal: React.FC<UpdateOfferModalProps> = ({ onClose, _id }) => {
  const [current, setCurrent] = useState<IProductFullFormData>();
  const loaders = useLoaders<OfferLoadersKey, OfferLoadersData>();
  const router = useAppRouter();
  const currenOffer = useCurrentOffer({ id: router.query?.offerId });

  useEffect(() => {
    router.push({ query: {} });

    return () => {
      router.push({ query: {} });
    };
    // eslint-disable-next-line
  }, []);

  return (
    <ModalBase
      title={t('Create offer')}
      onClose={onClose}
      extraHeader={
        <TabSelector
          defaultValue={current?.type ?? OfferTypeEnum.GOODS}
          filterOptions={productsFilterOptions}
          onOptSelect={o => setCurrent(prev => ({ ...prev, type: o.value }))}
        />
      }
    >
      <LoadersProvider value={loaders}>
        <FlexBox padding={'0 8px 16px'}>
          <OfferBaseInfoFormArea
            defaultValues={current}
            onSuccess={data => {
              setCurrent(toOfferFormData(data));

              router.push({ query: { offerId: data?._id } });
            }}
            type={current?.type}
          />

          {currenOffer && (
            <>
              <OfferFormCategoriesArea offer={currenOffer} defaultValues={current?.categories} disabled={!current} />

              <OfferFormPropertiesArea offer={currenOffer} defaultValues={current?.properties} disabled={!current} />

              <OfferDimensionsFormArea offer={currenOffer} defaultValues={current?.dimensions} disabled={!current} />

              <OfferMeasurementFormArea offer={currenOffer} defaultValues={current?.measurement} disabled={!current} />

              <OfferFormImagesArea offer={currenOffer} defaultValues={current?.images} disabled={!current} />
            </>
          )}
        </FlexBox>
      </LoadersProvider>
    </ModalBase>
  );
};

export default EditOfferModal;
