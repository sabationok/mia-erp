import { PropertyEntity, PropertyTypeEnum, PropertyValueEntity } from '../../../../types/offers/properties.types';
import { MaybeNull } from '../../../../types/utils.types';
import * as React from 'react';
import { useMemo } from 'react';
import { Text } from '../../../atoms/Text';
import styled from 'styled-components';
import ButtonIcon from '../../../atoms/ButtonIcon/ButtonIcon';
import FlexBox from '../../../atoms/FlexBox';
import { useProductsSelector } from '../../../../redux/selectors.store';

const PropertyItemStylesByCmsKey: Record<string, { numColumns?: number }> = {
  [PropertyTypeEnum.size]: {
    numColumns: 4,
  },
  [PropertyTypeEnum.color]: {
    numColumns: 2,
  },
};
export interface OfferVariationPropertySelectorProps {
  item: PropertyEntity;
  selectedValue?: string;
  selectedIds?: string[];
  childrenList?: PropertyEntity['childrenList'];
  onSelect?: (propId: string, valueId: string, label?: MaybeNull<string>) => void;
}
export const OfferVariationPropertySelector = ({
  item,
  selectedIds,
  onSelect,
}: OfferVariationPropertySelectorProps) => {
  const state = useProductsSelector();

  const renderChildren = useMemo(() => {
    const _propId = item?._id;

    const _valuesList: PropertyValueEntity[] = [];

    const _valuesIds = state.propertiesKeysMap?.[_propId] ?? [];

    for (const valueId of _valuesIds) {
      const value = state.propertiesDataMap?.[valueId];
      if (value) {
        _valuesList.push(value);
      }
    }

    return _valuesList?.map(value => {
      const isSelected = selectedIds?.includes(value._id);
      return (
        <RenderPropertyValue
          key={`prop-value-${value._id}`}
          item={value}
          isSelected={isSelected}
          onSelect={id => onSelect && onSelect(item._id, id, value?.label)}
        />
      );
    });
  }, [item._id, onSelect, selectedIds, state.propertiesDataMap, state.propertiesKeysMap]);

  return (
    <PropertyBox key={`property-box-${item._id}`} gap={8} fillWidth padding={'8px 0 0'}>
      <Text style={{ flex: 1, paddingLeft: 12 }} $weight={500}>
        {item.label}
      </Text>

      <PropertyValuesBox fillWidth padding={'8px 0'} gap={6} cmsKey={item.cmsConfigs?.key}>
        {renderChildren}
      </PropertyValuesBox>
    </PropertyBox>
  );
};
const PropertyBox = styled(FlexBox)`
  border-top: 1px solid ${p => p.theme.sideBarBorderColor};
  &:last-child {
    border-bottom: 1px solid ${p => p.theme.sideBarBorderColor};
  }
`;

const PropertyValuesBox = styled(FlexBox)<{ cmsKey?: MaybeNull<string> }>`
  width: 100%;
  display: grid;

  grid-template-columns: repeat(${p => (p.cmsKey ? PropertyItemStylesByCmsKey[p.cmsKey]?.numColumns ?? 2 : 2)}, 1fr);
`;

const RenderPropertyValue = ({
  item,
  isSelected,
  onSelect,
}: {
  item: PropertyValueEntity;
  isSelected?: boolean;
  onSelect: (id: string) => void;
}) => {
  return (
    <ValueTag
      variant={isSelected ? 'filledSmall' : 'outlinedSmall'}
      padding={'6px 8px'}
      fontWeight={500}
      onClick={() => {
        onSelect && onSelect(item._id);
      }}
    >
      {item.label}
    </ValueTag>
  );
};

const ValueTag = styled(ButtonIcon)`
  width: 100%;
  max-width: 100%;
  min-width: 50px;
`;

export default OfferVariationPropertySelector;
