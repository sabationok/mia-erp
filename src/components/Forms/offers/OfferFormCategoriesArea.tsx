import { useEffect, useMemo, useState } from 'react';
import { Text } from '../../atoms/Text';
import { FormArea } from '../FormArea/FormArea';
import styled from 'styled-components';
import FlexBox, { FlexLi, FlexUl } from '../../atoms/FlexBox';
import { useDirectorySelector } from '../../../redux/selectors.store';
import { ServiceName, useAppServiceProvider } from '../../../hooks/useAppServices.hook';
import { AppSubmitHandler } from '../../../hooks/useAppForm.hook';
import { OfferFormAreaProps } from './types';
import { useOfferLoadersProvider } from '../../Modal/CreateOfferModal';
import { ArrayUUID } from '../../../redux/global.types';
import { t } from '../../../lang';
import { OfferEntity } from '../../../types/offers/offers.types';
import { ApiDirType } from '../../../redux/APP_CONFIGS';
import { IDirItemBase } from '../../../types/dir.types';
import CheckBox from '../../TableList/TebleCells/CellComponents/CheckBox';

export interface OfferFormCategoriesAreaProps extends OfferFormAreaProps<ArrayUUID> {
  onSubmit?: AppSubmitHandler<string[]>;
  onSelect?: (id: string) => void;
  onChange?: (ids: string[]) => void;
  onSuccess?: (data: OfferEntity) => void;
  update?: string;
}

export const OfferFormCategoriesArea = ({
  onSubmit,
  onSuccess,
  disabled,
  offer,
  defaultValues,
}: OfferFormCategoriesAreaProps) => {
  const loaders = useOfferLoadersProvider();
  const offerCategories = useDirectorySelector(ApiDirType.CATEGORIES_PROD).directory;
  const [parentIdsMap, setParentIdsMap] = useState<Record<string, { selected: boolean; parentIds: string[] }>>({});
  const service = useAppServiceProvider()[ServiceName.products];
  const selectedIds = useMemo(
    () =>
      Object.keys(parentIdsMap).filter(idKey => {
        return parentIdsMap?.[idKey]?.selected;
      }),
    [parentIdsMap]
  );

  const handleSelect = (id: string, parentIds?: string[]) => {
    if (parentIds?.length) {
      const newData = {
        ...parentIdsMap,
        [id]: { selected: true, parentIds: parentIdsMap?.[id]?.parentIds || parentIds },
      };
      parentIds?.forEach(parentId => {
        if (newData?.[parentId]) {
          newData[parentId] = {
            ...newData[parentId],
            selected: true,
          };
        } else {
          newData[parentId] = {
            parentIds: [],
            selected: true,
          };
        }
      });
      setParentIdsMap(newData);
    } else {
      setParentIdsMap(prev => {
        return { ...prev, [id]: { selected: true, parentIds: parentIds ?? [] } };
      });
    }
  };
  const handleRemove = (id: string) => {
    const getChildIds = () => {
      return selectedIds.filter(key => parentIdsMap?.[key]?.parentIds?.includes(id));
    };
    const childIds = getChildIds();
    if (childIds?.length) {
      const newData = { ...parentIdsMap, [id]: { selected: false, parentIds: parentIdsMap?.[id]?.parentIds } };

      childIds.forEach(idKey => {
        newData[idKey] = {
          ...newData[idKey],
          selected: false,
        };
      });

      setParentIdsMap(newData);
    } else {
      setParentIdsMap(p => ({ ...p, [id]: { selected: false, parentIds: p?.[id]?.parentIds } }));
    }
  };
  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();

    if (onSubmit) {
      onSubmit(selectedIds);
    } else if (offer) {
      service.updateById({
        data: { _id: offer?._id, updateCurrent: true, data: { categories: selectedIds } },
        onLoading: loaders.onLoading('properties'),
        onSuccess: onSuccess,
      });
    }
  };

  const canSubmit = useMemo(() => {
    if (disabled) return false;
    if (offer?.categories?.length) {
      return (
        offer?.categories
          ?.map(p => p._id)
          .sort((a, b) => a.localeCompare(b))
          .join(',') !== selectedIds.sort((a, b) => a.localeCompare(b)).join(',')
      );
    }
    return !!selectedIds.length;
  }, [offer?.categories, disabled, selectedIds]);

  useEffect(() => {
    if (defaultValues?.length) {
      setParentIdsMap(prev =>
        Object.assign(
          prev,
          ...defaultValues.map(item => {
            return {
              [item]: {
                parentIds: [],
                selected: true,
              },
            };
          })
        )
      );
    }
    // eslint-disable-next-line
  }, []);

  const renderCategories = useMemo(() => {
    return offerCategories.map(parent => {
      const isActive =
        selectedIds.includes(parent._id) ||
        !!selectedIds.find(
          idKey => parentIdsMap?.[idKey]?.parentIds?.includes(parent._id) && parentIdsMap?.[idKey]?.selected
        );

      return (
        <CategoryBox key={`property-${parent._id}`} gap={8} fillWidth padding={'8px 0 0'}>
          <FlexBox fxDirection={'row'} justifyContent={'space-between'} alignItems={'center'} gap={12}>
            <CheckBox
              checked={isActive}
              onChange={ev => {
                if (ev.checked) {
                  handleSelect(parent._id);
                } else {
                  handleRemove(parent._id);
                }
              }}
            />
            <Text style={{ flex: 1, paddingLeft: 12 }} $weight={500}>
              {parent.label}
            </Text>
          </FlexBox>

          <CategoriesList fillWidth padding={'8px 0'}>
            {parent?.childrenList?.map(item => {
              return (
                <RenderItem
                  key={item._id}
                  item={item}
                  parentIds={[parent._id]}
                  getIsSelected={id => selectedIds.includes(id)}
                  onChange={(checked, id, parentIds) => {
                    if (checked) {
                      handleSelect(id, parentIds ?? []);
                    } else {
                      handleRemove(id);
                    }
                  }}
                />
              );
            })}
          </CategoriesList>
        </CategoryBox>
      );
    });
  }, [handleRemove, offerCategories, selectedIds]);

  return (
    <FormArea
      label={t('Categories')}
      onSubmit={handleSubmit}
      isLoading={loaders.isLoading?.properties}
      disabled={!canSubmit}
    >
      <ListBox flex={1} overflow={'auto'}>
        {renderCategories}
      </ListBox>
    </FormArea>
  );
};
const ListBox = styled(FlexUl)`
  border-top: 1px solid ${p => p.theme.sideBarBorderColor};
  border-bottom: 1px solid ${p => p.theme.sideBarBorderColor};
  padding-bottom: 8px;
`;
const CategoryBox = styled(FlexLi)`
  &:not(:first-child) {
    border-top: 1px solid ${p => p.theme.sideBarBorderColor};
  }
`;
const CategoriesList = styled(FlexBox)<{ numColumns?: number }>``;

const CategoryItem = styled(FlexBox)``;

const RenderItem = ({
  item,
  onChange,
  getIsSelected,
  parentIds,
}: {
  parentIds?: string[];
  item: IDirItemBase<ApiDirType.CATEGORIES_PROD>;
  onChange?: (checked: boolean, id: string, parentIds?: string[]) => void;
  getIsSelected?: (id: string) => boolean;
}) => {
  const isActive = getIsSelected && getIsSelected(item._id);
  return (
    <CategoryItem key={`cate-value-${item._id}`} padding={'6px 8px'}>
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
    </CategoryItem>
  );
};
