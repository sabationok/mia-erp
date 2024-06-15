import styled from 'styled-components';
import FlexBox from '../atoms/FlexBox';
import { useOffersSelector } from '../../redux/selectors.store';
import { ServiceName, useAppServiceProvider } from '../../hooks/useAppServices.hook';
import * as React from 'react';
import { FormEventHandler, useCallback, useEffect, useMemo, useState } from 'react';
import { AppSubmitHandler } from '../../hooks/useAppForm.hook';
import { OnlyUUID } from '../../redux/app-redux.types';
import { ModalFormProps } from '../ModalForm';
import { ToastService } from '../../services';
import { DrawerHeader, OverlayFooter, OverlayForm } from './index';
import { OfferEntity } from '../../types/offers/offers.types';
import { CreatedOverlay } from '../../Providers/Overlay/OverlayStackProvider';
import { PropertiesGroupEntity, PropertyEntity } from '../../types/offers/properties.types';
import OfferPropertySelector from '../Forms/offers/variations/OfferPropertySelector';
import { PropertiesFilterData, PropertiesGroupSelector } from '../atoms/PropertiesGroupSelector';
import { useCurrentOffer } from '../../hooks';
import { sortIds } from '../../utils';
import { t } from '../../lang';

export interface FormSelectPropertiesProps
  extends CreatedOverlay,
    Omit<ModalFormProps<any, any, string[]>, 'onSubmit' | 'onChange' | 'onSelect'> {
  onSubmit?: AppSubmitHandler<string[]>;
  onSelect?: (id: string) => void;
  onChange?: (ids: string[]) => void;

  offer?: OfferEntity;
  template?: OnlyUUID;

  updateId?: string;

  filterValue?: Partial<PropertiesFilterData>;
}

const FormSelectPropertiesOverlay: React.FC<FormSelectPropertiesProps> = ({
  onClose,
  title,
  defaultState,
  onSubmit,
  updateId,
  offer,
  template,
  onSelect,
  onChange,
  ...props
}) => {
  const Offer = useCurrentOffer(offer);
  const state = useOffersSelector();
  const service = useAppServiceProvider()[ServiceName.offers];

  const initialTemplate = useMemo(() => {
    if (!Offer?.template) {
      const id = Offer?.properties?.[0]?.path?.split('.')?.[0];

      return id ? { _id: id } : undefined;
    }

    // return undefined;
    return Offer?.template;
  }, [Offer?.properties, Offer?.template]);

  const [currentTemplate, setCurrentTemplate] = useState<PropertiesGroupEntity | undefined>();

  const [loading, setLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const initState = useMemo(() => {
    return sortIds(Offer?.properties?.map(prop => prop._id));
  }, [Offer?.properties]);

  useEffect(() => {
    if (initState?.length) {
      setSelectedIds(initState);
    }
    // eslint-disable-next-line
  }, []);

  const propertiesList = useMemo(() => {
    if (currentTemplate?.childrenList?.length) {
      return currentTemplate?.childrenList.filter(item => !item.isSelectable);
    }

    const _rootId = currentTemplate?._id;
    if (!_rootId) return undefined;
    const _propertiesList: PropertyEntity[] = [];
    const _propertiesIds = state.propertiesKeysMap?.[_rootId];
    if (!_propertiesIds) return undefined;
    for (const propId of _propertiesIds) {
      const prop = state.propertiesDataMap?.[propId];
      if (prop && !prop?.isSelectable) {
        const childrenIds = state.propertiesKeysMap[prop?._id];
        if (childrenIds?.length) {
          _propertiesList.push(prop);
        }
      }
    }

    return _propertiesList;
  }, [currentTemplate?._id, currentTemplate?.childrenList, state.propertiesDataMap, state.propertiesKeysMap]);

  const canSubmit = useMemo(() => {
    return sortIds(initState)?.join(',') !== sortIds(selectedIds).join(',');
  }, [initState, selectedIds]);

  const handleSubmit: FormEventHandler = useCallback(
    event => {
      event.preventDefault();
      event.stopPropagation();

      const id = updateId ?? Offer?._id;
      if (id) {
        service.updateById({
          data: { data: { _id: id, data: { properties: selectedIds, templateId: currentTemplate?._id } } },
          onLoading: setLoading,
          onSuccess: (data, _meta) => {
            ToastService.success('Offer updated');
            onClose && onClose();
          },
        });
      } else {
        console.debug('selectedIds', selectedIds);
      }

      onSubmit && onSubmit(selectedIds);
    },
    [Offer?._id, currentTemplate?._id, onClose, onSubmit, selectedIds, service, updateId]
  );

  const handleSelect = useCallback((_parentId?: string, valueId: string = '') => {
    setSelectedIds(prev => {
      return prev.includes(valueId) ? prev.filter(el => el !== valueId) : [...prev, valueId];
    });
  }, []);

  const renderPropertiesList = useMemo(() => {
    return propertiesList?.map(prop => {
      return (
        <OfferPropertySelector key={`prop_${prop._id}`} item={prop} selectedIds={selectedIds} onSelect={handleSelect} />
      );
    });
  }, [propertiesList, selectedIds, handleSelect]);

  useEffect(() => {
    if (Offer?.properties) {
      setSelectedIds(Offer?.properties.map(p => p._id));
    }
  }, [Offer?.properties]);

  return (
    <OverlayForm onSubmit={handleSubmit} {...props}>
      <DrawerHeader onBackPress={onClose} canSubmit={canSubmit} title={t('Properties')} okButton />

      <PropertiesGroupSelector
        onSelect={setCurrentTemplate}
        filterValue={{ isSelectable: false }}
        selected={currentTemplate}
        defaultValue={initialTemplate}
      />

      <PropertiesBox flex={1} padding={'0 8px'} overflow={'auto'}>
        {renderPropertiesList}
      </PropertiesBox>

      <OverlayFooter
        canSubmit={canSubmit}
        loading={loading}
        submitButtonText={loading ? 'Loading...' : 'Підтвердити'}
      />
    </OverlayForm>
  );
};

const PropertiesBox = styled(FlexBox)`
  padding-bottom: 8px;
`;

export default FormSelectPropertiesOverlay;
