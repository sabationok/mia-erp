import { AppSubmitHandler } from '../../../hooks/useAppForm.hook';
import { IProductDefaultsFormData } from '../../../types/products.types';
import styled from 'styled-components';
import { OverlayHandlerReturn } from '../../atoms/PageOverlayProvider';
import { ModalHeader, OverlayFooter } from '../../atoms';
import FlexBox from '../../atoms/FlexBox';
import { useAppForm } from '../../../hooks';
import { enumToFilterOptions } from '../../../utils/fabrics';
import ModalFilter from '../../atoms/ModalFilter';
import { useCallback, useMemo, useState } from 'react';

import PricesTab from '../../AppPages/PageProductOverview/tabs/PricesTab';
import VariationsTab from '../../AppPages/PageProductOverview/tabs/VariationsTab';
import WarehousingTab from '../../AppPages/PageProductOverview/tabs/WarehousingTab';
import CounterpartyTab from './tabs/CounterpartyTab';
import { CounterpartyTypesEnum } from '../../../redux/directories/counterparties.types';
import { t } from '../../../lang';
import WarehousesTab from './tabs/WarehousesTab';
import { useProductsSelector } from '../../../redux/selectors.store';
import { OnlyUUID } from '../../../redux/global.types';
import { ServiceName, useAppServiceProvider } from '../../../hooks/useAppServices.hook';
import { toReqData } from '../../../utils/data-transform';

export interface FormProductDefaultsOverlayProps extends OverlayHandlerReturn {
  onSubmit?: AppSubmitHandler<IProductDefaultsFormData>;
}

export enum FormProductDefaultsTabs {
  variation = 'variation',
  price = 'price',
  warehouse = 'warehouse',
  inventory = 'inventory',
  supplier = 'supplier',
}

const tabs = enumToFilterOptions(FormProductDefaultsTabs);
const FormProductDefaultsOverlay: React.FC<FormProductDefaultsOverlayProps> = ({ onClose, onSubmit }) => {
  const currentProduct = useProductsSelector()?.currentProduct;
  const productsS = useAppServiceProvider()[ServiceName.products];

  const [currentTabIdx, setCurrentTabIdx] = useState(0);

  const { setValue, formValues, handleSubmit } = useAppForm<IProductDefaultsFormData>();

  const handleSelect = useCallback(
    (data: OnlyUUID) => {
      setValue(tabs[currentTabIdx].value, data);
    },
    [currentTabIdx, setValue]
  );

  const onValid = (fData: IProductDefaultsFormData) => {
    productsS.setDefaults({
      data: { data: { defaults: toReqData(fData) as never }, _id: currentProduct?._id, updateCurrent: true },
      onSuccess: (data, meta) => {
        console.log(data, meta);
      },
    });
  };

  const renderTab = useMemo(() => {
    if (tabs[currentTabIdx].value === FormProductDefaultsTabs.warehouse) {
      return <WarehousesTab onSelect={handleSelect} selected={formValues?.variation} />;
    }
    if (tabs[currentTabIdx].value === FormProductDefaultsTabs.price) {
      return <PricesTab withActions={false} onSelect={handleSelect} selected={formValues?.price} />;
    }
    if (tabs[currentTabIdx].value === FormProductDefaultsTabs.variation) {
      return <VariationsTab withActions={false} onSelect={handleSelect} selected={formValues?.variation} />;
    }
    if (tabs[currentTabIdx].value === FormProductDefaultsTabs.inventory) {
      return <WarehousingTab withActions={false} onSelect={handleSelect} selected={formValues?.inventory} />;
    }
    if (tabs[currentTabIdx].value === FormProductDefaultsTabs.supplier) {
      return (
        <CounterpartyTab
          types={[CounterpartyTypesEnum.SUPPLIER]}
          withActions={false}
          onSelect={handleSelect}
          selected={formValues?.supplier}
        />
      );
    }
  }, [
    currentTabIdx,
    formValues?.inventory,
    formValues?.price,
    formValues?.supplier,
    formValues?.variation,
    handleSelect,
  ]);

  const canSubmit = useMemo(() => {
    const defaults = currentProduct?.defaults;
    if (tabs[currentTabIdx].value === FormProductDefaultsTabs.variation) {
      return formValues.variation && formValues.variation._id !== defaults?.variation?._id;
    }
    if (tabs[currentTabIdx].value === FormProductDefaultsTabs.price) {
      return formValues.price && formValues.price._id !== defaults?.price?._id;
    }
    if (tabs[currentTabIdx].value === FormProductDefaultsTabs.warehouse) {
      return formValues.warehouse && formValues.warehouse._id !== defaults?.warehouse?._id;
    }
    if (tabs[currentTabIdx].value === FormProductDefaultsTabs.inventory) {
      return formValues.inventory && formValues.inventory._id !== defaults?.inventory?._id;
    }
    if (tabs[currentTabIdx].value === FormProductDefaultsTabs.supplier) {
      return formValues.supplier && formValues.supplier._id !== defaults?.supplier?._id;
    }
    return;
  }, [
    currentProduct?.defaults,
    currentTabIdx,
    formValues.inventory,
    formValues.price,
    formValues.supplier,
    formValues.variation,
    formValues.warehouse,
  ]);

  return (
    <Form onSubmit={handleSubmit(onValid)}>
      <ModalHeader onBackPress={onClose} title={t('Default values')} canSubmit={canSubmit} />

      <Content flex={1} fillWidth>
        <ModalFilter filterOptions={tabs} currentIndex={currentTabIdx} onChangeIndex={setCurrentTabIdx} /> {renderTab}
      </Content>

      <OverlayFooter onCreatePress={() => {}} canSubmit={canSubmit} />
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
