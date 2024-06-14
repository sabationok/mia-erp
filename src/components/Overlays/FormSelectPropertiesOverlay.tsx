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
import { PropertyBaseEntity, PropertyEntity } from '../../types/offers/properties.types';
import OfferPropertySelector from '../Forms/offers/variations/OfferPropertySelector';
import { PropertiesGroupSelector } from '../atoms/PropertiesGroupSelector';
import { useCurrentOffer } from '../../hooks';
import { sortIds } from '../../utils';

export interface FormSelectPropertiesProps
  extends CreatedOverlay,
    Omit<ModalFormProps<any, any, string[]>, 'onSubmit' | 'onChange' | 'onSelect'> {
  onSubmit?: AppSubmitHandler<string[]>;
  onSelect?: (id: string) => void;
  onChange?: (ids: string[]) => void;

  offer?: OfferEntity;
  template?: OnlyUUID;

  updateId?: string;
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
  const currentOffer = useCurrentOffer(offer);
  const state = useOffersSelector();
  const service = useAppServiceProvider()[ServiceName.offers];
  const [currentTemplate, setCurrentTemlate] = useState<PropertyBaseEntity>();

  const [loading, setLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const initState = useMemo(() => {
    return sortIds(currentOffer?.properties?.map(prop => prop._id));
  }, [currentOffer?.properties]);

  useEffect(() => {
    if (initState?.length) {
      setSelectedIds(initState);
    }
    // eslint-disable-next-line
  }, []);

  const propertiesList = useMemo(() => {
    const _rootId = currentTemplate?._id;
    const _propertiesList: PropertyEntity[] = [];
    const _propertiesIds = state.propertiesKeysMap?.[_rootId ?? 'def'] ?? [];

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
  }, [currentTemplate?._id, state.propertiesDataMap, state.propertiesKeysMap]);

  const canSubmit = useMemo(() => {
    return sortIds(initState)?.join(',') !== sortIds(selectedIds).join(',');
  }, [initState, selectedIds]);

  const handleSubmit: FormEventHandler = useCallback(
    event => {
      event.preventDefault();

      const id = updateId ?? currentOffer?._id;
      if (id) {
        service.updateById({
          data: { data: { _id: id, data: { properties: selectedIds } } },
          onLoading: setLoading,
          onSuccess: (data, _meta) => {
            ToastService.success('Product updated');
            onClose && onClose();
          },
        });
      } else {
        console.debug('selectedIds', selectedIds);
      }

      onSubmit && onSubmit(selectedIds);
    },
    [currentOffer?._id, onClose, onSubmit, selectedIds, service, updateId]
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
    if (currentOffer?.properties) {
      setSelectedIds(currentOffer?.properties.map(p => p._id));
    }
  }, [currentOffer?.properties]);

  return (
    <OverlayForm onSubmit={handleSubmit} {...props}>
      <DrawerHeader
        onBackPress={onClose}
        canSubmit={canSubmit}
        title={(title || currentTemplate?.label) ?? ''}
        okButton
      />

      <PropertiesGroupSelector onSelect={setCurrentTemlate} selected={currentTemplate} />

      <PropertiesBox flex={1} overflow={'auto'}>
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
