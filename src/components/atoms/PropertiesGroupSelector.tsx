import { OfferTypeEnum } from '../../types/offers/offers.types';
import { PropertiesGroupEntity, PropertyBaseEntity } from '../../types/offers/properties.types';
import { useOffersSelector } from '../../redux/selectors.store';
import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { CustomSelectHandler } from './Inputs/CustomSelect';
import FlexBox from './FlexBox';
import InputLabel from './Inputs/InputLabel';
import { t } from '../../lang';
import ButtonsGroup from './ButtonsGroup';
import { offerTypeFilterOptions } from '../../data/modalFilterOptions.data';
import { Values } from '../../types/utils.types';
import TabSelector from './TabSelector';
import { Text } from './Text';

export type PropertiesFilterData = {
  type: Values<typeof OfferTypeEnum>;
  isSelectable?: boolean;
};
export const PropertiesGroupSelector = ({
  selected,
  onSelect,
  filterValue,
  hasFilter = false,
  defaultValue,
}: {
  selected?: PropertiesGroupEntity;
  defaultValue?: PropertiesGroupEntity;
  onSelect?: (opt: PropertiesGroupEntity) => void;
  filterValue?: Partial<PropertiesFilterData>;
  hasFilter?: boolean;
}) => {
  // const service = useAppServiceProvider().get(AppModuleName.offers);

  const state = useOffersSelector();
  const [filter, setFilter] = useState<PropertiesFilterData>({
    type: OfferTypeEnum.GOODS,
    isSelectable: true,
    ...filterValue,
  });
  const [currentTemplate, setCurrentTemplate] = useState<PropertiesGroupEntity | undefined>(defaultValue);
  // const loaders = useLoaders<'getList' | 'create' | 'update'>();

  const rootList = useMemo(() => {
    if (state.properties?.length) {
      return state.properties;
    }

    const _rootIds = state.propertiesByTypeKeysMap[filter.type];
    const _items: PropertyBaseEntity[] = [];

    for (const _id of _rootIds) {
      const item = state.propertiesDataMap?.[_id];
      item && _items.push(item);
    }

    return _items;
  }, [filter.type, state.properties, state.propertiesByTypeKeysMap, state.propertiesDataMap]);

  const handleSelect: CustomSelectHandler<PropertiesGroupEntity> = option => {
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

  useEffect(() => {
    if (rootList?.length && !selected) {
      const found = rootList.find(item => item._id === currentTemplate?._id);
      if (onSelect && found) {
        onSelect(found);
      } else {
        setCurrentTemplate(found);
      }
    }
  }, [currentTemplate?._id, onSelect, rootList, selected]);

  return (
    <FlexBox gap={8}>
      {hasFilter && (
        <InputLabel label={t('Select type')}>
          <ButtonsGroup
            options={offerTypeFilterOptions}
            value={filter.type}
            onSelect={({ value }) => {
              setFilter(prev => {
                return { ...prev, type: value };
              });
            }}
          />
        </InputLabel>
      )}

      {defaultValue?._id ? (
        <FlexBox padding={'8px'} gap={8} fxDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Text $align={'center'} $size={15} $weight={500}>
            {t('Current')}
          </Text>
          <Text $align={'center'} $size={15} $weight={600}>
            {selected?.label}
          </Text>
        </FlexBox>
      ) : (
        <InputLabel label={t('Select properties group')}>
          <TabSelector
            options={rootList}
            onOptSelect={handleSelect}
            defaultFilterValue={selected?._id || currentTemplate?._id}
          />
        </InputLabel>
      )}
    </FlexBox>
  );
};
