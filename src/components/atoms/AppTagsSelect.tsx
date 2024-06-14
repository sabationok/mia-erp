import { useTagsSelector } from '../../redux/selectors.store';
import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import FlexBox from './FlexBox';
import InputLabel from './Inputs/InputLabel';
import { t } from '../../lang';
import { tagsFilterOptions } from '../../data/modalFilterOptions.data';
import { Values } from '../../types/utils.types';
import TabSelector from './TabSelector';
import { TagTypeEnum } from '../../types/directories.types';
import { TagEntity } from '../../types/tags.types';
import TagButtonsFilter, { TagButtonsFilterProps } from './TagButtonsFilter';
import { useAppDispatch } from '../../redux/store.store';
import { getAllTagsThunk } from '../../redux/tags/tags.thunks';

type FilterData = {
  type: Values<typeof TagTypeEnum>;
};
export const AppTagsSelect = ({
  selected,
  onSelect,
  filterValue = { type: TagTypeEnum.OFFER },
  onChangeIds,
  value,
  hideFilter,
}: {
  selected?: TagEntity;
  onSelect?: (opt: TagEntity) => void;
  filterValue?: FilterData;
  hideFilter?: boolean;
} & Pick<TagButtonsFilterProps<TagTypeEnum, TagEntity>, 'onChangeIds' | 'value'>) => {
  // const service = useAppServiceProvider().get(AppModuleName.offers);
  const dispatch = useAppDispatch();
  const state = useTagsSelector();
  const [filter, setFilter] = useState<FilterData>(filterValue);
  const [current, setCurrent] = useState<TagEntity | undefined>();
  // const loaders = useLoaders<'getList' | 'create' | 'update'>();

  const list = useMemo(() => {
    const type = filter.type;

    return state.listsMap?.[type];
  }, [filter.type, state.listsMap]);

  useEffect(() => {
    if (selected) {
      setCurrent(selected);
    }
  }, [selected]);

  // useEffect(() => {
  //   if (list?.length && !current) {
  //     if (onSelect && list[0]) {
  //       onSelect(list[0]);
  //     } else {
  //       setCurrent(list[0]);
  //     }
  //   }
  // }, [current, onSelect, list]);

  useEffect(() => {
    if (!list?.length) {
      dispatch(
        getAllTagsThunk({
          params: { type: filter.type },
        })
      );
    } else {
      console.log(list, filter.type);
    }
  }, [dispatch, filter.type, list?.length]);

  return (
    <FlexBox margin={'8px 0'} gap={8}>
      {!hideFilter && (
        <InputLabel label={t('Select tags group')}>
          <TabSelector
            options={tagsFilterOptions}
            defaultValue={filter.type}
            onSelect={({ value }) => {
              value &&
                setFilter(prev => {
                  return { ...prev, type: value };
                });
            }}
          />
        </InputLabel>
      )}

      <TagButtonsFilter multiple options={list} onChangeIds={onChangeIds} value={value} />
    </FlexBox>
  );
};
