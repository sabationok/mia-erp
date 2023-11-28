import React, { useMemo, useState } from 'react';
import ButtonIcon from '../../../atoms/ButtonIcon/ButtonIcon';
import { Text } from '../../../atoms/Text';
import FlexBox from '../../../atoms/FlexBox';
import styled from 'styled-components';
import { DiPropertiesRenderItemProps } from '../DirProperties';
import PropertyValueItem from './PropertyValueItem';
import { t } from '../../../../lang';
import { IProperty, IVariationTemplate, PropertyTypeEnum } from '../../../../types/properties.types';

const PropertyItem: React.FC<DiPropertiesRenderItemProps<IProperty, IVariationTemplate>> = ({
  item,
  onChangeSelectableStatus,
  onUpdate,
  onDelete,
  onCreateValue,
}) => {
  // const [isSelectable] = useState(item?.isSelectable);
  const [isOpen, setIsOpen] = useState(false);
  // const onChange: OnCheckBoxChangeHandler = e => {
  //   setIsSelectable(e.checked);
  //   onChangeSelectableStatus && onChangeSelectableStatus(item?._id, e.checked);
  // };
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
      <StPropertyHeader fillWidth padding={'4px 8px'} fxDirection={'row'} justifyContent={'space-between'}>
        <ButtonIcon
          variant={'defNoEffects'}
          icon={isOpen ? 'SmallArrowDown' : 'SmallArrowRight'}
          iconSize={'24px'}
          onClick={handleOpen}
          flex={1}
        >
          <Text style={{ flex: 1 }} $weight={600} $margin={'0 6px'}>
            {item?.label}

            {item.childrenList?.length !== 0 && (
              <Text $size={12} $align={'left'}>
                {` (${item.childrenList?.length})`}
              </Text>
            )}
          </Text>
        </ButtonIcon>

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
      </StPropertyHeader>

      <FlexBox fillWidth overflow={'hidden'} maxHeight={isOpen ? '' : '0'}>
        <Content fillWidth padding={'8px 4px'}>
          {item.childrenList && item.childrenList?.length > 0 ? (
            <ChildrenBox fillWidth gap={4} flex={1} cmsConfigsKey={item?.cmsConfigs?.key}>
              {renderChildren}
            </ChildrenBox>
          ) : (
            <Text $weight={500} $size={16} $align={'center'} $ellipsisMode={true}>
              {'Додайте опції до характеристики'}
            </Text>
          )}
        </Content>

        <FlexBox gap={4} padding={'4px 8px'}>
          <FlexBox fxDirection={'row'} gap={4} justifyContent={'space-between'}>
            <Text $size={12}>{t('Available for variations')}</Text>
            <Text $size={12} $weight={600}>
              {t(item?.isSelectable ? 'Yes' : 'No')}
            </Text>
          </FlexBox>

          <Content fillWidth padding={'8px 4px'}>
            <Text $size={13} $weight={500}>
              {t('Cms configs')}
            </Text>
          </Content>

          <FlexBox fxDirection={'row'} gap={4} justifyContent={'space-between'}>
            <Text $size={12}>{t('Key')}</Text>
            <Text $size={12} $weight={600}>
              {item?.cmsConfigs?.key ?? t('Undefined')}
            </Text>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </StPropertyItem>
  );
};

const Content = styled(FlexBox)`
  border-top: 1px solid ${p => p.theme.sideBarBorderColor};
  border-bottom: 1px solid ${p => p.theme.sideBarBorderColor};
`;

const StPropertyItem = styled(FlexBox)`
  border: 1px solid ${p => p.theme.modalBorderColor};
  border-left-width: 3px;

  overflow: hidden;
`;

export interface PropertyItemStylesByCmsKeyProps {
  numColumns?: number;
}
export const PropertyItemStylesByCmsKey: Record<string, { numColumns?: number }> = {
  [PropertyTypeEnum.size]: {
    numColumns: 4,
  },
  [PropertyTypeEnum.color]: {
    numColumns: 2,
  },
};
const ChildrenBox = styled(FlexBox)<{ cmsConfigsKey?: string }>`
  display: grid;
  grid-template-columns: repeat(
    ${p => (p.cmsConfigsKey ? PropertyItemStylesByCmsKey[p.cmsConfigsKey]?.numColumns ?? 2 : 2)},
    1fr
  );
`;
const StPropertyHeader = styled(FlexBox)`
  position: relative;
  overflow: hidden;
`;

export default PropertyItem;

// <Switch size={'26px'} checked={isSelectable} onChange={onChange} />
// <Text $size={12}>{'Доступно для формування варіацій'}</Text>
