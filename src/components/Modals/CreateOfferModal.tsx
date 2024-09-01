import { ModalFormProps } from '../ModalForm';
import { OfferDimensionsFormArea } from '../Forms/offers/dimensions/OfferDimensionsFormArea';
import ModalBase from '../atoms/Modal';
import { t } from '../../i18e';
import { toOfferFormData } from '../../utils';
import { useEffect } from 'react';
import { OfferMeasurementFormArea } from 'components/Forms/offers/measurement/OfferMeasurementFormArea';
import { OfferBaseInfoFormArea } from '../Forms/offers/OfferBaseInfoFormArea';
import FlexBox from '../atoms/FlexBox';
import { OfferFormPropertiesArea } from '../Forms/offers/properties/OfferFormPropertiesArea';
import { useLoaders } from '../../Providers/Loaders/useLoaders.hook';
import { LoadersProvider, useLoadersProvider } from '../../Providers/Loaders/LoaderProvider';
import { OfferFormImagesArea } from '../Forms/offers/images/OfferFormImagesArea';
import { useAppRouter, useCurrentOffer } from '../../hooks';
import { OfferFormCategoriesArea } from '../Forms/offers/categories/OfferFormCategoriesArea';
import { OfferLoadersData, OfferLoadersKey } from '../Forms/offers/types';
import { OfferPriceFormArea } from '../Forms/pricing/OfferPriceFormArea';
import OfferTagsFormArea from '../Forms/offers/OfferTagsFormArea';
import PriceDiscountsFormArea from '../Forms/pricing/PriceDiscountsFormArea';

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
    <ModalBase title={t('Create offer')} onClose={onClose}>
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
              <OfferFormCategoriesArea offer={Offer} defaultValues={formData?.categoriesIds} disabled={!formData} />

              <OfferFormPropertiesArea offer={Offer} defaultValues={formData?.propertiesIds} disabled={!formData} />

              <OfferPriceFormArea
                expandable={!!Offer}
                isOpen={false}
                offer={Offer}
                defaultState={Offer?.price}
                price={Offer?.price}
                title={t('Price')}
              />

              {Offer?.price && <PriceDiscountsFormArea price={Offer?.price} />}

              <OfferFormImagesArea offer={Offer} defaultValues={formData?.images} disabled={!formData} />

              <OfferTagsFormArea offer={Offer} defaultValues={formData?.tagsIds} disabled={!formData} />

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
