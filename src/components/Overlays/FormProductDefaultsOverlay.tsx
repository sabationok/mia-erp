import { AppSubmitHandler } from '../../hooks/useAppForm.hook';
import { IProductDefaultsFormData, OfferEntity } from '../../types/offers/offers.types';
import styled from 'styled-components';
import { CreatedOverlay } from '../../Providers/Overlay/OverlayStackProvider';
import { ModalHeader, OverlayFooter } from '../atoms';
import FlexBox from '../atoms/FlexBox';
import { useAppForm, useAppParams, useCurrentOffer } from '../../hooks';
import { enumToFilterOptions, toReqData } from '../../utils';
import TabSelector from '../atoms/TabSelector';
import React, { useCallback, useMemo, useState } from 'react';

import PricesTab from '../AppPages/offers/tabs/PricesTab';
import VariationsTab from '../AppPages/offers/tabs/VariationsTab';
import WarehousingTab from '../AppPages/offers/tabs/WarehousingTab';
import CounterpartyTab from '../Forms/offers/tabs/CounterpartyTab';
import { CounterpartyTypesEnum } from '../../redux/directories/counterparties.types';
import { t } from '../../lang';
import WarehousesTab from '../Forms/offers/tabs/WarehousesTab';
import { OnlyUUID } from '../../redux/global.types';
import { ServiceName, useAppServiceProvider } from '../../hooks/useAppServices.hook';
import { LoadersProvider } from '../../Providers/Loaders/LoaderProvider';
import { useLoaders } from '../../Providers/Loaders/useLoaders.hook';

export interface FormProductDefaultsOverlayProps extends CreatedOverlay {
  onSubmit?: AppSubmitHandler<IProductDefaultsFormData>;
  offer?: OfferEntity;
}

export enum FormProductDefaultsTabs {
  price = 'price',
  variation = 'variation',
  warehouse = 'warehouse',
  inventory = 'inventory',
  supplier = 'supplier',
}
export type OfferOverlayLoaderKey =
  | keyof typeof FormProductDefaultsTabs
  | `${keyof typeof FormProductDefaultsTabs}s`
  | 'submiting';

const tabs = enumToFilterOptions(FormProductDefaultsTabs);
const FormProductDefaultsOverlay: React.FC<FormProductDefaultsOverlayProps> = ({ onClose, onSubmit }) => {
  const loaders = useLoaders<OfferOverlayLoaderKey>();
  const offerId = useAppParams()?.offerId;
  const currentOffer = useCurrentOffer({ _id: offerId });

  const productsS = useAppServiceProvider()[ServiceName.offers];

  const [currentTabIdx, setCurrentTabIdx] = useState(0);

  const { setValue, formValues, handleSubmit } = useAppForm<IProductDefaultsFormData>();

  const handleSelect = useCallback(
    (data: OnlyUUID) => {
      setValue(tabs[currentTabIdx].value, data);
    },
    [currentTabIdx, setValue]
  );

  const onValid = (fData: IProductDefaultsFormData) => {
    currentOffer?._id &&
      productsS.setDefaults({
        data: { _id: currentOffer?._id, defaults: toReqData(fData) as never, updateCurrent: true },
        onSuccess: (data, meta) => {
          console.log(data, meta);
        },
        onLoading: loaders.onLoading('submiting'),
      });
  };

  const renderTab = useMemo(() => {
    const tabsMap: Record<FormProductDefaultsTabs, React.ReactNode> = {
      [FormProductDefaultsTabs.warehouse]: (
        <WarehousesTab withActions onSelect={handleSelect} selected={formValues?.warehouse} />
      ),
      [FormProductDefaultsTabs.price]: <PricesTab withActions onSelect={handleSelect} selected={formValues?.price} />,
      [FormProductDefaultsTabs.variation]: (
        <VariationsTab withActions onSelect={handleSelect} selected={formValues?.variation} />
      ),
      [FormProductDefaultsTabs.inventory]: (
        <WarehousingTab withActions onSelect={handleSelect} selected={formValues?.inventory} />
      ),
      [FormProductDefaultsTabs.supplier]: (
        <CounterpartyTab
          withActions
          types={[CounterpartyTypesEnum.SUPPLIER]}
          onSelect={handleSelect}
          selected={formValues?.supplier}
        />
      ),
    };

    return tabsMap[tabs[currentTabIdx]?.value] ?? null;
  }, [
    currentTabIdx,
    formValues?.inventory,
    formValues?.price,
    formValues?.supplier,
    formValues?.variation,
    formValues?.warehouse,
    handleSelect,
  ]);

  const canSubmit = useMemo(() => {
    const defaults = currentOffer?.defaults;

    const tabIs: Record<FormProductDefaultsTabs | string, boolean> = {
      [tabs?.[currentTabIdx]?.value ?? '']: true,
    };

    if (tabIs.variation) {
      return formValues.variation && formValues.variation._id !== defaults?.variation?._id;
    }
    if (tabIs.price) {
      return formValues.price && formValues.price._id !== defaults?.price?._id;
    }
    if (tabIs.warehouse) {
      return formValues.warehouse && formValues.warehouse._id !== defaults?.warehouse?._id;
    }
    if (tabIs.inventory) {
      return formValues.inventory && formValues.inventory._id !== defaults?.inventory?._id;
    }
    if (tabIs.supplier) {
      return formValues.supplier && formValues.supplier._id !== defaults?.supplier?._id;
    }
    return;
  }, [
    currentOffer?.defaults,
    currentTabIdx,
    formValues.inventory,
    formValues.price,
    formValues.supplier,
    formValues.variation,
    formValues.warehouse,
  ]);

  return (
    <LoadersProvider value={loaders}>
      <Form onSubmit={handleSubmit(onValid)}>
        <ModalHeader onBackPress={onClose} title={t('Default values')} canSubmit={canSubmit} />

        <TabSelector filterOptions={tabs} currentIndex={currentTabIdx} onChangeIndex={setCurrentTabIdx} />

        <Content flex={1} fillWidth overflow={'hidden'}>
          {renderTab}
        </Content>

        <OverlayFooter loading={loaders.hasLoading} onCreatePress={() => {}} canSubmit={canSubmit} />
      </Form>
    </LoadersProvider>
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
