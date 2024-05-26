import { useCallback, useEffect, useMemo, useState } from 'react';
import { Text } from '../../../atoms/Text';
import { AccordionForm } from '../../FormArea/AccordionForm';
import styled from 'styled-components';
import FlexBox, { FlexLi, FlexUl } from '../../../atoms/FlexBox';
import { useDirectorySelector } from '../../../../redux/selectors.store';
import { ServiceName, useAppServiceProvider } from '../../../../hooks/useAppServices.hook';
import { OfferFormAreaProps } from '../types';
import { useOfferLoadersProvider } from '../../../Modals/CreateOfferModal';
import { t } from '../../../../lang';
import { IProductFullFormData, OfferEntity } from '../../../../types/offers/offers.types';
import { ApiDirType } from '../../../../redux/APP_CONFIGS';
import { IDirItemBase } from '../../../../types/dir.types';
import CheckBox from '../../../TableList/TebleCells/CellComponents/CheckBox';
import { sortIds } from '../../../../utils';

export interface OfferFormCategoriesAreaProps extends OfferFormAreaProps<IProductFullFormData['categories']> {
  onSelect?: (id: string) => void;
  onChange?: (ids: string[]) => void;
  onSuccess?: (data: OfferEntity) => void;
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
  const initIds = sortIds(offer?.categories?.map(p => p._id));
  const [parentIdsMap, setParentIdsMap] = useState<Record<string, { selected: boolean; parentIds: string[] }>>({});
  const service = useAppServiceProvider()[ServiceName.offers];

  const selectedIds = useMemo(
    () =>
      sortIds(
        Object.keys(parentIdsMap).filter(idKey => {
          return parentIdsMap?.[idKey]?.selected;
        })
      ),
    [parentIdsMap]
  );

  const handleSelect = useCallback(
    (id: string, parentIds?: string[]) => {
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
    },
    [parentIdsMap]
  );
  const handleRemove = useCallback(
    (id: string) => {
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
    },
    [parentIdsMap, selectedIds]
  );
  const handleReset = () => {
    setParentIdsMap({});
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
    return initIds?.join(',') !== selectedIds.join(',');
  }, [selectedIds, initIds]);

  useEffect(() => {
    if (defaultValues?.length) {
      setParentIdsMap(prev =>
        Object.assign(
          prev,
          ...defaultValues.map(idKey => {
            return {
              [idKey]: {
                parentIds: [],
                selected: true,
              },
            };
          })
        )
      );
    }
  }, [defaultValues]);

  const renderCategories = useMemo(() => {
    return offerCategories.map(parent => {
      const getIsActive = (id: string, checkChildren: boolean) =>
        (checkChildren &&
          selectedIds.some(
            idKey => parentIdsMap?.[idKey]?.parentIds?.includes(id) && parentIdsMap?.[idKey]?.selected
          )) ||
        parentIdsMap?.[id]?.selected;

      return (
        <CategoryBox key={`property-${parent._id}`} gap={8} fillWidth padding={'8px 0 0'}>
          <FlexBox fxDirection={'row'} justifyContent={'space-between'} alignItems={'center'} gap={12}>
            <CheckBox
              checked={getIsActive(parent._id, !!parent?.childrenList?.length)}
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
                  getIsSelected={getIsActive}
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
  }, [handleRemove, handleSelect, offerCategories, parentIdsMap, selectedIds]);

  return (
    <AccordionForm
      label={t('Categories')}
      onSubmit={handleSubmit}
      onReset={handleReset}
      isLoading={loaders.isLoading?.properties}
      canSubmit={canSubmit}
      maxHeight={'300px'}
    >
      <ListBox flex={1} overflow={'auto'}>
        {renderCategories}
      </ListBox>
    </AccordionForm>
  );
};
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
