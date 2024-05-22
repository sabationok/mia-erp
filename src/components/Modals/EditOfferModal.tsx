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
import { AppLoaderSpiner } from '../atoms/AppLoaderSpiner';
import { Text } from '../atoms/Text';
import TabSelector from '../atoms/TabSelector';
import { productsFilterOptions } from '../../data/modalFilterOptions.data';
import { useLoaders } from '../../Providers/Loaders/useLoaders.hook';
import { LoadersProvider } from 'Providers/Loaders/LoaderProvider';
import { OfferFormPropertiesArea } from '../Forms/offers/components/OfferFormPropertiesArea';
import useOffersService from '../../hooks/useProductsService.hook';
import { OfferFormImagesArea } from '../Forms/offers/components/OfferFormImagesArea';
import { useAppRouter, useCurrentOffer } from '../../hooks';
import { OfferFormCategoriesArea } from '../Forms/offers/components/OfferFormCategoriesArea';
import { OfferLoadersData, OfferLoadersKey } from '../Forms/offers/types';

export interface EditOfferModalProps extends ModalFormProps {
  _id: string;
  copy?: boolean;
}

const EditOfferModal: React.FC<EditOfferModalProps> = ({ onClose, _id, copy }) => {
  const currentOffer = useCurrentOffer({ id: _id });
  const service = useOffersService();
  const loaders = useLoaders<OfferLoadersKey, OfferLoadersData>(
    { offer_refresh: { content: 'Refreshing...' }, offer_update: { content: 'Updating...' } },
    {
      formData: currentOffer ? toOfferFormData(currentOffer) : { type: OfferTypeEnum.GOODS },
    }
  );

  const { setData, state } = loaders;

  const offerId = copy ? state.formData?._id : _id;

  const router = useAppRouter();

  useEffect(() => {
    service.getProductFullInfo({
      data: { _id },
      onSuccess: loaders.onSuccess('offer_refresh', data => {
        if (copy) {
          data._id = '';
        }
        // const formData = toOfferFormData(data);
        setData('formData', toOfferFormData(data));
        router.push({ query: { offerId: _id } });
      }),
      onLoading: loaders.onLoading('offer_refresh'),
    });

    // eslint-disable-next-line
  }, [_id, copy]);

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
              onSuccess={data => {
                setData('formData', copy ? { ...toOfferFormData(data), _id: data._id } : toOfferFormData(data));
              }}
            />

            <OfferFormCategoriesArea
              _id={offerId}
              offer={currentOffer}
              defaultValues={state.formData?.categories}
              disabled={!state.formData}
            />

            <OfferFormPropertiesArea
              _id={offerId}
              offer={currentOffer}
              defaultValues={state.formData?.properties}
              disabled={!state.formData}
            />

            <OfferDimensionsFormArea
              offer={currentOffer}
              defaultValues={state.formData?.dimensions}
              disabled={copy ? !(state.formData?._id && state.formData) : !_id}
              _id={offerId}
            />
            <OfferMeasurementFormArea
              offer={currentOffer}
              defaultValues={state.formData?.measurement}
              disabled={copy ? !(state.formData?._id && state.formData) : !_id}
              _id={offerId}
            />

            <OfferFormImagesArea
              offer={currentOffer}
              defaultValues={state?.formData?.images}
              disabled={!state?.formData}
              _id={copy ? state?.formData?._id : _id}
            />
          </FlexBox>
        )}
      </LoadersProvider>
    </ModalBase>
  );
};

export default EditOfferModal;
