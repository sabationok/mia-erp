import { ModalFormProps } from '../ModalForm';
import { OfferDimensionsFormArea } from '../Forms/offers/OfferDimensionsFormArea';
import ModalBase from './index';
import { t } from '../../lang';
import { toOfferFormData } from '../../utils';
import { useState } from 'react';
import { IProductFullFormData, OfferTypeEnum } from '../../types/products.types';
import { OfferMeasurementFormArea } from 'components/Forms/offers/OfferMeasurementFormArea';
import { OfferBaseInfoFormArea } from '../Forms/offers/OfferBaseInfoFormArea';
import FlexBox from '../atoms/FlexBox';
import ModalFilter from '../atoms/ModalFilter';
import { productsFilterOptions } from '../../data/modalFilterOptions.data';
import { OfferFormPropertiesArea } from '../Forms/offers/OfferFormPropertiesArea';

export interface UpdateOfferModalProps extends ModalFormProps {
  _id: string;
}

const EditOfferModal: React.FC<UpdateOfferModalProps> = ({ onClose, _id }) => {
  const [current, setCurrent] = useState<IProductFullFormData>();

  return (
    <ModalBase
      title={t('Create offer')}
      onClose={onClose}
      extraHeader={
        <ModalFilter
          defaultValue={current?.type ?? OfferTypeEnum.GOODS}
          filterOptions={productsFilterOptions}
          onOptSelect={o => setCurrent(prev => ({ ...prev, type: o.value }))}
        />
      }
    >
      <FlexBox padding={'0 8px 16px'}>
        <OfferBaseInfoFormArea
          defaultValues={current}
          onSuccess={data => {
            setCurrent(toOfferFormData(data));
          }}
          type={current?.type}
        />

        <OfferFormPropertiesArea />

        <OfferDimensionsFormArea defaultValues={current?.dimensions} disabled={!current} />
        <OfferMeasurementFormArea defaultValues={current?.measurement} disabled={!current} />
      </FlexBox>
    </ModalBase>
  );
};

export default EditOfferModal;
