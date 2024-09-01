import React, { useCallback, useMemo, useState } from 'react';
import { AccordionForm } from '../../../atoms/FormArea/AccordionForm';
import styled from 'styled-components';
import FlexBox from '../../../atoms/FlexBox';
import { useOffersSelector } from '../../../../redux/selectors.store';
import { ServiceName, useAppServiceProvider } from '../../../../hooks/useAppServices.hook';
import { OfferFormAreaProps } from '../types';
import { useOfferLoadersProvider } from '../../../Modals/CreateOfferModal';
import { t } from '../../../../i18e';
import { OfferFormRelatedFieldKeyEnum, OfferFullFormData } from '../../../../types/offers/offers.types';
import { PropertiesGroupSelector } from '../../../atoms/PropertiesGroupSelector';
import { PropertyBaseEntity, PropertyEntity } from '../../../../types/offers/properties.types';
import OfferPropertySelector from '../variations/OfferPropertySelector';
import { Text } from '../../../atoms/Text';
import { useCurrentOffer } from '../../../../hooks';
import { sortIds, updateIdsArray } from '../../../../utils';

export interface OfferFormPropertiesAreaProps
  extends OfferFormAreaProps<OfferFullFormData[OfferFormRelatedFieldKeyEnum.propertiesIds]> {
  // onSubmit?: AppSubmitHandler<string[]>;
  onSelect?: (id: string) => void;
  onChange?: (ids: string[]) => void;
}

export const OfferFormPropertiesArea = ({ onSuccess, disabled, offer }: OfferFormPropertiesAreaProps) => {
  const loaders = useOfferLoadersProvider();
  const state = useOffersSelector();
  const Offer = useCurrentOffer(offer);
  const service = useAppServiceProvider().get(ServiceName.offers);
  const initIds = sortIds(Offer?.properties?.map(p => p._id));
  const [propertiesIds, setPropertiesIds] = useState<string[]>(initIds);
  const [template, setTemplate] = useState<PropertyBaseEntity>();

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    ev.stopPropagation();

    if (Offer) {
      service.updateById({
        data: {
          data: {
            _id: Offer?._id,
            data: { propertiesIds, templateId: template?._id },
          },
        },
        update: true,
        onLoading: loaders.onLoading('properties'),
        onSuccess: onSuccess,
      });
    }
  };

  const canSubmit = useMemo(() => {
    return !!propertiesIds?.length && initIds?.join(',') !== sortIds(propertiesIds)?.join(',');
  }, [propertiesIds, initIds]);

  const propertiesList = useMemo(() => {
    if (template?.childrenList?.length) {
      return template?.childrenList.filter(item => !item?.isSelectable);
    }

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
    setPropertiesIds(prev => {
      // prev.includes(valueId) ? prev.filter(el => el !== valueId) : [...prev, valueId]
      return updateIdsArray({
        arr: prev,
        id: valueId,
        toggle: true,
      });
    });
  }, []);

  const renderPropertiesList = useMemo(() => {
    return propertiesList?.map(prop => {
      return (
        <OfferPropertySelector
          key={`prop_${prop._id}`}
          item={prop}
          selectedIds={propertiesIds}
          onSelect={handleSelect}
        />
      );
    });
  }, [propertiesList, propertiesIds, handleSelect]);

  return (
    <AccordionForm
      label={t('Properties')}
      canSubmit={canSubmit}
      onSubmit={handleSubmit}
      isLoading={loaders.isLoading?.properties}
      isOpen={false}
      disabled={!Offer || disabled}
    >
      <PropertiesGroupSelector selected={template} onSelect={setTemplate} />

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
