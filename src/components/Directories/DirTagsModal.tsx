import { CreatedModal } from '../../Providers/ModalProvider/ModalProvider';
import ModalBase from '../atoms/Modal';
import TagButtonsFilter from '../atoms/TagButtonsFilter';
import { tagsFilterOptions } from '../../data/modalFilterOptions.data';
import { FlexBox } from '../atoms/FlexBox';
import { TagTypeEnum } from '../../types/directories.types';
import { PartialRecord } from '../../types/utils.types';
import { useAppForm } from '../../hooks';
import { AccordionForm, AccordionFormArea } from '../atoms/FormArea/AccordionForm';
import { TagItemDto } from '../../types/tags.types';
import InputLabel from '../atoms/Inputs/InputLabel';
import InputText from '../atoms/Inputs/InputText';
import { Text } from '../atoms/Text';
import SvgIcon from '../atoms/SvgIcon';
import { t } from 'lang';
import _ from 'lodash';
import React from 'react';
import { InputColor } from '../atoms/Inputs/InputColor';

export interface DirTagsModalProps extends CreatedModal {}
const DirTagsModal = (_props: {}) => {
  const _form = useAppForm<{ selectedTag: TagTypeEnum }>({ defaultValues: { selectedTag: TagTypeEnum.OFFER } });
  const RenderForm = tabs[_form.formValues.selectedTag] ?? TagsFormPlaceHolder;

  return (
    <ModalBase title={'Tags directory'} fillHeight>
      <AccordionFormArea expandable={false} isOpen hideFooter label={'Select type'}>
        <TagButtonsFilter options={tagsFilterOptions} {..._form.registerIdsToggler('selectedTag')} />
      </AccordionFormArea>

      <FlexBox padding={'8px'}>
        <RenderForm type={_form.formValues.selectedTag} />
      </FlexBox>
    </ModalBase>
  );
};

const TagsForm = ({ defaultValues, type }: CompProps) => {
  const _form = useAppForm<TagItemDto>({ defaultValues });

  return (
    <>
      <AccordionForm
        label={'Main info'}
        onSubmit={_form.handleSubmit(fData => {
          console.log('TagsForm', _.omit(fData, ['cmsConfigs']));
        })}
      >
        <InputLabel label={'Label'}>
          <InputText {..._form.register('label')} placeholder={t('Label')} />
        </InputLabel>

        <InputLabel label={'Icon Url'}>
          <InputText {..._form.register('iconUrl')} placeholder={'Icon irl'} />
        </InputLabel>
      </AccordionForm>

      <AccordionForm
        disabled={!defaultValues?._id}
        label={'Cms params'}
        onSubmit={_form.handleSubmit(fData => {
          console.log('TagsForm', _.pick(fData, ['_id', 'cmsConfigs']));
        })}
      >
        <InputLabel label={'Custom key'}>
          <InputText {..._form.register('cmsConfigs.key')} placeholder={t('Custom key')} />
        </InputLabel>

        <Text $padding={'12px 8px 0'} $size={15} $weight={500}>
          {t('Colors')}
        </Text>

        <FlexBox gap={12} fxDirection={'row'} alignItems={'self-end'}>
          <InputLabel label={'Font'}>
            <InputColor {..._form.register('colors.font')} />
          </InputLabel>

          <InputLabel label={'Border'}>
            <InputColor {..._form.register('colors.border')} />
          </InputLabel>

          <InputLabel label={'Background'}>
            <InputColor {..._form.register('colors.background')} />
          </InputLabel>
        </FlexBox>
      </AccordionForm>
    </>
  );
};

const TagsFormPlaceHolder = () => {
  return (
    <FlexBox flex={1} padding={'24px'} alignItems={'center'} gap={12}>
      <Text $weight={600} $size={15}>
        {'Component in development'}
      </Text>

      <SvgIcon icon={'info'} size={'45px'} />
    </FlexBox>
  );
};
type CompProps = { type: TagTypeEnum; defaultValues?: TagItemDto };
const tabs: PartialRecord<TagTypeEnum, React.FC<CompProps>> = {
  [TagTypeEnum.OFFER]: TagsForm,
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
