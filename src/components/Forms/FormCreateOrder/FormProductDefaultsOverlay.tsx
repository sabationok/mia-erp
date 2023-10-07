import { AppSubmitHandler } from '../../../hooks/useAppForm.hook';
import { IProductDefaultsFormData } from '../../../redux/products/products.types';
import styled from 'styled-components';
import { OverlayHandlerReturn } from '../../atoms/PageOverlayProvider';
import { ModalHeader, OverlayFooter } from '../../atoms';
import FlexBox from '../../atoms/FlexBox';
import { useAppForm } from '../../../hooks';
import { enumToFilterOptions } from '../../../utils/fabrics';
import ModalFilter from '../../ModalForm/ModalFilter';
import { useMemo, useState } from 'react';
import WarehousesTab from './tabs/WarehousesTab';
import PricesTab from '../../AppPages/PageProductOverview/tabs/PricesTab';
import VariationsTab from '../../AppPages/PageProductOverview/tabs/VariationsTab';
import WarehousingTab from '../../AppPages/PageProductOverview/tabs/WarehousingTab';

export interface FormProductDefaultsOverlayProps extends OverlayHandlerReturn {
  onSubmit?: AppSubmitHandler<IProductDefaultsFormData>;
}

export enum FormProductDefaultsTabs {
  warehouse = 'warehouse',
  variation = 'variation',
  supplier = 'supplier',
  price = 'price',
  inventory = 'inventory',
}

const tabs = enumToFilterOptions(FormProductDefaultsTabs);
const FormProductDefaultsOverlay: React.FC<FormProductDefaultsOverlayProps> = ({ onClose, onSubmit }) => {
  const [currentTabIdx, setCurrentTabIdx] = useState(0);

  const { register, registerSelect, setValue, formValues, handleSubmit, ...form } = useAppForm();

  const renderTab = useMemo(() => {
    if (tabs[currentTabIdx].value === FormProductDefaultsTabs.warehouse) {
      return <WarehousesTab />;
    }
    if (tabs[currentTabIdx].value === FormProductDefaultsTabs.price) {
      return <PricesTab />;
    }
    if (tabs[currentTabIdx].value === FormProductDefaultsTabs.variation) {
      return <VariationsTab />;
    }
    if (tabs[currentTabIdx].value === FormProductDefaultsTabs.inventory) {
      return <WarehousingTab />;
    }
    if (tabs[currentTabIdx].value === FormProductDefaultsTabs.supplier) {
      return <FlexBox padding={'12px'}>{'Далі буде'}</FlexBox>;
    }
  }, [currentTabIdx]);

  const onValid = (data: any) => {
    onSubmit && onSubmit(data);
  };
  return (
    <Form onSubmit={handleSubmit(onValid)}>
      <ModalHeader onBackPress={onClose} />

      <Content flex={1} fillWidth>
        <ModalFilter filterOptions={tabs} currentIndex={currentTabIdx} onChangeIndex={setCurrentTabIdx} /> {renderTab}
      </Content>

      <OverlayFooter onCreatePress={() => {}} canSubmit />
    </Form>
  );
};
const Form = styled.form`
  display: flex;
  flex-direction: column;

  flex: 1;

  padding: 0 8px;

  width: 480px;
  max-width: 100%;

  height: 100%;

  background-color: ${p => p.theme.modalBackgroundColor};
`;

const Content = styled(FlexBox)`
  border-top: 1px solid ${p => p.theme.modalBorderColor};

  border-bottom: 1px solid ${p => p.theme.modalBorderColor};
`;
export default FormProductDefaultsOverlay;
