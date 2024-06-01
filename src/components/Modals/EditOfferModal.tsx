import { ModalFormProps } from '../ModalForm';
import { OfferDimensionsFormArea } from '../Forms/offers/components/OfferDimensionsFormArea';
import ModalBase from '../atoms/Modal';
import { t } from '../../lang';
import { toOfferFormData } from '../../utils';
import { OfferEntity, OfferTypeEnum } from '../../types/offers/offers.types';
import { OfferMeasurementFormArea } from 'components/Forms/offers/components/OfferMeasurementFormArea';
import { OfferBaseInfoFormArea } from '../Forms/offers/components/OfferBaseInfoFormArea';
import FlexBox from '../atoms/FlexBox';
import { AppLoaderSpiner } from '../atoms/AppLoaderSpiner';
import { Text } from '../atoms/Text';
import TabSelector from '../atoms/TabSelector';
import { productsFilterOptions } from '../../data/modalFilterOptions.data';
import { useLoaders } from '../../Providers/Loaders/useLoaders.hook';
import { LoadersProvider } from 'Providers/Loaders/LoaderProvider';
import { OfferFormPropertiesArea } from '../Forms/offers/components/OfferFormPropertiesArea';
import { OfferFormImagesArea } from '../Forms/offers/components/OfferFormImagesArea';
import { useCurrentOffer } from '../../hooks';
import { OfferFormCategoriesArea } from '../Forms/offers/components/OfferFormCategoriesArea';
import { OfferLoadersData, OfferLoadersKey } from '../Forms/offers/types';
import { OfferPriceFormArea } from '../Forms/pricing/OfferPriceFormArea';

export interface EditOfferModalProps extends ModalFormProps {
  _id: string;
  copy?: boolean;
  offer?: OfferEntity;
}

const EditOfferModal: React.FC<EditOfferModalProps> = ({ onClose, offer, copy }) => {
  const Offer = useCurrentOffer(offer);

  //
  // const service = useOffersService();
  // const router = useAppRouter();
  const loaders = useLoaders<OfferLoadersKey, OfferLoadersData>(
    { offer_refresh: { content: 'Refreshing...' }, offer_update: { content: 'Updating...' } },
    {
      formData: Offer ? toOfferFormData(Offer) : { type: OfferTypeEnum.GOODS },
    }
  );

  const { setData, state } = loaders;

  const offerId = copy ? state.formData?._id : Offer?._id;

  if (!Offer) {
    return (
      <ModalBase title={!copy ? t('Update offer') : t('Copy offer')} fillHeight>
        <FlexBox fillWidth fillHeight padding={'26px'} alignItems={'center'} justifyContent={'center'}>
          <Text $size={16} $weight={600}>
            {t('Offer not found')}
          </Text>
        </FlexBox>
      </ModalBase>
    );
  }

  return (
    <ModalBase
      fillHeight
      title={!copy ? t('Update offer') : t('Copy offer')}
      onClose={onClose}
      extraHeader={
        <TabSelector
          filterOptions={productsFilterOptions}
          defaultValue={state?.formData?.type ?? undefined}
          preventDefault
          onOptSelect={o => {
            setData('formData', p => ({ ...p, type: o.value }));
          }}
        />
      }
    >
      <LoadersProvider value={loaders}>
        {loaders.isLoading?.offer ? (
          <FlexBox fillWidth padding={'24px'} alignItems={'center'} gap={16}>
            <AppLoaderSpiner size={52} />

            <Text>{t('Loading info about offer...')}</Text>
          </FlexBox>
        ) : (
          <FlexBox padding={'0 8px 16px'}>
            <OfferBaseInfoFormArea
              _id={offerId}
              edit={!copy}
              type={state.formData?.type}
              defaultValues={state?.formData}
              onSuccess={({ data }) => {
                setData('formData', copy ? { ...toOfferFormData(data), _id: data._id } : toOfferFormData(data));
              }}
            />

            <OfferFormCategoriesArea
              _id={offerId}
              offer={Offer}
              defaultValues={state.formData?.categories}
              disabled={!state.formData}
            />

            <OfferFormPropertiesArea
              _id={offerId}
              offer={Offer}
              defaultValues={state.formData?.properties}
              disabled={!state.formData}
            />

            <OfferPriceFormArea
              expandable={true}
              isOpen={false}
              offer={Offer}
              defaultState={Offer?.price}
              price={Offer?.price}
              title={t('Price')}
            />

            <OfferFormImagesArea
              offer={Offer}
              defaultValues={state?.formData?.images}
              disabled={!state?.formData}
              _id={offerId}
            />

            <OfferDimensionsFormArea
              offer={Offer}
              defaultValues={state.formData?.dimensions}
              disabled={copy ? !(state.formData?._id && state.formData) : !offerId}
              _id={offerId}
            />
            <OfferMeasurementFormArea
              offer={Offer}
              defaultValues={state.formData?.measurement}
              disabled={copy ? !(state.formData?._id && state.formData) : !offerId}
              _id={offerId}
            />
          </FlexBox>
        )}
      </LoadersProvider>
    </ModalBase>
  );
};

export default EditOfferModal;
