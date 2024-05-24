import React, { useMemo } from 'react';
import FlexBox from '../../atoms/FlexBox';
import { Text } from '../../atoms/Text';
import { PropertyEntity } from '../../../types/offers/properties.types';
import { OfferEntity } from '../../../types/offers/offers.types';
import { CellStyledComp } from './CellStyles';

interface OverviewPropertyComponentProps {
  item: PropertyEntity;
  selectedItems?: string[];
  data?: OfferEntity;
  index: number;
}
export const OverviewPropertyComponent: React.FC<OverviewPropertyComponentProps> = ({ item, selectedItems }) => {
  const renderValues = useMemo(() => {
    return item.childrenList
      ?.filter(el => selectedItems?.includes(el._id))
      ?.map((value, index) => {
        return (
          <CellStyledComp.CategoryItem key={`prop-v-${value._id}`} className={'PROP_VALUE'} maxWidth={'130px'}>
            {value.label}
          </CellStyledComp.CategoryItem>
        );
      });
  }, [item.childrenList, selectedItems]);

  return (
    <FlexBox className={'PROPERTY'} gap={8} alignItems={'flex-end'}>
      <FlexBox alignItems={'center'} fxDirection={'row'} fillWidth gap={8}>
        <CellStyledComp.CellText $size={13} $weight={600}>
          {item?.label}
        </CellStyledComp.CellText>
      </FlexBox>

      <FlexBox fxDirection={'row'} flexWrap={'wrap'} fillWidth gap={6}>
        {renderValues && renderValues?.length > 0 ? renderValues : <Text $size={12}>{'---'}</Text>}
      </FlexBox>
    </FlexBox>
  );
};
