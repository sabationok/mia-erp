import { ModalFormProps } from '../ModalForm';
import { OfferDimensionsFormArea } from '../Forms/offers/components/OfferDimensionsFormArea';
import ModalBase from '../atoms/Modal';
import { t } from '../../lang';
import { toOfferFormData } from '../../utils';
import { useEffect } from 'react';
import { OfferTypeEnum } from '../../types/offers/offers.types';
import { OfferMeasurementFormArea } from 'components/Forms/offers/components/OfferMeasurementFormArea';
import { OfferBaseInfoFormArea } from '../Forms/offers/components/OfferBaseInfoFormArea';
import FlexBox from '../atoms/FlexBox';
import TabSelector from '../atoms/TabSelector';
import { productsFilterOptions } from '../../data/modalFilterOptions.data';
import { OfferFormPropertiesArea } from '../Forms/offers/components/OfferFormPropertiesArea';
import { useLoaders } from '../../Providers/Loaders/useLoaders.hook';
import { LoadersProvider, useLoadersProvider } from '../../Providers/Loaders/LoaderProvider';
import { OfferFormImagesArea } from '../Forms/offers/components/OfferFormImagesArea';
import { useAppRouter, useCurrentOffer } from '../../hooks';
import { OfferFormCategoriesArea } from '../Forms/offers/components/OfferFormCategoriesArea';
import { OfferLoadersData, OfferLoadersKey } from '../Forms/offers/types';
import { CreatePriceFormArea } from '../Forms/pricing/CreatePriceFormArea';

export interface CreateOfferModalProps extends ModalFormProps {
  _id: string;
}

export const useOfferLoadersProvider = () => useLoadersProvider<OfferLoadersKey, OfferLoadersData>();

const CreateOfferModal: React.FC<CreateOfferModalProps> = ({ onClose, _id }) => {
  const loaders = useLoaders<OfferLoadersKey, OfferLoadersData>();
  const {
    state: { formData },
    setData,
  } = loaders;
  const router = useAppRouter();
  const Offer = useCurrentOffer({ _id: router.query?.offerId });

  useEffect(() => {
    // router.push({ query: omit(router.query, ['offerId']) });
    // return () => {
    //   router.push({ query: {} });
    // };
    // eslint-disable-next-line
  }, []);

  return (
    <ModalBase
      title={t('Create offer')}
      onClose={onClose}
      extraHeader={
        <TabSelector
          defaultValue={formData?.type ?? OfferTypeEnum.GOODS}
          filterOptions={productsFilterOptions}
          onOptSelect={o => setData('formData', prev => ({ ...prev, type: o.value }))}
        />
      }
    >
      <LoadersProvider value={loaders}>
        <FlexBox padding={'0 8px 16px'}>
          <OfferBaseInfoFormArea
            defaultValues={formData}
            onSuccess={({ data }) => {
              setData('formData', toOfferFormData(data));

              router.push({ query: { offerId: data?._id } });
            }}
            type={formData?.type}
          />

          {Offer && (
            <>
              <OfferFormCategoriesArea offer={Offer} defaultValues={formData?.categories} disabled={!formData} />

              <OfferFormPropertiesArea offer={Offer} defaultValues={formData?.properties} disabled={!formData} />

              <CreatePriceFormArea
                expandable={true}
                isOpen={false}
                offer={Offer}
                defaultState={Offer?.price}
                price={Offer?.price}
                title={t('Price')}
              />

              <OfferFormImagesArea offer={Offer} defaultValues={formData?.images} disabled={!formData} />

              <OfferDimensionsFormArea offer={Offer} defaultValues={formData?.dimensions} disabled={!formData} />

              <OfferMeasurementFormArea offer={Offer} defaultValues={formData?.measurement} disabled={!formData} />
            </>
          )}
        </FlexBox>
      </LoadersProvider>
    </ModalBase>
  );
};

export default CreateOfferModal;
