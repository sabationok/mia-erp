import { ModalFormProps } from '../ModalForm';
import { OfferDimensionsFormSection } from '../Forms/offers/OfferDimensionsFormSection';
import ModalBase from './index';
import { t } from '../../lang';
import { toOfferFormData } from '../../utils';
import { useState } from 'react';
import { IProductFullFormData, OfferTypeEnum } from '../../types/products.types';
import { OfferMeasurementForm } from 'components/Forms/offers/OfferMeasurementFormSection';
import { OfferBaseInfoFormSection } from '../Forms/offers/OfferBaseInfoFormSection';
import FlexBox from '../atoms/FlexBox';
import ModalFilter from '../atoms/ModalFilter';
import { productsFilterOptions } from '../../data/modalFilterOptions.data';

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
        <OfferBaseInfoFormSection
          defaultValues={current}
          onSuccess={data => {
            setCurrent(toOfferFormData(data));
          }}
          type={current?.type}
        />
        <OfferDimensionsFormSection defaultValues={current?.dimensions} disabled={!current} />
        <OfferMeasurementForm defaultValues={current?.measurement} disabled={!current} />
      </FlexBox>
    </ModalBase>
  );
};

export default EditOfferModal;
