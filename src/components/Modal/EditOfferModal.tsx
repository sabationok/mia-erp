import { ModalFormProps } from '../ModalForm';
import { OfferDimensionsFormSection } from '../Forms/offers/OfferDimensionsFormSection';
import ModalBase from './index';
import { t } from '../../lang';
import { createApiCall, ProductsApi } from '../../api';
import { toOfferFormData } from '../../utils';
import { useEffect, useState } from 'react';
import { IProductFullFormData } from '../../types/products.types';
import { OfferMeasurementForm } from 'components/Forms/offers/OfferMeasurementFormSection';
import { OfferBaseInfoFormSection } from '../Forms/offers/OfferBaseInfoFormSection';
import FlexBox from '../atoms/FlexBox';
import { AppLoaderSpiner } from '../atoms/AppLoaderSpiner';
import { Text } from '../atoms/Text';

export interface UpdateOfferModalProps extends ModalFormProps {
  _id: string;
}

const EditOfferModal: React.FC<UpdateOfferModalProps> = ({ onClose, _id }) => {
  const [current, setCurrent] = useState<IProductFullFormData>();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    createApiCall(
      {
        data: _id,
        onSuccess: data => {
          setCurrent(toOfferFormData(data));
        },
        onLoading: setIsLoading,
      },
      ProductsApi.getFullInfoById,
      ProductsApi
    );
  }, [_id]);

  return (
    <ModalBase fillHeight title={t('Update offer')} onClose={onClose}>
      {isLoading ? (
        <FlexBox fillWidth padding={'24px'} alignItems={'center'} gap={16}>
          <AppLoaderSpiner size={52} />

          <Text>{t('Loading info about offer...')}</Text>
        </FlexBox>
      ) : (
        <FlexBox padding={'0 8px 16px'}>
          <OfferBaseInfoFormSection
            _id={_id}
            edit
            type={current?.type}
            defaultValues={current}
            onSuccess={data => {
              setCurrent(toOfferFormData(data));
            }}
          />

          <OfferDimensionsFormSection defaultValues={current?.dimensions} disabled={!current || !_id} _id={_id} />
          <OfferMeasurementForm defaultValues={current?.measurement} disabled={!current || !_id} _id={_id} />
        </FlexBox>
      )}
    </ModalBase>
  );
};

export default EditOfferModal;
