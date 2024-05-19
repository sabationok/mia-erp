import { ModalFormProps } from '../ModalForm';
import { OfferDimensionsFormArea } from '../Forms/offers/OfferDimensionsFormArea';
import ModalBase from './index';
import { t } from '../../lang';
import { toOfferFormData } from '../../utils';
import { useEffect } from 'react';
import { OfferTypeEnum } from '../../types/offers/offers.types';
import { OfferMeasurementFormArea } from 'components/Forms/offers/OfferMeasurementFormArea';
import { OfferBaseInfoFormArea } from '../Forms/offers/OfferBaseInfoFormArea';
import FlexBox from '../atoms/FlexBox';
import { AppLoaderSpiner } from '../atoms/AppLoaderSpiner';
import { Text } from '../atoms/Text';
import TabSelector from '../atoms/TabSelector';
import { productsFilterOptions } from '../../data/modalFilterOptions.data';
import { useLoaders } from '../../Providers/Loaders/useLoaders.hook';
import { OfferLoadersData, OfferLoadersKey } from './CreateOfferModal';
import { LoadersProvider } from 'Providers/Loaders/LoaderProvider';
import { OfferFormPropertiesArea } from '../Forms/offers/OfferFormPropertiesArea';
import useProductsService from '../../hooks/useProductsService.hook';
import { OfferFormImagesArea } from '../Forms/offers/OfferFormImagesArea';
import { useAppRouter, useCurrentOffer } from '../../hooks';
import { OfferFormCategoriesArea } from '../Forms/offers/OfferFormCategoriesArea';

export interface UpdateOfferModalProps extends ModalFormProps {
  _id: string;
  copy?: boolean;
}

const EditOfferModal: React.FC<UpdateOfferModalProps> = ({ onClose, _id, copy }) => {
  const { setData, state, ...loaders } = useLoaders<OfferLoadersKey, OfferLoadersData>();
  const service = useProductsService();
  const router = useAppRouter();
  const currentOffer = useCurrentOffer({ id: _id });

  useEffect(() => {
    service.getProductFullInfo({
      data: { _id },
      onSuccess: loaders.onSuccess('offer', data => {
        if (copy) {
          data._id = '';
        }
        setData('formData', toOfferFormData(data));
        router.push({ query: { offerId: _id } });
      }),
      onLoading: loaders.onLoading('offer'),
    });

    // eslint-disable-next-line
  }, [_id, copy]);

  useEffect(() => {
    console.log({ currentOffer });
  }, [currentOffer]);

  return (
    <ModalBase
      fillHeight
      title={!copy ? t('Update offer') : t('Copy offer')}
      onClose={onClose}
      extraHeader={
        <TabSelector
          filterOptions={productsFilterOptions}
          defaultValue={state?.formData?.type ?? OfferTypeEnum.GOODS}
          onOptSelect={o => {
            setData('formData', p => ({ ...p, type: o.value }));
          }}
        />
      }
    >
      <LoadersProvider value={{ setData, state, ...loaders }}>
        {loaders.isLoading?.offer ? (
          <FlexBox fillWidth padding={'24px'} alignItems={'center'} gap={16}>
            <AppLoaderSpiner size={52} />

            <Text>{t('Loading info about offer...')}</Text>
          </FlexBox>
        ) : (
          <FlexBox padding={'0 8px 16px'}>
            <OfferBaseInfoFormArea
              _id={_id}
              edit={!copy}
              type={state.formData?.type}
              defaultValues={state.formData}
              onSuccess={data => {
                setData('formData', copy ? { ...toOfferFormData(data), _id: data._id } : toOfferFormData(data));
              }}
            />

            <OfferFormCategoriesArea
              _id={_id}
              offer={currentOffer}
              defaultValues={state.formData?.categories}
              disabled={!state.formData}
            />

            <OfferFormPropertiesArea
              offer={currentOffer}
              defaultValues={state.formData?.properties}
              disabled={!state.formData}
              _id={copy ? state.formData?._id : _id}
            />

            <OfferDimensionsFormArea
              offer={currentOffer}
              defaultValues={state.formData?.dimensions}
              disabled={copy ? !(state.formData?._id && state.formData) : !_id}
              _id={copy ? state.formData?._id : _id}
            />
            <OfferMeasurementFormArea
              offer={currentOffer}
              defaultValues={state.formData?.measurement}
              disabled={copy ? !(state.formData?._id && state.formData) : !_id}
              _id={copy ? state.formData?._id : _id}
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
