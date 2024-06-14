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
import ButtonIcon from './ButtonIcon';
import { useTheme } from 'styled-components';
import { useModalService } from '../../Providers/ModalProvider/ModalProvider';
import FormTags from '../Modals/FormTags';

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
  const theme = useTheme();
  // const service = useAppServiceProvider().get(AppModuleName.offers);
  const dispatch = useAppDispatch();
  const state = useTagsSelector();
  const modalSrv = useModalService();
  const [filter, setFilter] = useState<FilterData>(filterValue);
  // const [current, setCurrent] = useState<TagEntity | undefined>();
  // const loaders = useLoaders<'getList' | 'create' | 'update' | 'delete'>();

  const list = useMemo(() => {
    const type = filter.type;

    return state.listsMap?.[type];
  }, [filter.type, state.listsMap]);

  // useEffect(() => {
  //   if (selected) {
  //     setCurrent(selected);
  //   }
  // }, [selected]);

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
    }
  }, [dispatch, filter.type, list, list?.length]);

  const onCreateNewPress = () => {
    modalSrv.create(FormTags, { defaultValues: { type: filter.type } });
  };

  return (
    <FlexBox gap={8}>
      <FlexBox
        fxDirection={'row'}
        gap={8}
        padding={'0 0 8px'}
        borderBottom={`1px solid ${theme.modalBorderColor}`}
        justifyContent={'flex-end'}
      >
        {/*<ButtonIcon variant={'filled'} sizeType={'extraSmall'} disabled isLoading={loaders.isLoading.delete} danger>*/}
        {/*  {t('Delete')}*/}
        {/*</ButtonIcon>*/}

        <ButtonIcon variant={'text'} sizeType={'extraSmall'} onClick={onCreateNewPress}>
          {t('Add')}
        </ButtonIcon>
      </FlexBox>

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
