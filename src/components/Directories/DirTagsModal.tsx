import { CreatedModal, useModalService } from '../../Providers/ModalProvider/ModalProvider';
import ModalBase from '../atoms/Modal';
import TagButtonsFilter from '../atoms/TagButtonsFilter';
import { tagsFilterOptions } from '../../data/modalFilterOptions.data';
import { FlexBox } from '../atoms/FlexBox';
import { TagTypeEnum } from '../../types/directories.types';
import { PartialRecord } from '../../types/utils.types';
import { AccordionFormArea } from '../atoms/FormArea/AccordionForm';
import { TagEntity, TagItemDto } from '../../types/tags.types';
import { Text } from '../atoms/Text';
import { t } from 'lang';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useTagsSelector } from '../../redux/selectors.store';
import { getAllTagsThunk } from '../../redux/tags/tags.thunks';
import { useAppDispatch } from '../../redux/store.store';
import ButtonIcon, { Button } from '../atoms/ButtonIcon';
import ModalFormTags from '../Modals/FormTags';
import { useLoaders } from '../../Providers/Loaders/useLoaders.hook';

export interface DirTagsModalProps extends CreatedModal {}

const DirTagsModal = (_props: {}) => {
  const state = useTagsSelector();
  const modalSrv = useModalService();

  const [type, setType] = useState(TagTypeEnum.OFFER);
  const loaders = useLoaders<'refresh'>();

  const [selectedItem, setSelectedItem] = useState<TagEntity>();
  const dispatch = useAppDispatch();
  const RenderForm = tabs[type];

  const dataList = state?.listsMap?.[type];

  useEffect(() => {
    if (!dataList?.length) {
      dispatch(
        getAllTagsThunk({ params: { type: type ?? TagTypeEnum.OFFER }, onLoading: loaders.onLoading('refresh') })
      );
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (selectedItem && selectedItem?.type !== type) {
      setSelectedItem(undefined);
    }
  }, [type, selectedItem, selectedItem?.type]);

  return (
    <ModalBase title={'Tags directory'} fillHeight>
      <AccordionFormArea expandable={false} isOpen hideFooter label={'Select type'}>
        <TagButtonsFilter
          options={tagsFilterOptions}
          value={type}
          onSelect={option => {
            option.value && setType(option.value);
            // dispatch(getAllTagsThunk({ params: { type: option.value }, onLoading: loaders.onLoading('refresh') }));
          }}
          disabledCheck={item => !item.value && ![TagTypeEnum.OFFER].includes(item.value as never)}
        />
      </AccordionFormArea>

      <AccordionFormArea expandable={false} isOpen hideFooter label={'Tags list'}>
        {dataList.length ? (
          <TagButtonsFilter
            options={dataList}
            value={selectedItem?._id}
            getButtonStyles={op => ({
              backgroundColor: op.cmsConfigs?.colors?.background,
              color: op.cmsConfigs?.colors?.font,
              borderColor: op.cmsConfigs?.colors?.border,
            })}
            onSelect={option => {
              if (RenderForm) {
                modalSrv.create(RenderForm, {
                  type: type,
                  defaultValues: _.omit(option, ['owner', 'author', 'editor']),
                });
              }
            }}
          />
        ) : (
          <FlexBox padding={'24px'} alignItems={'center'} justifyContent={'center'}>
            <Text $weight={600} $size={15}>
              {t('Not data')}
            </Text>
          </FlexBox>
        )}
      </AccordionFormArea>

      <FlexBox margin={'auto 0 0'} padding={'8px 16px 16px'} fxDirection={'row'} gap={8}>
        {RenderForm && (
          <Button.Base
            variant={'defaultMiddle'}
            onClick={() => {
              modalSrv.create(RenderForm, {
                type: type,
                defaultValues: { type: type },
              });
            }}
          >
            {'Create'}
          </Button.Base>
        )}

        <ButtonIcon
          variant={'defaultMiddle'}
          isLoading={loaders.isLoading.refresh}
          onClick={() => {
            dispatch(getAllTagsThunk({ params: { type }, onLoading: loaders.onLoading('refresh') }));
          }}
        >
          {'Refresh'}
        </ButtonIcon>
      </FlexBox>
    </ModalBase>
  );
};

type FormProps = { type: TagTypeEnum; defaultValues?: TagItemDto };

const tabs: PartialRecord<TagTypeEnum, React.FC<FormProps>> = {
  [TagTypeEnum.OFFER]: ModalFormTags,
};

export default DirTagsModal;

// const ArraySelectorHOC = <FData extends FieldValues = { arr: { fdf: [] } }, P = Path<FData>>({
//   form,
//   path,
// }: {
//   form?: UseFormReturn<FData>;
//   path: P;
// }) => {
//   const context = useFormContext<FData>();
//   const _methods = form || context;
//
//   const { fields, append, remove } = useFieldArray<FData, P>({
//     control: _methods?.control,
//     name: path,
//   });
//
//   const watchFieldArray = _methods.watch(path);
//
//   const controlledFields = fields.map((field, index) => {
//     return {
//       ...field,
//       ...watchFieldArray[index],
//     };
//   });
//
//   return controlledFields.map((item, index) => (
//     <div key={item.id}>
//       <input {..._methods?.register(`items.${index}.name` as const)} defaultValue={item.name} />
//       <button type="button" onClick={() => remove(index)}>
//         Видалити
//       </button>
//     </div>
//   ));
// };
