import { CreatedModal, useModalService } from '../../Providers/ModalProvider/ModalProvider';
import ModalBase from '../atoms/Modal';
import TagButtonsFilter from '../atoms/TagButtonsFilter';
import { tagsFilterOptions } from '../../data/modalFilterOptions.data';
import { FlexBox } from '../atoms/FlexBox';
import { TagTypeEnum } from '../../types/directories.types';
import { PartialRecord } from '../../types/utils.types';
import { useAppForm } from '../../hooks';
import { AccordionForm, AccordionFormArea } from '../atoms/FormArea/AccordionForm';
import { TagEntity, TagItemDto } from '../../types/tags.types';
import InputLabel from '../atoms/Inputs/InputLabel';
import InputText from '../atoms/Inputs/InputText';
import { Text } from '../atoms/Text';
import { t } from 'lang';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { InputColor } from '../atoms/Inputs/InputColor';
import { useTagsSelector } from '../../redux/selectors.store';
import { createTagThunk, getAllTagsThunk, updateTagThunk } from '../../redux/tags/tags.thunks';
import { useAppDispatch } from '../../redux/store.store';
import { toReqData } from '../../utils';
import { Button } from '../atoms/ButtonIcon';
import { useLoaders } from '../../Providers/Loaders/useLoaders.hook';
import ButtonSwitch from '../atoms/ButtonSwitch';

export interface DirTagsModalProps extends CreatedModal {}

interface DirectoryFormState {
  tagId: string;
  type: TagTypeEnum;
}
const DirTagsModal = (_props: {}) => {
  const _form = useAppForm<DirectoryFormState>({ defaultValues: { type: TagTypeEnum.OFFER } });
  const state = useTagsSelector();
  const modalSrv = useModalService();
  const { formValues, registerIdsToggler } = _form;
  const [selectedItem, setSelectedItem] = useState<TagEntity>();
  const dispatch = useAppDispatch();
  const RenderForm = tabs[formValues.type];
  const dataList = state.listsMap[formValues.type];

  useEffect(() => {
    if (!dataList.length) {
      dispatch(getAllTagsThunk({ params: { type: formValues.type ?? TagTypeEnum.OFFER } }));
    }
  }, [dataList.length, dispatch, formValues.type]);

  useEffect(() => {
    if (selectedItem && selectedItem?.type !== formValues.type) {
      setSelectedItem(undefined);
    }
  }, [formValues.type, selectedItem, selectedItem?.type]);

  return (
    <ModalBase title={'Tags directory'} fillHeight>
      <AccordionFormArea expandable={false} isOpen hideFooter label={'Select type'}>
        <TagButtonsFilter
          options={tagsFilterOptions}
          {...registerIdsToggler('type')}
          disabledCheck={item => !item.value && ![TagTypeEnum.OFFER].includes(item.value as never)}
        />
      </AccordionFormArea>

      <AccordionFormArea expandable={false} isOpen hideFooter label={'Tags list'}>
        {dataList.length ? (
          <TagButtonsFilter
            options={state.list}
            value={selectedItem?._id}
            onSelect={option => {
              if (RenderForm) {
                modalSrv.create(RenderForm, {
                  type: formValues.type,
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

      {RenderForm && (
        <Button.Base
          variant={'defaultMiddle'}
          onClick={() => {
            modalSrv.create(RenderForm, {
              type: formValues.type,
              defaultValues: { type: formValues.type },
            });
          }}
        >
          {'Create'}
        </Button.Base>
      )}
    </ModalBase>
  );
};

type FormProps = { type: TagTypeEnum; defaultValues?: TagItemDto };

const TagsForm = ({ defaultValues, type }: FormProps) => {
  const dispatch = useAppDispatch();
  const _form = useAppForm<TagItemDto>({ defaultValues: { isDisabled: false, isVisible: true, ...defaultValues } });
  const loaders = useLoaders<'create' | 'update' | 'cms'>();

  const canSubmit = Object.values(_.omit(_form.formState.dirtyFields, ['cmsConfigs'])).some(field => !!field);
  const canSubmitCms = Object.values(_form.formState.dirtyFields?.cmsConfigs ?? {}).some(field => !!field);
  const onValid = (fData: TagItemDto) => {
    if (fData._id) {
      dispatch(
        updateTagThunk({
          onLoading: loaders.onLoading('update'),
          data: { data: toReqData(fData) },
        })
      );
    } else {
      dispatch(
        createTagThunk({
          onLoading: loaders.onLoading('create'),
          data: { data: toReqData(fData) },
        })
      );
    }
  };

  return (
    <ModalBase title={'Tags form'} fillHeight width={'360px'}>
      <AccordionForm
        label={defaultValues?.type ?? 'Main info'}
        expandable={false}
        canSubmit={canSubmit}
        isLoading={loaders.hasLoading}
        onSubmit={_form.handleSubmit(fData => {
          onValid(_.omit(fData, ['cmsConfigs']));
        })}
      >
        <InputLabel label={'Label'}>
          <InputText {..._form.register('label')} placeholder={t('Label')} />
        </InputLabel>

        <InputLabel label={'Icon Url'}>
          <InputText {..._form.register('iconUrl')} placeholder={'Icon irl'} />
        </InputLabel>
        <InputLabel label={'Disabled'}>
          <ButtonSwitch
            value={_form.formValues.isDisabled}
            name={'isDisabled'}
            onChange={v => _form.setValue('isDisabled', v)}
          />
        </InputLabel>

        <InputLabel label={'Visibility'}>
          <ButtonSwitch
            value={_form.formValues.isVisible}
            name={'isVisible'}
            onChange={v => _form.setValue('isVisible', v)}
          />
        </InputLabel>
      </AccordionForm>

      <AccordionForm
        canSubmit={canSubmitCms}
        isLoading={loaders.isLoading.update}
        disabled={!defaultValues?._id}
        label={'Cms params'}
        onSubmit={_form.handleSubmit(fData => {
          onValid(_.omit(fData, ['cmsConfigs']));
          console.log('TagsForm', _.pick(fData, ['_id', 'cmsConfigs']));
        })}
      >
        <InputLabel label={'Custom key'}>
          <InputText {..._form.register('cmsConfigs.key')} placeholder={t('Custom key')} />
        </InputLabel>

        <Text $padding={'12px 8px 0'} $size={15} $weight={500}>
          {t('Colors')}
        </Text>

        <FlexBox style={{ columnGap: 12 }} fxDirection={'row'} flexWrap={'wrap'}>
          <InputLabel label={'Font'} disabled={!defaultValues?._id} width={'150px'}>
            <InputColor {..._form.register('cmsConfigs.colors.font')} disabled={!defaultValues?._id} />
          </InputLabel>

          <InputLabel label={'Border'} disabled={!defaultValues?._id} width={'150px'}>
            <InputColor {..._form.register('cmsConfigs.colors.border')} disabled={!defaultValues?._id} />
          </InputLabel>

          <InputLabel label={'Background'} disabled={!defaultValues?._id} width={'150px'}>
            <InputColor {..._form.register('cmsConfigs.colors.background')} disabled={!defaultValues?._id} />
          </InputLabel>
        </FlexBox>
      </AccordionForm>
    </ModalBase>
  );
};

const tabs: PartialRecord<TagTypeEnum, React.FC<FormProps>> = {
  [TagTypeEnum.OFFER]: TagsForm,
};
// const TagsFormPlaceHolder = () => {
//   return (
//     <FlexBox flex={1} padding={'24px'} alignItems={'center'} gap={12}>
//       <Text $weight={600} $size={15}>
//         {'Component in development'}
//       </Text>
//
//       <SvgIcon icon={'info'} size={'45px'} />
//     </FlexBox>
//   );
// };

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
