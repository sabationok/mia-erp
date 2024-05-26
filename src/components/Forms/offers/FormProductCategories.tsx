import * as React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import FlexBox, { FlexLabel, FlexLi, FlexUl } from '../../atoms/FlexBox';
import { OfferCategoryEntity } from '../../../types/dir.types';
import styled from 'styled-components';
import { ApiDirType } from '../../../redux/APP_CONFIGS';
import CheckBox from '../../TableList/TebleCells/CellComponents/CheckBox';
import { Text } from '../../atoms/Text';
import { useDirectorySelector } from '../../../redux/selectors.store';
import { UUID } from '../../../types/utils.types';
import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon';
import { OfferEntity } from '../../../types/offers/offers.types';

export interface FormProductCategoriesProps {
  onSelect?: (id: string, option?: OfferCategoryEntity) => void;
  onChange?: (ids: string) => void;
  onChangeIds?: (ids: string[]) => void;
  onChangeMap?: (map: IsSelectedIdsMap) => void;
  children?: React.ReactNode;
  defaultData?: string[];
  selectedIds?: string[];
  options?: OfferCategoryEntity[];
  offer?: OfferEntity;
}

const getUnicIds = (map: IsSelectedIdsMap) => {
  const idsArrays = Object.keys(map).filter(key => {
    return map?.[key]?.length;
  });

  return idsArrays;
};

type IsSelectedIdsMap = Record<UUID, UUID[]>;
const FormProductCategories: React.FC<FormProductCategoriesProps> = ({ onChangeIds, onChange, offer }) => {
  const treeData = useDirectorySelector(ApiDirType.CATEGORIES_PROD).directory;

  const [selectedMap, setSelectedMap] = useState<IsSelectedIdsMap>({});

  const init = useMemo(() => {
    if (!offer?.categories) {
      return undefined;
    }

    const _next: IsSelectedIdsMap = {};
    offer?.categories?.forEach(category => {
      const parentId = category.parent?._id;
      const catId = category?._id;

      if (!catId) return;

      if (parentId) {
        _next[parentId] = _next[parentId] ? [..._next[parentId], catId] : [catId];
      }
      _next[catId] = _next[catId] ? [..._next[catId], catId] : [catId];
    });
    Object.entries(_next).forEach(([key, val]) => {
      if (_next[key]?.length > 1) {
        _next[key] = Array.from(new Set(val));
      }
    });

    return _next;
  }, [offer?.categories]);

  useEffect(() => {
    if (init) setSelectedMap(init);
    // eslint-disable-next-line
  }, []);

  const toggleSelected = useCallback(
    async (ev: { checked: boolean; _id: UUID; pathIds: UUID[] }) => {
      onChange && onChange(ev._id);

      setSelectedMap(prev => {
        const newMap = ev.checked ? { ...prev, [ev._id]: [ev._id] } : { ...prev, [ev._id]: [] };

        if (!ev.checked) {
          prev?.[ev._id]?.forEach(removeId => {
            newMap[removeId] = [];
          });
          newMap[ev._id] = [];
        } else {
          let ids: string[] = ev.pathIds;
          ev.pathIds.forEach((registerId, index) => {
            ids = ids.slice(1, ids.length);
            if (registerId === ev._id) {
              newMap[registerId] = [registerId];
            } else {
              newMap[registerId] = [...new Set([...(newMap[registerId] ?? []), ...ids])];
            }
          });
        }

        onChangeIds && onChangeIds(getUnicIds(newMap));
        return newMap;
      });
    },
    [onChange, onChangeIds]
  );

  const renderCategories = useMemo(() => {
    const isSelected = (id: UUID) => {
      return !!selectedMap?.[id]?.length;
    };
    return treeData.map(parent => {
      return (
        <RootBox>
          <RenderCategory
            key={parent._id}
            item={parent}
            depth={0}
            pathIds={[]}
            isChecked={isSelected}
            onChange={toggleSelected}
          />
        </RootBox>
      );
    });
  }, [selectedMap, toggleSelected, treeData]);

  return <FlexBox minWidth={'max-content'}>{renderCategories}</FlexBox>;
};

export default FormProductCategories;

const RootBox = styled(FlexLi)`
  //padding: 8px 0;
  // &:not(:first-child) {
  //   border-top: 1px solid ${p => p.theme.sideBarBorderColor};
  // }
`;

const CategoriesList = styled(FlexUl)<{ numColumns?: number }>``;

const CategoryListItem = styled(FlexLi)`
  &:not(:last-child) {
  }

  min-width: max-content;
`;

const CategoryItem = styled(FlexBox)`
  border-bottom: 1px solid ${p => p.theme.sideBarBorderColor};
`;

const RenderCategory = ({
  pathIds,
  item,
  depth = 0,
  onChange,
  isChecked,
}: {
  pathIds: UUID[];
  item: OfferCategoryEntity;
  depth: number;
  onChange?: (ev: { checked: boolean; _id: UUID; pathIds: UUID[] }) => void;
  isChecked?: (id: UUID) => boolean;
}) => {
  const [isOpen, setIsOpen] = useState(!!item?.childrenList?.length);
  const itemId = item?._id ?? '';

  const nextPathIds = [...pathIds, itemId];
  return (
    <CategoryListItem key={`cate-value-${itemId}`} padding={depth ? '0 0 0 16px' : ''}>
      <CategoryItem gap={12} fxDirection={'row'} alignItems={'center'} padding={'8px 0'}>
        <ButtonIcon
          variant={'onlyIconNoEffects'}
          iconSize={'22px'}
          disabled={!item?.childrenList?.length}
          icon={isOpen ? 'SmallArrowDown' : 'SmallArrowRight'}
          onClick={() => {
            setIsOpen(p => !p);
          }}
        />

        <FlexLabel flex={1} fxDirection={'row'} alignItems={'center'} gap={12} padding={'4px 6px'}>
          <CheckBox
            size={'22px'}
            checked={isChecked ? isChecked(itemId) : false}
            onChange={ev => {
              onChange && onChange({ pathIds: nextPathIds, _id: itemId, checked: ev.checked });
            }}
          />

          <Text $size={14} $weight={500}>
            {item.label}
          </Text>
        </FlexLabel>
      </CategoryItem>

      {isOpen && (
        <CategoriesList>
          {item.childrenList?.map(child => {
            return (
              <RenderCategory
                key={child._id}
                depth={depth + 1}
                item={child}
                onChange={onChange}
                isChecked={isChecked}
                pathIds={nextPathIds}
              />
            );
          })}
        </CategoriesList>
      )}
    </CategoryListItem>
  );
};
