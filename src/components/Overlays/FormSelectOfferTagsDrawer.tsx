import styled from 'styled-components';
import FlexBox from '../atoms/FlexBox';
import { useTagsSelector } from '../../redux/selectors.store';
import { ServiceName, useAppServiceProvider } from '../../hooks/useAppServices.hook';
import * as React from 'react';
import { FormEventHandler, useCallback, useEffect, useMemo, useState } from 'react';
import { AppSubmitHandler } from '../../hooks/useAppForm.hook';
import { OnlyUUID } from '../../redux/app-redux.types';
import { ModalFormProps } from '../ModalForm';
import { DrawerHeader, OverlayFooter, OverlayForm } from './index';
import { OfferEntity } from '../../types/offers/offers.types';
import { useCurrentOffer } from '../../hooks';
import { sortIds } from '../../utils';
import { t } from '../../i18e';
import { CreatedDrawer } from '../../Providers/Drawer';
import TagButtonsFilter from '../atoms/TagButtonsFilter';
import { isArray } from 'lodash';
import { useAppDispatch } from '../../redux/store.store';
import { getAllTagsThunk } from '../../redux/tags/tags.thunks';
import { TagTypeEnum } from '../../types/directories.types';
import { ToastService } from 'services';

export interface FormSelectPropertiesProps
  extends CreatedDrawer,
    Omit<ModalFormProps<any, any, string[]>, 'onSubmit' | 'onChange' | 'onSelect'> {
  onSubmit?: AppSubmitHandler<string[]>;
  onSelect?: (id: string) => void;
  onChange?: (ids: string[]) => void;

  offer?: OfferEntity;
  template?: OnlyUUID;

  updateId?: string;
}

const FormSelectPropertiesDrawer: React.FC<FormSelectPropertiesProps> = ({
  onClose,
  title,
  defaultState,
  onSubmit,
  updateId,
  offer,
  template,
  onSelect,
  onChange,
  ...props
}) => {
  const Offer = useCurrentOffer(offer);
  const state = useTagsSelector();
  const dispatch = useAppDispatch();

  const service = useAppServiceProvider()[ServiceName.offers];
  const initState = useMemo(() => {
    return sortIds(Offer?.tags?.map(prop => prop._id));
  }, [Offer?.tags]);

  const [loading, setLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>(initState);

  const canSubmit = useMemo(() => {
    return initState?.join(',') !== sortIds(selectedIds).join(',');
  }, [initState, selectedIds]);

  const handleSubmit: FormEventHandler = useCallback(
    event => {
      event.preventDefault();
      event.stopPropagation();

      const id = updateId ?? Offer?._id;
      if (id) {
        service.updateById({
          data: { data: { _id: id, data: { tagsIds: selectedIds } } },
          onLoading: setLoading,
          onSuccess: (data, _meta) => {
            ToastService.success('Offer updated');
            onClose && onClose();
          },
        });
      } else {
        console.debug('selectedIds', selectedIds);
      }

      onSubmit && onSubmit(selectedIds);
    },
    [Offer?._id, onClose, onSubmit, selectedIds, service, updateId]
  );

  useEffect(() => {
    if (!state.listsMap.OFFER?.length) {
      dispatch(getAllTagsThunk({ params: { type: TagTypeEnum.OFFER } }));
    }
  }, [dispatch, state.list.length, state.listsMap.OFFER?.length]);

  return (
    <OverlayForm onSubmit={handleSubmit} {...props}>
      <DrawerHeader onBackPress={onClose} canSubmit={canSubmit} title={t('Tags')} okButton />

      <Content flex={1} padding={'0 8px'} overflow={'auto'}>
        <TagButtonsFilter
          options={state.listsMap.OFFER}
          value={selectedIds}
          multiple
          onChangeIds={info => {
            isArray(info.value) && setSelectedIds(info.value);
          }}
        />
      </Content>

      <OverlayFooter canSubmit={canSubmit} loading={loading} submitButtonText={t('Confirm')} />
    </OverlayForm>
  );
};

const Content = styled(FlexBox)`
  padding: 16px 8px;
`;

export default FormSelectPropertiesDrawer;
