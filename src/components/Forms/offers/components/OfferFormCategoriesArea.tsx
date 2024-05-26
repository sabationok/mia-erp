import { FormEventHandler, useEffect, useMemo, useState } from 'react';
import { Text } from '../../../atoms/Text';
import { AccordionForm } from '../../FormArea/AccordionForm';
import styled from 'styled-components';
import FlexBox, { FlexLi, FlexUl } from '../../../atoms/FlexBox';
import { ServiceName, useAppServiceProvider } from '../../../../hooks/useAppServices.hook';
import { OfferFormAreaProps } from '../types';
import { useOfferLoadersProvider } from '../../../Modals/CreateOfferModal';
import { t } from '../../../../lang';
import { IProductFullFormData, OfferEntity } from '../../../../types/offers/offers.types';
import { ApiDirType } from '../../../../redux/APP_CONFIGS';
import { IDirItemBase } from '../../../../types/dir.types';
import CheckBox from '../../../TableList/TebleCells/CellComponents/CheckBox';
import { getIdRef, sortIds } from '../../../../utils';
import FormProductCategories from '../FormProductCategories';
import { useCurrentOffer } from '../../../../hooks';

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
  const currentOffer = useCurrentOffer(offer);
  const loaders = useOfferLoadersProvider();
  const initIds = sortIds(offer?.categories?.map(p => p._id));
  const service = useAppServiceProvider()[ServiceName.offers];
  const [categoriesIds, setCategoriesIds] = useState<string[]>(initIds);

  const canSubmit = useMemo(() => {
    return initIds?.join(',') !== sortIds(categoriesIds).join(',');
  }, [initIds, categoriesIds]);

  const handleFormSubmit: FormEventHandler = ev => {
    ev.preventDefault();

    currentOffer &&
      service.updateById({
        onLoading: loaders.onLoading('categories'),
        data: { ...getIdRef(currentOffer), data: { categories: categoriesIds }, refreshCurrent: true },
        onSuccess: (data, meta) => {},
      });
  };

  useEffect(() => {
    if (currentOffer?.categories) {
      setCategoriesIds(currentOffer?.categories.map(c => c._id));
    }
    // eslint-disable-next-line
  }, []);

  return (
    <AccordionForm
      label={t('Categories')}
      onSubmit={handleFormSubmit}
      // onReset={handleReset}
      isLoading={loaders.isLoading?.properties}
      canSubmit={canSubmit}
      maxHeight={'300px'}
    >
      <ListBox flex={1} overflow={'auto'}>
        <FormProductCategories onChangeIds={setCategoriesIds} offer={currentOffer} />
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
