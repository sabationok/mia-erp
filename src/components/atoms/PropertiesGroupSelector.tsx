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

type FilterData = {
  type: Values<typeof OfferTypeEnum>;
  isSelectable?: boolean;
};
export const PropertiesGroupSelector = ({
  selected,
  onSelect,
  filterValue = { type: OfferTypeEnum.GOODS, isSelectable: true },
  hasFilter = false,
}: {
  selected?: PropertiesGroupEntity;
  onSelect?: (opt: PropertiesGroupEntity) => void;
  filterValue?: FilterData;
  hasFilter?: boolean;
}) => {
  // const service = useAppServiceProvider().get(AppModuleName.offers);

  const state = useOffersSelector();
  const [filter, setFilter] = useState<FilterData>(filterValue);
  const [currentTemplate, setCurrentTemplate] = useState<PropertiesGroupEntity | undefined>();
  // const loaders = useLoaders<'getList' | 'create' | 'update'>();

  const rootList = useMemo(() => {
    if (state.properties?.length) {
      return state.properties.filter(item => item.childrenList?.length);
    }

    const _rootIds = state.propertiesByTypeKeysMap[filter.type];
    const _items: PropertyBaseEntity[] = [];

    for (const _id of _rootIds) {
      const item = state.propertiesDataMap?.[_id];
      item && _items.push(item);
    }

    return _items.filter(item => item.childrenList?.length);
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
    if (rootList?.length && !currentTemplate) {
      if (onSelect && rootList[0]) {
        onSelect(rootList[0]);
      } else {
        setCurrentTemplate(rootList[0]);
      }
    }
  }, [currentTemplate, onSelect, rootList]);

  return (
    <FlexBox margin={'8px 0'} gap={8}>
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

      <InputLabel label={t('Select properties group')}>
        <TabSelector options={rootList} onOptSelect={handleSelect} />
      </InputLabel>
    </FlexBox>
  );
};
