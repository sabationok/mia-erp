import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import FlexBox, { FlexLi, FlexUl } from '../../atoms/FlexBox';
import { IDirItemBase, IProductCategoryDirItem } from '../../../types/dir.types';
import styled from 'styled-components';
import { ApiDirType } from '../../../redux/APP_CONFIGS';
import CheckBox from '../../TableList/TebleCells/CellComponents/CheckBox';
import { Text } from '../../atoms/Text';

export interface FormProductCategoriesProps {
  onSelect?: (id: string, option?: IProductCategoryDirItem) => void;
  onChange?: (ids: string[]) => void;
  children?: React.ReactNode;
  defaultData?: string[];
  selectedIds?: string[];
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

  useEffect(() => {
    if (selectedIds) {
      setSelectedIds(selectedIds);
    }
  }, [selectedIds]);

  return (
    <FlexBox fxDirection={'row'} gap={8}>
      {}
    </FlexBox>
  );
};

export default FormProductCategories;

const ListBox = styled(FlexUl)`
  padding-bottom: 8px;
`;
const CategoryBox = styled(FlexLi)`
  &:not(:first-child) {
    border-top: 1px solid ${p => p.theme.sideBarBorderColor};
  }
`;
const CategoriesList = styled(FlexUl)<{ numColumns?: number }>``;

const CategoryItem = styled(FlexLi)``;

const RenderItem = ({
  item,
  onChange,
  getIsSelected,
  parentIds,
}: {
  parentIds?: string[];
  item: IDirItemBase<ApiDirType.CATEGORIES_PROD>;
  onChange?: (checked: boolean, id: string, parentIds?: string[]) => void;
  getIsSelected?: (id: string, checkChildren: boolean) => boolean;
}) => {
  const isActive = getIsSelected && getIsSelected(item._id, !!item?.childrenList?.length);
  return (
    <CategoryItem key={`cate-value-${item._id}`} padding={'0 8px 0px 12px'} gap={12}>
      <FlexBox fxDirection={'row'} alignItems={'center'} gap={12}>
        <CheckBox
          checked={isActive}
          onChange={ev => {
            onChange && onChange(ev.checked, item._id, parentIds);
          }}
        />

        <Text $size={14} $weight={500}>
          {item.label}
        </Text>
      </FlexBox>

      <CategoriesList>
        {!!item.childrenList?.length &&
          item.childrenList.map(child => {
            return (
              <RenderItem
                key={child._id}
                item={child}
                onChange={onChange}
                getIsSelected={getIsSelected}
                parentIds={[...(parentIds ?? []), item._id]}
              />
            );
          })}
      </CategoriesList>
    </CategoryItem>
  );
};
