import { AppSubmitHandler } from '../../hooks/useAppForm.hook';
import { OfferDefaultsFormState, OfferEntity } from '../../types/offers/offers.types';
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
import { OnlyUUID } from '../../redux/app-redux.types';
import { ServiceName, useAppServiceProvider } from '../../hooks/useAppServices.hook';
import { LoadersProvider } from '../../Providers/Loaders/LoaderProvider';
import { useLoaders } from '../../Providers/Loaders/useLoaders.hook';
import { Keys } from '../../types/utils.types';
import _ from 'lodash';

export interface FormProductDefaultsOverlayProps extends CreatedOverlay {
  onSubmit?: AppSubmitHandler<OfferDefaultsFormState>;
  offer?: OfferEntity;
}

export enum FormOfferDefaultsTabs {
  price = 'price',
  variation = 'variation',
  warehouse = 'warehouse',
  inventory = 'inventory',
  supplier = 'supplier',
}

export type OfferOverlayLoaderKey =
  | keyof typeof FormOfferDefaultsTabs
  | `${keyof typeof FormOfferDefaultsTabs}s`
  | 'submiting';

const tabs = enumToFilterOptions(FormOfferDefaultsTabs);

const FormProductDefaultsOverlay: React.FC<FormProductDefaultsOverlayProps> = ({ onClose, onSubmit }) => {
  const loaders = useLoaders<OfferOverlayLoaderKey>();
  const offerId = useAppParams()?.offerId;
  const Offer = useCurrentOffer({ _id: offerId });

  const productsS = useAppServiceProvider()[ServiceName.offers];

  const [currentTabIdx, setCurrentTabIdx] = useState(0);

  const { setValue, getValues, formValues, handleSubmit } = useAppForm<OfferDefaultsFormState>();

  const handleSelect = useCallback(
    (data: OnlyUUID) => {
      const key = tabs[currentTabIdx].value;

      key && setValue(key, data);
    },
    [currentTabIdx, setValue]
  );

  const onValid = (fData: OfferDefaultsFormState) => {
    Offer?._id &&
      productsS.setDefaults({
        data: { data: { _id: Offer?._id, defaults: toReqData(fData) } },
        onSuccess: (data, meta) => {
          console.log(data, meta);
        },
        onLoading: loaders.onLoading('submiting'),
      });
  };
  const tabsMap = useMemo(() => {
    const _tabsMap: Record<FormOfferDefaultsTabs, React.FC> = {
      [FormOfferDefaultsTabs.warehouse]: () => (
        <WarehousesTab withActions onSelect={handleSelect} selected={formValues?.warehouse} />
      ),
      [FormOfferDefaultsTabs.price]: () => (
        <PricesTab withActions onSelect={handleSelect} selected={formValues?.price} />
      ),
      [FormOfferDefaultsTabs.variation]: () => (
        <VariationsTab withActions onSelect={handleSelect} selected={formValues?.variation} />
      ),
      [FormOfferDefaultsTabs.inventory]: () => (
        <WarehousingTab withActions onSelect={handleSelect} selected={formValues?.inventory} />
      ),
      [FormOfferDefaultsTabs.supplier]: () => (
        <CounterpartyTab
          withActions
          types={[CounterpartyTypesEnum.SUPPLIER]}
          onSelect={handleSelect}
          selected={formValues?.supplier}
        />
      ),
    };
    return _tabsMap;
  }, [
    formValues?.inventory,
    formValues?.price,
    formValues?.supplier,
    formValues?.variation,
    formValues?.warehouse,
    handleSelect,
  ]);

  const renderTab = useMemo(() => {
    const currentKey = tabs?.[currentTabIdx]?.value;
    const Tab = currentKey ? tabsMap[currentKey] ?? null : null;

    return Tab ? <Tab /> : null;
  }, [currentTabIdx, tabsMap]);

  const canSubmit = useMemo(() => {
    const compareIdsByPath = (key: Keys<typeof FormOfferDefaultsTabs>) => {
      const dataKey = `${key}._id` as const;

      const id_a = getValues(dataKey);

      return !!id_a && id_a !== _.get(Offer, dataKey);
    };

    const currentKey = tabs?.[currentTabIdx]?.value;
    return !currentKey ? false : compareIdsByPath(currentKey);
  }, [Offer, getValues, currentTabIdx]);

  return (
    <LoadersProvider value={loaders}>
      <Form onSubmit={handleSubmit(onValid)}>
        <ModalHeader onBackPress={onClose} title={t('Default values')} canSubmit={canSubmit} />

        <TabSelector options={tabs} currentIndex={currentTabIdx} onChangeIndex={setCurrentTabIdx} />

        <Content flex={1} fillWidth overflow={'hidden'}>
          {renderTab}
        </Content>

        <OverlayFooter loading={loaders.hasLoading} canSubmit={canSubmit} />
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
