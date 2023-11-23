import React, { useMemo, useState } from 'react';
import { OnCheckBoxChangeHandler } from '../../../TableList/tableTypes.types';
import ButtonIcon from '../../../atoms/ButtonIcon/ButtonIcon';
import { Text } from '../../../atoms/Text';
import FlexBox from '../../../atoms/FlexBox';
import Switch from '../../../atoms/Switch';
import styled from 'styled-components';
import { DiPropertiesRenderItemProps } from '../DirProperties';
import PropertyValueItem from './PropertyValueItem';

const PropertyItem: React.FC<DiPropertiesRenderItemProps> = ({
  item,
  index,
  onChangeSelectableStatus,
  onUpdate,
  onDelete,
  onCreateValue,
}) => {
  const [isSelectable, setIsSelectable] = useState(item?.isSelectable);
  const [isOpen, setIsOpen] = useState(false);
  const onChange: OnCheckBoxChangeHandler = e => {
    setIsSelectable(e.checked);
    onChangeSelectableStatus && onChangeSelectableStatus(item?._id, e.checked);
  };
  const handleOpen = () => {
    setIsOpen(p => !p);
  };

  const renderChildren = useMemo(() => {
    return item.childrenList?.map((el, index) => (
      <PropertyValueItem
        key={`property_${el?._id}`}
        item={el}
        index={index}
        {...{ onUpdate, onDelete, onCreateValue }}
      />
    ));
  }, [item.childrenList, onCreateValue, onDelete, onUpdate]);

  return (
    <StPropertyItem>
      <StPropertyHeader fillWidth gap={6} padding={'4px 8px'} fxDirection={'row'} justifyContent={'space-between'}>
        <ButtonIcon
          variant={'defNoEffects'}
          icon={isOpen ? 'SmallArrowDown' : 'SmallArrowRight'}
          iconSize={'24px'}
          onClick={handleOpen}
          flex={1}
        >
          <Text style={{ flex: 1 }} $weight={600}>
            {item?.label}
          </Text>
        </ButtonIcon>

        <FlexBox fxDirection={'row'}>
          <ButtonIcon
            variant={'onlyIcon'}
            icon={'plus'}
            size={'26px'}
            iconSize={'24px'}
            onClick={() => {
              onCreateValue && onCreateValue({ parent: item });
            }}
          />
          <ButtonIcon
            variant={'onlyIcon'}
            icon={'edit'}
            size={'26px'}
            iconSize={'24px'}
            onClick={() => {
              onUpdate && onUpdate({ _id: item._id, data: item }, { isProperty: true });
            }}
          />
          <ButtonIcon variant={'onlyIcon'} icon={'archive'} size={'26px'} iconSize={'24px'} disabled />
        </FlexBox>
      </StPropertyHeader>

      <FlexBox fillWidth overflow={'hidden'} maxHeight={isOpen ? '' : '0'}>
        <StPropertyItemContent fillWidth gap={4} padding={'8px 4px'} flex={1}>
          {item.childrenList && item.childrenList?.length > 0 ? (
            renderChildren
          ) : (
            <FlexBox fillHeight>
              <Text $weight={500} $size={16} $align={'center'}>
                {'Додайте опції до характеристики'}
              </Text>
            </FlexBox>
          )}
        </StPropertyItemContent>

        <FlexBox fxDirection={'row'} gap={4} padding={'4px 8px'} alignItems={'center'}>
          <Switch size={'26px'} checked={isSelectable} onChange={onChange} />
          <Text $size={12}>{'Доступно для формування варіацій'}</Text>
        </FlexBox>
      </FlexBox>
    </StPropertyItem>
  );
};
const StPropertyItemContent = styled(FlexBox)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  border-top: 1px solid ${p => p.theme.sideBarBorderColor};
  border-bottom: 1px solid ${p => p.theme.sideBarBorderColor};
`;

const StPropertyItem = styled(FlexBox)`
  border: 1px solid ${p => p.theme.modalBorderColor};
  border-left-width: 3px;

  overflow: hidden;
`;
const StPropertyHeader = styled(FlexBox)`
  position: relative;
  overflow: hidden;
`;

export default PropertyItem;
