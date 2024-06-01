import React, { useCallback, useMemo, useState } from 'react';
import { AccordionForm } from '../../FormArea/AccordionForm';
import styled from 'styled-components';
import FlexBox from '../../../atoms/FlexBox';
import { useProductsSelector } from '../../../../redux/selectors.store';
import { ServiceName, useAppServiceProvider } from '../../../../hooks/useAppServices.hook';
import { AppSubmitHandler } from '../../../../hooks/useAppForm.hook';
import { OfferFormAreaProps } from '../types';
import { useOfferLoadersProvider } from '../../../Modals/CreateOfferModal';
import { ArrayOfUUID } from '../../../../redux/app-redux.types';
import { t } from '../../../../lang';
import { OfferEntity } from '../../../../types/offers/offers.types';
import { PropertiesGroupSelect } from '../../../atoms/PropertiesGroupSelect';
import { PropertyBaseEntity, PropertyEntity } from '../../../../types/offers/properties.types';
import OfferVariationPropertySelector from '../variations/OfferVariationPropertySelector';
import { Text } from '../../../atoms/Text';
import { useCurrentOffer } from '../../../../hooks';

export interface OfferFormPropertiesAreaProps extends OfferFormAreaProps<ArrayOfUUID> {
  onSubmit?: AppSubmitHandler<string[]>;
  onSelect?: (id: string) => void;
  onChange?: (ids: string[]) => void;
  onSuccess?: (data: { data: OfferEntity }) => void;
  update?: string;
}

const sortIds = (ids?: string[]): string[] => {
  return [...(ids ?? [])]?.sort((a, b) => a.localeCompare(b));
};

export const OfferFormPropertiesArea = ({ onSubmit, onSuccess, disabled, offer }: OfferFormPropertiesAreaProps) => {
  const loaders = useOfferLoadersProvider();
  const state = useProductsSelector();
  const currentOffer = useCurrentOffer(offer);
  const service = useAppServiceProvider()[ServiceName.offers];

  const initIds = sortIds(currentOffer?.properties?.map(p => p._id));

  const [selectedIds, setSelectedIds] = useState<string[]>(initIds);
  const [template, setTemplate] = useState<PropertyBaseEntity>();

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (currentOffer) {
      service.updateById({
        data: {
          data: {
            _id: currentOffer?._id,
            data: { properties: selectedIds },
          },
        },
        update: true,
        onLoading: loaders.onLoading('properties'),
        onSuccess: onSuccess,
      });
    }
  };

  const canSubmit = useMemo(() => {
    return !!selectedIds?.length && initIds?.join(',') !== sortIds(selectedIds)?.join(',');
  }, [selectedIds, initIds]);

  const propertiesList = useMemo(() => {
    const _rootId = template?._id;
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
  }, [template, state.propertiesDataMap, state.propertiesKeysMap]);

  const handleSelect = useCallback((_parentId?: string, valueId: string = '') => {
    setSelectedIds(prev => {
      return prev.includes(valueId) ? prev.filter(el => el !== valueId) : [...prev, valueId];
    });
  }, []);

  const renderPropertiesList = useMemo(() => {
    return propertiesList?.map(prop => {
      return (
        <OfferVariationPropertySelector
          key={`prop_${prop._id}`}
          item={prop}
          selectedIds={selectedIds}
          onSelect={handleSelect}
        />
      );
    });
  }, [propertiesList, selectedIds, handleSelect]);

  return (
    <AccordionForm
      label={t('Properties')}
      canSubmit={canSubmit}
      onSubmit={handleSubmit}
      isLoading={loaders.isLoading?.properties}
      isOpen={false}
      disabled={!currentOffer || disabled}
    >
      <PropertiesGroupSelect selected={template} onSelect={setTemplate} />

      <TemplateBox flex={1} overflow={'auto'}>
        {renderPropertiesList?.length ? (
          renderPropertiesList
        ) : (
          <FlexBox padding={'24px'} alignItems={'center'} justifyContent={'center'}>
            <Text $size={16}>{t('Data not found')}</Text>
          </FlexBox>
        )}
      </TemplateBox>
    </AccordionForm>
  );
};
const TemplateBox = styled(FlexBox)`
  padding-bottom: 8px;
`;
