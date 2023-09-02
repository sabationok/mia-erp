import FlexBox from '../../atoms/FlexBox';
import { IDirItemBase } from '../../Directories/dir.types';
import { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useDirectoriesSelector } from '../../../redux/selectors.store';
import { ApiDirType } from '../../../redux/APP_CONFIGS';
import CustomSelect, { CustomSelectOnClickHandler } from '../../atoms/Inputs/CustomSelect/CustomSelect';
import { Text } from '../../atoms/Text';
import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon';
import { OnlyUUID } from '../../../redux/global.types';

export interface FormVariationsTemplateConfigsProps {
  onSelect?: (ids: OnlyUUID[]) => void;
}

const FormVariationsTemplateConfigs: React.FC<FormVariationsTemplateConfigsProps> = () => {
  const [selectedItems, setSelectedItems] = useState<IDirItemBase<ApiDirType.PROPERTIES_PRODUCTS>[]>([]);

  const properties = useDirectoriesSelector(ApiDirType.PROPERTIES_PRODUCTS).directory;

  const onRemoveItem = useCallback((id: string) => {
    setSelectedItems(prev => prev.filter(el => el._id !== id));
  }, []);

  const onSelectItem: CustomSelectOnClickHandler<IDirItemBase> = useCallback(
    option => {
      if (!option) {
        return;
      } else if (selectedItems.find(el => el?._id === option?._id)) {
        option && onRemoveItem(option?._id);
        return;
      } else {
        setSelectedItems(prev => [...prev, option]);
      }
    },
    [onRemoveItem, selectedItems]
  );

  const selectOptions = useMemo(() => {
    return properties
      .filter(el => !el?.parent)
      .map((el, index) => {
        return el;
      });
  }, [properties]);

  const renderSelectedOptions = useMemo(() => {
    return selectedItems.map((el, index) => {
      return (
        <SelectedOption
          key={el?._id || index}
          fxDirection={'row'}
          alignItems={'flex-start'}
          justifyContent={'space-between'}
          fillWidth
        >
          <FlexBox>
            <Text $size={14}>{el?.label}</Text>

            <FlexBox fxDirection={'row'} fillWidth flex={1} flexWrap={'wrap'} gap={4} padding={'2px 4px'}>
              {el?.childrenList &&
                el?.childrenList?.map((ch, chIdx) => (
                  <Text key={ch._id} $size={10}>
                    {`${ch.label}${el?.childrenList && chIdx + 1 < el?.childrenList?.length ? ', ' : ''}`}
                  </Text>
                ))}
            </FlexBox>
          </FlexBox>
          <RemoveButton
            variant={'onlyIconNoEffects'}
            size={'36px'}
            iconSize={'80%'}
            icon={'delete'}
            onClick={() => onRemoveItem(el?._id)}
          />
        </SelectedOption>
      );
    });
  }, [onRemoveItem, selectedItems]);

  return (
    <FlexBox flex={1} fillWidth fxDirection={'row'} padding={'4px 8px'} gap={8}>
      <FlexBox fillHeight flex={'1'} gap={8}>
        <CustomSelect
          dropDownIsAbsolute
          options={selectOptions}
          label={'Доступні характеристики'}
          placeholder={'Оберіть доступні характеристики'}
          onSelect={onSelectItem}
        />

        <FlexBox fillWidth padding={'8px'}>
          <Text $size={16} $weight={600}>
            {'Обрані характеристики'}
          </Text>
        </FlexBox>
        <FlexBox fillWidth overflow={'auto'}>
          {renderSelectedOptions}
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
};

const SelectedOption = styled(FlexBox)`
  //height: 36px;
  padding: 0 8px;

  border-bottom: 1px solid ${p => p.theme.modalBorderColor};
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
