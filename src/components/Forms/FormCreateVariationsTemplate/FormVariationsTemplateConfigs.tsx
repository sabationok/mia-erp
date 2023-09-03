import FlexBox from '../../atoms/FlexBox';
import { useCallback, useEffect, useMemo, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { useDirectoriesSelector } from '../../../redux/selectors.store';
import { ApiDirType } from '../../../redux/APP_CONFIGS';
import { CustomSelectOnClickHandler } from '../../atoms/Inputs/CustomSelect/CustomSelect';
import { Text } from '../../atoms/Text';
import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon';
import { OnlyUUID } from '../../../redux/global.types';
import Switch from '../../atoms/Switch';
import { OnCheckBoxChangeHandler } from '../../TableList/tableTypes.types';
import { isUndefined } from 'lodash';
import { IVariationProperty } from '../../../redux/products/products.types';

export interface FormVariationsTemplateConfigsProps {
  onSelect?: (id: OnlyUUID) => void;
  onChange?: (ids: OnlyUUID[]) => void;
}

export interface VariationTemplateSelectedOptionProps {
  item?: IVariationProperty;
  index: number;
  onRemovePress?: () => void;
  isSelectableForUser?: boolean;
  onChangeSelectableForUser?: (value: boolean) => void;
}

const VariationTemplateSelectedOption: React.FC<VariationTemplateSelectedOptionProps> = ({
  item,
  onRemovePress,
  isSelectableForUser,
  onChangeSelectableForUser,
}) => {
  const [hasSelector, setHasSelector] = useState(false);
  const theme = useTheme();

  const onChange: OnCheckBoxChangeHandler = data => {
    setHasSelector(data.checked);
    onChangeSelectableForUser && onChangeSelectableForUser(data.checked);
  };

  const renderChildrenList = useMemo(
    () =>
      item?.childrenList &&
      item?.childrenList.length > 0 && (
        <FlexBox fxDirection={'row'} fillWidth flex={1} flexWrap={'wrap'} gap={4} padding={'0 16px'}>
          <Text $size={12} color={theme.globals.colors.info}>
            {/*{item?.childrenList?.map(el => el.label).join(', ')}*/}
          </Text>
        </FlexBox>
      ),
    [item?.childrenList, theme.globals.colors.info]
  );

  useEffect(() => {
    if (!isUndefined(isSelectableForUser)) {
      setHasSelector(isSelectableForUser);
    }
  }, [isSelectableForUser]);
  return (
    <Option alignItems={'flex-start'} justifyContent={'space-between'} fillWidth gap={4} padding={'0 8px'}>
      <FlexBox fxDirection={'row'} alignItems={'center'} gap={8} fillWidth justifyContent={'space-between'}>
        <Text $size={14} $weight={600}>
          {item?.label}
        </Text>

        <RemoveButton
          variant={'onlyIconNoEffects'}
          size={'24px'}
          iconSize={'100%'}
          icon={'close'}
          onClick={onRemovePress}
        />
      </FlexBox>

      {renderChildrenList}

      <FlexBox fxDirection={'row'} gap={8} alignItems={'center'}>
        <Switch size={'32px'} checked={hasSelector} onChange={onChange} />

        <Text $size={10}>{'Доступний для вибору'}</Text>
      </FlexBox>
    </Option>
  );
};

const FormVariationsTemplateConfigs: React.FC<FormVariationsTemplateConfigsProps> = () => {
  const properties = useDirectoriesSelector(ApiDirType.PROPERTIES_PRODUCTS).directory;
  const [availableItems, setAvailableItems] = useState<IVariationProperty[]>(properties);
  const [selectedItems, setSelectedItems] = useState<IVariationProperty[]>([]);

  const onRemoveItem = useCallback((option: IVariationProperty) => {
    setSelectedItems(prev => prev.filter(el => el._id !== option?._id));
    setAvailableItems(p => [...p, option]);
  }, []);

  const onSelectItem: CustomSelectOnClickHandler<IVariationProperty> = useCallback(option => {
    if (!option) {
      return;
    } else {
      setAvailableItems(prev => prev.filter(el => el._id !== option?._id));
      setSelectedItems(p => [...p, option]);
    }
  }, []);
  const renderAvailableOptions = useMemo(() => {
    return availableItems.map((item, idx) => {
      return (
        <ButtonIcon
          key={`opt-${item._id}`}
          variant={'outlinedSmall'}
          onClick={() => onSelectItem(item)}
          style={{ minWidth: 'fit-content', flexBasis: 100 }}
        >
          <Text>{item?.label}</Text>
        </ButtonIcon>
      );
    });
  }, [availableItems, onSelectItem]);
  const renderOptions = useMemo(() => {
    return selectedItems.map((el, index) => {
      return (
        <VariationTemplateSelectedOption
          key={`opt-${el._id}`}
          index={index}
          item={el}
          onRemovePress={() => onRemoveItem(el)}
        />
      );
    });
  }, [onRemoveItem, selectedItems]);

  return (
    <FlexBox flex={1} fillWidth overflow={'hidden'} gap={0}>
      {availableItems.length > 0 && (
        <>
          <FlexBox fillWidth padding={'4px 16px'}>
            <Text $size={16} $weight={600}>
              {'Доступні характеристики'}
            </Text>
          </FlexBox>

          <FlexBox
            fillWidth
            flexWrap={'wrap'}
            padding={'4px 8px'}
            fxDirection={'row'}
            gap={8}
            alignItems={'flex-start'}
          >
            {renderAvailableOptions}
          </FlexBox>
        </>
      )}

      <FlexBox fillWidth padding={'4px 16px'}>
        <Text $size={16} $weight={600}>
          {'Обрані характеристики'}
        </Text>
      </FlexBox>

      <Container fillWidth overflow={'auto'} flex={1} padding={'0 8px'}>
        {renderOptions}
      </Container>
    </FlexBox>
  );
};

const Container = styled(FlexBox)`
  border-top: 1px solid ${p => p.theme.modalBorderColor};
  //border-bottom: 1px solid ${p => p.theme.modalBorderColor};
`;

const Option = styled(FlexBox)`
  border-bottom: 1px solid ${p => p.theme.modalBorderColor};
  &:not(:last-child) {
  }
`;
const RemoveButton = styled(ButtonIcon)`
  & .icon {
    fill: ${p => p.theme.globals.colors.error};
  }
`;
// const templateItemsTreeData: IDirItemBase[] = [...new Array(19)].map((_, idx) => ({
//   label: `${idx + 1}`,
//   _id: `${idx}`,
//   childrenList: [...new Array(5 + idx)].map((_, chIdx) => ({ label: `${chIdx + 1}`, _id: `${chIdx}` })),
// }));
export default FormVariationsTemplateConfigs;
