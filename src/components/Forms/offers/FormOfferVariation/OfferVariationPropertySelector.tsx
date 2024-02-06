import { IProperty, IPropertyValue } from '../../../../types/properties.types';
import { MaybeNull } from '../../../../types/utils.types';
import * as React from 'react';
import { useMemo } from 'react';
import { Text } from '../../../atoms/Text';
import styled from 'styled-components';
import ButtonIcon from '../../../atoms/ButtonIcon/ButtonIcon';
import FlexBox from '../../../atoms/FlexBox';
import { PropertyItemStylesByCmsKey } from '../../../Directories/DirProperties/components/PropertyItem';

export interface OfferVariationPropertySelectorProps {
  item: IProperty;
  selectedValue?: string;
  selectedIds?: string[];
  onSelect?: (propId: string, valueId: string, label?: MaybeNull<string>) => void;
}
export const OfferVariationPropertySelector = ({
  item,
  selectedIds = [],
  onSelect,
}: OfferVariationPropertySelectorProps) => {
  const renderChildren = useMemo(() => {
    return item.childrenList?.map(value => {
      const isSelected = selectedIds.includes(value._id);

      return (
        <RenderPropertyValue
          key={`prop-value-${value._id}`}
          item={value}
          isSelected={isSelected}
          onSelect={id => onSelect && onSelect(item._id, id, value?.label)}
        />
      );
    });
  }, [item._id, item.childrenList, onSelect, selectedIds]);

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
  item: IPropertyValue;
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
