import React, { useMemo } from 'react';
import FlexBox from '../../atoms/FlexBox';
import { Text } from '../../atoms/Text';
import { PropertyEntity, PropertyValueEntity } from '../../../types/offers/properties.types';
import { OfferEntity } from '../../../types/offers/offers.types';
import { CellStyledComp } from './CellStyles';

interface OverviewPropertyComponentProps {
  item: PropertyEntity;
  selectedIds?: string[];
  items?: PropertyValueEntity[];
  data?: OfferEntity;
  index: number;
}
export const OverviewPropertyComponent: React.FC<OverviewPropertyComponentProps> = ({ item, selectedIds, items }) => {
  const renderValues = useMemo(() => {
    const _list = items?.length ? items : item.childrenList?.filter(el => selectedIds?.includes(el._id));

    return _list?.map((value, index) => {
      return (
        <CellStyledComp.CategoryItem key={`prop-v-${value._id}`} className={'PROP_VALUE'} maxWidth={'130px'}>
          {value.label}
        </CellStyledComp.CategoryItem>
      );
    });
  }, [item.childrenList, selectedIds, items]);

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
