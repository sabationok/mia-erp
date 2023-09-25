import * as React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import FlexBox from '../../atoms/FlexBox';
import translate from '../../../lang';
import { IProductCategoryDirItem } from '../../Directories/dir.types';
import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon';
import CustomSelect from '../../atoms/Inputs/CustomSelect/CustomSelect';
import styled from 'styled-components';

export interface FormProductCategoriesProps {
  onSelect?: (id: string, option?: IProductCategoryDirItem) => void;
  onChange?: (ids: IProductCategoryDirItem[]) => void;
  children?: React.ReactNode;
  defaultData?: IProductCategoryDirItem[];
  options?: IProductCategoryDirItem[];
}

const FormProductCategories: React.FC<FormProductCategoriesProps> = ({
  children,
  options,
  onSelect,
  onChange,
  defaultData,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const [selected, setSelected] = useState<IProductCategoryDirItem[]>([]);

  useEffect(() => {
    if (defaultData) {
      setSelected(defaultData);
    }
  }, [defaultData]);

  const handleSelect = useCallback(
    (option?: IProductCategoryDirItem) => {
      setSelected(p => {
        const newData = option
          ? p.find(el => el._id === option?._id)
            ? p.filter(el => el._id !== option?._id)
            : [...p, option]
          : p;
        onSelect && option?._id && onSelect(option?._id);
        onChange && onChange(newData);
        return newData;
      });
    },
    [onChange, onSelect]
  );
  const handleRemove = useCallback(
    (id: string) => {
      setSelected(prev => {
        const newData = prev.filter(el => el._id !== id);

        onChange && onChange(newData);
        return newData;
      });
    },
    [onChange]
  );

  const renderSelected = useMemo(() => {
    return selected.map((item, index) => {
      return (
        <TagItem key={`item_${item._id}`} fxDirection={'row'} alignItems={'center'} padding={'0 0 0 12px'} gap={2}>
          {item.parent?.label && `${item.parent?.label}/`}
          {`${item?.label}`}
          <ButtonIcon
            variant={'onlyIcon'}
            endIcon={'close'}
            size={'24px'}
            endIconSize={'80%'}
            onClick={() => handleRemove(item._id)}
          />
        </TagItem>
      );
    });
  }, [handleRemove, selected]);

  return (
    <FlexBox fillWidth gap={6}>
      <CustomSelect
        treeMode
        dropDownIsAbsolute
        {...{
          label: translate('categories'),
          placeholder: translate('categories'),
          required: true,
          options,
        }}
        onSelect={handleSelect}
      />

      <FlexBox fxDirection={'row'} flexWrap={'wrap'} gap={8}>
        {renderSelected}
      </FlexBox>
    </FlexBox>
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
