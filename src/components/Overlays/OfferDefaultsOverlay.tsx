import { AppSubmitHandler } from '../../hooks/useAppForm.hook';
import { OfferDefaultsFormData, OfferEntity } from '../../types/offers/offers.types';
import styled from 'styled-components';
import { CreatedOverlay } from '../../Providers/Overlay/OverlayStackProvider';
import { ModalHeader, OverlayFooter } from '../atoms';
import FlexBox from '../atoms/FlexBox';
import { useAppForm, useAppParams, useCurrentOffer } from '../../hooks';
import { enumToFilterOptions, getIdRef, ObjectFromEntries, toReqData } from '../../utils';
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

export interface FormOfferDefaultsOverlayProps extends CreatedOverlay {
  onSubmit?: AppSubmitHandler<OfferDefaultsFormData>;
  offer?: OfferEntity;
}

export enum OfferDefaultFieldKeyEnum {
  price = 'price',
  variation = 'variation',
  warehouse = 'warehouse',
  inventory = 'inventory',
  supplier = 'supplier',
}

export type OfferOverlayLoaderKey =
  | keyof typeof OfferDefaultFieldKeyEnum
  | `${keyof typeof OfferDefaultFieldKeyEnum}s`
  | 'submiting';

const tabs = enumToFilterOptions(OfferDefaultFieldKeyEnum);
function getFormDefaultValues(offer: OfferEntity) {
  const map = new Map<OfferDefaultFieldKeyEnum, OnlyUUID>();

  tabs.forEach(tab => {
    const key = tab.value;
    if (key) {
      const field = key ? offer?.[key] : undefined;
      if (field) map.set(key, getIdRef(field));
    }
  });

  return ObjectFromEntries(map.entries());
}
const OfferDefaultsOverlay: React.FC<FormOfferDefaultsOverlayProps> = ({ onClose, onSubmit }) => {
  const loaders = useLoaders<OfferOverlayLoaderKey>();
  const offerId = useAppParams()?.offerId;
  const Offer = useCurrentOffer({ _id: offerId });

  const productsS = useAppServiceProvider()[ServiceName.offers];

  const [currentTabIdx, setCurrentTabIdx] = useState(0);

  const { setValue, getValues, formValues, handleSubmit } = useAppForm<OfferDefaultsFormData>({
    defaultValues: !Offer ? undefined : getFormDefaultValues(Offer),
  });

  const handleSelect = useCallback(
    (data: OnlyUUID) => {
      const key = tabs[currentTabIdx].value;

      key && setValue(key, data);
    },
    [currentTabIdx, setValue]
  );

  const onValid = (fData: OfferDefaultsFormData) => {
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
    const _tabsMap: Record<OfferDefaultFieldKeyEnum, React.FC> = {
      [OfferDefaultFieldKeyEnum.warehouse]: () => (
        <WarehousesTab withActions onSelect={handleSelect} selected={getValues('warehouse')} />
      ),
      [OfferDefaultFieldKeyEnum.price]: () => {
        console.log("getValues('price')", getValues('price'));
        return <PricesTab withActions onSelect={handleSelect} selected={getValues('price')} />;
      },
      [OfferDefaultFieldKeyEnum.variation]: () => (
        <VariationsTab withActions onSelect={handleSelect} selected={getValues('variation')} />
      ),
      [OfferDefaultFieldKeyEnum.inventory]: () => (
        <WarehousingTab withActions onSelect={handleSelect} selected={getValues('inventory')} />
      ),
      [OfferDefaultFieldKeyEnum.supplier]: () => (
        <CounterpartyTab
          withActions
          types={[CounterpartyTypesEnum.SUPPLIER]}
          onSelect={handleSelect}
          selected={getValues('supplier')}
        />
      ),
    };
    return _tabsMap;
  }, [getValues, handleSelect]);

  const renderTab = useMemo(() => {
    const currentKey = tabs?.[currentTabIdx]?.value;
    const Tab = currentKey ? tabsMap[currentKey] ?? null : null;

    return Tab ? <Tab /> : null;
  }, [currentTabIdx, tabsMap]);

  const canSubmit = useMemo(() => {
    const currentKey = tabs?.[currentTabIdx]?.value;
    const compareIdsByPath = (key: Keys<typeof OfferDefaultFieldKeyEnum>) => {
      const dataKey = `${key}._id` as const;
      const id_a = _.get(formValues, dataKey);

      return !!id_a && id_a !== _.get(Offer, dataKey);
    };

    return !currentKey ? false : compareIdsByPath(currentKey);
  }, [currentTabIdx, formValues, Offer]);

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
export default OfferDefaultsOverlay;
