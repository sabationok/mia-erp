import { ModalFormProps } from '../ModalForm';
import { OfferDimensionsFormArea } from '../Forms/offers/OfferDimensionsFormArea';
import ModalBase from './index';
import { t } from '../../lang';
import { createApiCall, ProductsApi } from '../../api';
import { toOfferFormData } from '../../utils';
import { useEffect, useState } from 'react';
import { IProductFullFormData, OfferTypeEnum } from '../../types/products.types';
import { OfferMeasurementFormArea } from 'components/Forms/offers/OfferMeasurementFormArea';
import { OfferBaseInfoFormArea } from '../Forms/offers/OfferBaseInfoFormArea';
import FlexBox from '../atoms/FlexBox';
import { AppLoaderSpiner } from '../atoms/AppLoaderSpiner';
import { Text } from '../atoms/Text';
import ModalFilter from '../atoms/ModalFilter';
import { productsFilterOptions } from '../../data/modalFilterOptions.data';

export interface UpdateOfferModalProps extends ModalFormProps {
  _id: string;
  copy?: boolean;
}

const EditOfferModal: React.FC<UpdateOfferModalProps> = ({ onClose, _id, copy }) => {
  const [current, setCurrent] = useState<IProductFullFormData & { _id?: string }>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    createApiCall(
      {
        data: _id,
        onSuccess: data => {
          if (copy) {
            data._id = '';
          }
          setCurrent(toOfferFormData(data));
        },
        onLoading: setIsLoading,
      },
      ProductsApi.getFullInfoById,
      ProductsApi
    );
  }, [_id, copy]);

  useEffect(() => {
    if (current?._id) {
      console.log(current);
    }
  }, [current]);

  return (
    <ModalBase
      fillHeight
      title={!copy ? t('Update offer') : t('Copy offer')}
      onClose={onClose}
      extraHeader={
        <ModalFilter
          filterOptions={productsFilterOptions}
          defaultValue={current?.type ?? OfferTypeEnum.GOODS}
          onOptSelect={o => setCurrent(prev => ({ ...prev, type: o.value }))}
        />
      }
    >
      {isLoading ? (
        <FlexBox fillWidth padding={'24px'} alignItems={'center'} gap={16}>
          <AppLoaderSpiner size={52} />

          <Text>{t('Loading info about offer...')}</Text>
        </FlexBox>
      ) : (
        <FlexBox padding={'0 8px 16px'}>
          <OfferBaseInfoFormArea
            _id={_id}
            edit={!copy}
            type={current?.type}
            defaultValues={current}
            onSuccess={data => {
              setCurrent(copy ? { ...toOfferFormData(data), _id: data._id } : toOfferFormData(data));
            }}
          />

          <OfferDimensionsFormArea
            defaultValues={current?.dimensions}
            disabled={copy ? !(current?._id && current) : !_id}
            _id={copy ? current?._id : _id}
          />
          <OfferMeasurementFormArea
            defaultValues={current?.measurement}
            disabled={copy ? !(current?._id && current) : !_id}
            _id={copy ? current?._id : _id}
          />
        </FlexBox>
      )}
    </ModalBase>
  );
};

export default EditOfferModal;
