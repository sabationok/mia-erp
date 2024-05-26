import { OfferTypeEnum } from '../../types/offers/offers.types';
import { ProperiesGroupEntity, PropertyBaseEntity } from '../../types/offers/properties.types';
import { useAppServiceProvider } from '../../hooks/useAppServices.hook';
import { AppModuleName } from '../../redux/reduxTypes.types';
import { useProductsSelector } from '../../redux/selectors.store';
import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import CustomSelect, { CustomSelectHandler } from './Inputs/CustomSelect/CustomSelect';
import FlexBox from './FlexBox';
import InputLabel from './Inputs/InputLabel';
import { t } from '../../lang';
import ButtonsGroup from './ButtonsGroup';
import { productsFilterOptions } from '../../data/modalFilterOptions.data';

export const PropertiesGroupSelect = ({
  selected,
  onSelect,
  filterValue = OfferTypeEnum.GOODS,
  hasFilter = false,
}: {
  selected?: ProperiesGroupEntity;
  onSelect?: (opt: ProperiesGroupEntity) => void;
  filterValue?: OfferTypeEnum;
  hasFilter?: boolean;
}) => {
  const service = useAppServiceProvider().get(AppModuleName.offers);

  const state = useProductsSelector();
  const [filter, setFilter] = useState<OfferTypeEnum>(filterValue);
  const [currentTemplate, setCurrentTemplate] = useState<ProperiesGroupEntity | undefined>();
  // const loaders = useLoaders<'getList' | 'create' | 'update'>();

  const rootList = useMemo(() => {
    const _rootIds = state.propertiesByTypeKeysMap[filter];
    const _items: PropertyBaseEntity[] = [];

    for (const _id of _rootIds) {
      const item = state.propertiesDataMap?.[_id];
      item && _items.push(item);
    }

    return _items;
  }, [filter, state.propertiesByTypeKeysMap, state.propertiesDataMap]);

  const handleSelect: CustomSelectHandler<ProperiesGroupEntity> = option => {
    if (onSelect && option) {
      onSelect(option);
    } else {
      setCurrentTemplate(option);
    }
  };

  useEffect(() => {
    if (selected) {
      setCurrentTemplate(selected);
    }
  }, [selected]);

  // useEffect(() => {
  //   if ()
  // }, []);

  return (
    <FlexBox margin={'8px 0'} gap={8}>
      {hasFilter && (
        <InputLabel label={t('Select type')}>
          <ButtonsGroup
            options={productsFilterOptions}
            value={filter}
            onSelect={({ value }) => {
              setFilter(value);
            }}
          />
        </InputLabel>
      )}

      <CustomSelect
        label={t('Select properties group')}
        selectedOption={currentTemplate}
        onSelect={handleSelect}
        options={rootList}
        placeholder={t('Select properties group')}
      />
    </FlexBox>
  );
};
