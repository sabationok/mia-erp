import React, { useMemo, useState } from 'react';
import { useTheme } from 'styled-components';
import FlexBox from '../../../atoms/FlexBox';
import { Text } from '../../../atoms/Text';
import ButtonIcon from '../../../atoms/ButtonIcon/ButtonIcon';
import { DiPropertiesRenderItemProps } from '../DirProperties';
import PropertyItem from './PropertyItem';

const PropertyGroupItem: React.FC<DiPropertiesRenderItemProps> = ({
  item,

  onUpdate,
  onCreateChild,
  onDelete,
  onCreateValue,
  onChangeSelectableStatus,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const theme = useTheme();

  const renderChildren = useMemo(() => {
    return !item.childrenList || item.childrenList.length === 0 ? (
      <FlexBox justifyContent={'stretch'}>
        <Text $weight={500} $size={16} $align={'center'}>
          {'Характеристики відсутні'}
        </Text>
      </FlexBox>
    ) : (
      item.childrenList?.map((el, index) => (
        <PropertyItem
          key={`property_${el?._id}`}
          item={el}
          index={index}
          {...{ onUpdate, onCreateChild, onDelete, onCreateValue, onChangeSelectableStatus }}
        />
      ))
    );
  }, [item.childrenList, onChangeSelectableStatus, onCreateChild, onCreateValue, onDelete, onUpdate]);

  return (
    <FlexBox>
      <FlexBox
        gap={8}
        padding={'4px 6px'}
        fxDirection={'row'}
        style={{
          borderTop: `1px solid ${theme.sideBarBorderColor}`,
          borderBottom: isOpen ? `1px solid ${theme.sideBarBorderColor}` : '',
        }}
      >
        <FlexBox gap={6} fillHeight alignItems={'center'} fxDirection={'row'}>
          <ButtonIcon
            variant={'onlyIcon'}
            icon={'plus'}
            size={'26px'}
            iconSize={'24px'}
            onClick={() => {
              onCreateChild && onCreateChild({ parent: item }, { isGroup: true });
            }}
          />

          <ButtonIcon
            variant={'onlyIcon'}
            icon={'edit'}
            size={'26px'}
            iconSize={'24px'}
            onClick={() => {
              onUpdate && onUpdate({ _id: item._id, data: item }, { isGroup: true });
            }}
          />
          <ButtonIcon variant={'onlyIcon'} icon={'archive'} size={'26px'} iconSize={'24px'} />
        </FlexBox>

        <ButtonIcon
          variant={'def'}
          endIcon={isOpen ? 'SmallArrowDown' : 'SmallArrowLeft'}
          endIconSize={'24px'}
          onClick={() => setIsOpen(p => !p)}
          flex={1}
          justifyContent={'space-between'}
        >
          <Text $weight={600} $size={16} $align={'left'}>
            {item.label}
            {` (${item.childrenList?.length || 0})`}
          </Text>
        </ButtonIcon>
      </FlexBox>

      <FlexBox padding={isOpen ? '6px 8px' : ''} gap={6} flex={1} overflow={'hidden'} maxHeight={isOpen ? '' : '0'}>
        {renderChildren}
      </FlexBox>
    </FlexBox>
  );
};

export default PropertyGroupItem;
