import React, { useMemo, useState } from 'react';
import { useTheme } from 'styled-components';
import FlexBox from '../../../atoms/FlexBox';
import { Text } from '../../../atoms/Text';
import ButtonIcon from '../../../atoms/ButtonIcon/ButtonIcon';
import { DiPropertiesRenderItemProps } from '../DirProperties';
import PropertyItem from './PropertyItem';
import { t } from '../../../../lang';
import { IVariationTemplate } from '../../../../types/offers/properties.types';

const PropertyGroupItem: React.FC<DiPropertiesRenderItemProps<IVariationTemplate>> = ({
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
    return !item.childrenList?.length ? (
      <FlexBox justifyContent={'stretch'}>
        <Text $weight={500} $size={16} $align={'center'}>
          {t('Not found any properties')}
        </Text>
      </FlexBox>
    ) : (
      item?.childrenList?.map((el, index) => (
        <PropertyItem
          key={`property_${el?._id}`}
          item={el}
          parent={item}
          index={index}
          {...{ onUpdate, onCreateChild, onDelete, onCreateValue, onChangeSelectableStatus }}
        />
      ))
    );
  }, [item, onChangeSelectableStatus, onCreateChild, onCreateValue, onDelete, onUpdate]);

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
        <FlexBox
          gap={6}
          fillHeight
          alignItems={'center'}
          fxDirection={'row'}
          style={{ position: 'sticky', top: 0, left: 0 }}
        >
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

            {item.childrenList?.length !== 0 && (
              <Text $size={12} $align={'left'}>
                {` (${item.childrenList?.length})`}
              </Text>
            )}
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
