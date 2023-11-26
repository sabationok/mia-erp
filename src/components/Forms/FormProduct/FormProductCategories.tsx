import * as React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import FlexBox from '../../atoms/FlexBox';
import translate from '../../../lang';
import { IDirItemBase, IProductCategoryDirItem } from '../../../types/dir.types';
import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon';
import CustomSelect from '../../atoms/Inputs/CustomSelect/CustomSelect';
import styled from 'styled-components';

export interface FormProductCategoriesProps {
  onSelect?: (id: string, option?: IProductCategoryDirItem) => void;
  onChange?: (ids: string[]) => void;
  children?: React.ReactNode;
  defaultData?: string[];
  options?: IProductCategoryDirItem[];
}

const FormProductCategories: React.FC<FormProductCategoriesProps> = ({ options, onSelect, onChange, defaultData }) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleSelect = useCallback(
    (option?: IProductCategoryDirItem) => {
      setSelectedIds(prev => {
        const newData = option
          ? prev.includes(option?._id)
            ? prev.filter(el => el !== option?._id)
            : [...prev, option._id]
          : prev;
        onSelect && option?._id && onSelect(option?._id);
        onChange && onChange(newData);
        return newData;
      });
    },
    [onChange, onSelect]
  );
  const handleRemove = useCallback(
    (id: string) => {
      setSelectedIds(prev => {
        const newData = prev.filter(el => el !== id);

        onChange && onChange(newData);
        return newData;
      });
    },
    [onChange]
  );

  const renderTreeData = useMemo(() => {
    return options?.map((item, index) => {
      return (
        <ListItem
          key={`item_lvl_0_${item._id}`}
          item={item}
          index={index}
          selectedIds={selectedIds}
          onRemove={handleRemove}
        />
      );
    });
  }, [handleRemove, options, selectedIds]);

  useEffect(() => {
    if (defaultData) {
      setSelectedIds(defaultData);
    }
  }, [defaultData]);

  return (
    <FlexBox fillWidth gap={6}>
      <CustomSelect
        treeMode
        dropDownIsAbsolute
        defaultValue={defaultData}
        {...{
          label: translate('categories'),
          placeholder: translate('categories'),
          required: true,
          options,
        }}
        onSelect={handleSelect}
      />

      <FlexBox fxDirection={'row'} flexWrap={'wrap'} gap={8}>
        {renderTreeData}
      </FlexBox>
    </FlexBox>
  );
};

const ListItem: React.FC<{
  item: IDirItemBase;
  lvl?: number;
  index?: number;
  onRemove?: (id: string) => void;
  selectedIds: string[];
}> = ({
  item,
  index = 0,
  lvl = 0,
  selectedIds,
  onRemove = () => {
    console.log('onRemove not passed', lvl);
  },
}) => {
  const renderChildren = useMemo(() => {
    return item?.childrenList?.map((item, index) => {
      return (
        <ListItem
          key={`item_lvl_${lvl}_${item._id}`}
          item={item}
          index={index}
          onRemove={onRemove}
          lvl={lvl + 1}
          selectedIds={selectedIds}
        />
      );
    });
  }, [item?.childrenList, lvl, onRemove, selectedIds]);

  const isSelected = useMemo(() => {
    return selectedIds.includes(item._id);
  }, [item._id, selectedIds]);
  return (
    <>
      {isSelected && (
        <TagItem fxDirection={'row'} alignItems={'center'} padding={'0 2px 0 12px'} gap={2}>
          {item?.parent?.label && `${item?.parent?.label}/`}
          {`${item?.label}`}
          <ButtonIcon
            variant={'onlyIcon'}
            endIcon={'close'}
            size={'24px'}
            endIconSize={'80%'}
            onClick={() => onRemove && onRemove(item._id)}
          />
        </TagItem>
      )}
      {renderChildren}
    </>
  );
};

const TagItem = styled(FlexBox)`
  font-weight: 500;
  font-size: 12px;
  color: ${p => p.theme.accentColor.base};

  min-height: 28px;

  border-radius: 2px;
  border: 1px solid ${p => p.theme.accentColor.base};
`;
export default FormProductCategories;
