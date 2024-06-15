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
import { useLoaders } from '../../Providers/Loaders/useLoaders.hook';
import { ServiceName, useAppServiceProvider } from '../../hooks/useAppServices.hook';
import ButtonIcon from './ButtonIcon';

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
  const loaders = useLoaders<'refreshTree' | 'create' | 'update'>();

  const service = useAppServiceProvider().get(ServiceName.offers);

  const rootList = useMemo(() => {
    if (state.properties?.length) {
      return state.properties.filter(item => !item.parent);
    }

    const _ids = state.propertiesByTypeKeysMap[filter.type];
    const _roots: PropertyBaseEntity[] = [];

    for (const _id of _ids) {
      const item = state.propertiesDataMap?.[_id];
      !item?.parent && item && _roots.push(item);
    }

    return _roots;
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
      <FlexBox
        padding={'4px 8px'}
        fxDirection={'row'}
        gap={12}
        alignItems={'center'}
        fillWidth
        justifyContent={'space-between'}
      >
        <ButtonIcon
          variant={'text'}
          sizeType={'extraSmall'}
          isLoading={loaders.isLoading.refreshTree}
          onClick={() => {
            service.getAllProperties({
              params: { dataView: 'tree', depth: 3 },
              onLoading: loaders.onLoading('refreshTree'),
            });
          }}
        >
          {t('Refresh')}
        </ButtonIcon>

        <ButtonIcon variant={'text'} sizeType={'extraSmall'}>
          {t('Add')}
        </ButtonIcon>
      </FlexBox>

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
