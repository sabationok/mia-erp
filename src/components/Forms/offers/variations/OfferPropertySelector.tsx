import { PropertyEntity, PropertyTypeEnum, PropertyValueEntity } from '../../../../types/offers/properties.types';
import { MaybeNull } from '../../../../types/utils.types';
import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { Text } from '../../../atoms/Text';
import styled from 'styled-components';
import ButtonIcon from '../../../atoms/ButtonIcon';
import FlexBox from '../../../atoms/FlexBox';
import { useOffersSelector } from '../../../../redux/selectors.store';
import { t } from '../../../../i18e';
import TagButtonsFilter from '../../../atoms/TagButtonsFilter';
import SvgIcon from '../../../atoms/SvgIcon';

interface PropertyItemStyleByCmsTypeProps {
  numColumns?: number;
}

const PropertyItemStylesByCmsKey: Record<PropertyTypeEnum | string, PropertyItemStyleByCmsTypeProps> = {
  [PropertyTypeEnum.size]: {
    numColumns: 4,
  },
  [PropertyTypeEnum.color]: {
    numColumns: 2,
  },
  [PropertyTypeEnum.style]: {
    numColumns: 2,
  },
  [PropertyTypeEnum.care]: {
    numColumns: 1,
  },
};
export interface OfferPropertySelectorProps {
  item: PropertyEntity;
  selectedValue?: string;
  selectedIds?: string[];
  multiple?: boolean;
  isOpen?: boolean;
  childrenList?: PropertyEntity['childrenList'];
  onSelect?: (propId: string, valueId: string, label?: MaybeNull<string>) => void;
  onChangeIds?: (propId: string, valueIds: string[]) => void;
}
export const OfferPropertySelector = ({
  item,
  selectedIds,
  onSelect,
  isOpen,
  multiple,
  onChangeIds,
}: OfferPropertySelectorProps) => {
  const state = useOffersSelector();
  const [_isOpen, setIsOpen] = useState(isOpen ?? false);

  const childrenList = useMemo(() => {
    if (item.childrenList?.length) {
      return item.childrenList;
    }
    const _propId = item?._id;

    const _valuesList: PropertyValueEntity[] = [];

    const _valuesIds = state.propertiesKeysMap?.[_propId] ?? [];

    for (const valueId of _valuesIds) {
      const value = state.propertiesDataMap?.[valueId];
      if (value) {
        _valuesList.push(value);
      }
    }
    return _valuesList;
  }, [item?._id, item.childrenList, state.propertiesDataMap, state.propertiesKeysMap]);

  useEffect(() => {
    if (childrenList?.length) {
      setIsOpen(true);
    }
  }, [childrenList?.length]);

  const configs = item.cmsConfigs?.type ? PropertyItemStylesByCmsKey?.[item.cmsConfigs?.type] : undefined;

  return (
    <PropertyBox key={`property-box-${item._id}`} fillWidth>
      <ButtonIcon
        gap={8}
        fxDirection={'row'}
        padding={'6px 0'}
        justifyContent={'space-between'}
        alignItems={'center'}
        onClick={() => {
          setIsOpen(p => !p);
        }}
      >
        <Text $weight={500} $padding={'0 8px'}>
          {item.label}
        </Text>

        <SvgIcon size={'28px'} icon={_isOpen ? 'SmallArrowDown' : 'SmallArrowLeft'} />
      </ButtonIcon>

      {_isOpen && (
        <ExpandContainer padding={'8px 0'}>
          {item.cmsConfigs?.type && (
            <FlexBox gap={6} padding={'6px'} justifyContent={'center'} alignItems={'center'}>
              <Text $size={11} $weight={400}>
                {t('Cms type:')} {`"${item.cmsConfigs?.type}"`}
              </Text>
            </FlexBox>
          )}

          <TagButtonsFilter
            numColumns={configs?.numColumns}
            name={item._id}
            multiple={multiple}
            value={selectedIds}
            options={childrenList}
            onSelectValue={info => {
              onSelect && onSelect(info.name, info.value);
            }}
            onChange={values => {
              onChangeIds && onChangeIds(item._id, values);
            }}
          />
        </ExpandContainer>
      )}
    </PropertyBox>
  );
};
const PropertyBox = styled(FlexBox)`
  &:not(:first-child) {
    border-top: 1px solid ${p => p.theme.sideBarBorderColor};
  }

  //padding-bottom: 8px;

  &:last-child {
    border-bottom: 1px solid ${p => p.theme.sideBarBorderColor};
  }
`;

const ExpandContainer = styled(FlexBox)`
  border-top: 1px solid ${p => p.theme.sideBarBorderColor};
`;

// const RenderPropertyValue = ({
//   item,
//   isSelected,
//   onSelect,
// }: {
//   item: PropertyValueEntity;
//   isSelected?: boolean;
//   onSelect: (id: string) => void;
// }) => {
//   return (
//     <ValueTag
//       variant={isSelected ? 'filledMiddle' : 'outlinedMiddle'}
//       padding={'6px 8px'}
//       fontWeight={500}
//       onClick={() => {
//         onSelect && onSelect(item._id);
//       }}
//     >
//       {item.label}
//     </ValueTag>
//   );
// };

// const ValueTag = styled(ButtonIcon)`
//   width: 100%;
//   max-width: 100%;
//   min-width: 50px;
// `;

export default OfferPropertySelector;
