import { ModalFormProps } from '../ModalForm';
import { OfferDimensionsFormSection } from '../Forms/offers/OfferDimensionsFormSection';
import ModalBase from './index';
import { t } from '../../lang';
import { toOfferFormData } from '../../utils';
import { useState } from 'react';
import { IProductFullFormData, OfferTypeEnum } from '../../types/products.types';
import { OfferMeasurementForm } from 'components/Forms/offers/OfferMeasurementFormSection';
import { OfferBaseInfoFormSection } from '../Forms/offers/OfferBaseInfoFormSection';
import ModalFilter from '../atoms/ModalFilter';
import { productsFilterOptions } from '../../data/modalFilterOptions.data';
import FlexBox from '../atoms/FlexBox';
import useProductsService from '../../hooks/useProductsService.hook';

export interface UpdateOfferModalProps extends ModalFormProps {
  _id: string;
}

const EditOfferModal: React.FC<UpdateOfferModalProps> = ({ onClose, _id }) => {
  const [current, setCurrent] = useState<IProductFullFormData>();
  const [type, setType] = useState<OfferTypeEnum>(OfferTypeEnum.GOODS);
  const service = useProductsService();
  // function onValid(sData: IProductFormData) {
  //   const productForSubmit = toReqData(sData, { ignorePaths: ['measurement'] });
  //
  //   service.create({
  //     data: { data: productForSubmit },
  //     onSuccess: data => {
  //       setCurrent(toOfferFormData(data));
  //     },
  //     onLoading: setIsLoading,
  //   });
  // }
  return (
    <ModalBase title={t('Create offer')} onClose={onClose}>
      <FlexBox padding={'0 8px 16px'}>
        <ModalFilter filterOptions={productsFilterOptions} onOptSelect={o => setType(o.value)} />

        <OfferBaseInfoFormSection
          defaultValues={current}
          onSuccess={data => {
            setCurrent(toOfferFormData(data));
          }}
          type={type}
        />

        <OfferDimensionsFormSection defaultValues={current?.dimensions} disabled={!current} />
        <OfferMeasurementForm defaultValues={current?.measurement} disabled={!current} />
      </FlexBox>
    </ModalBase>
  );
};

export default EditOfferModal;
