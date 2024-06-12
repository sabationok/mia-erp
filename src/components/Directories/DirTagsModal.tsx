import { CreatedModal } from '../../Providers/ModalProvider/ModalProvider';
import ModalBase from '../atoms/Modal';
import TagButtonsFilter from '../atoms/TagButtonsFilter';
import { tagsFilterOptions } from '../../data/modalFilterOptions.data';
import { FlexForm } from '../atoms/FlexBox';
import { TagTypeEnum } from '../../types/directories.types';
import { PartialRecord } from '../../types/utils.types';
import { useAppForm } from '../../hooks';
import { AccordionFormArea } from '../atoms/FormArea/AccordionForm';
import { TagItemDto } from '../../types/tags.types';
import { useEffect } from 'react';

export interface DirTagsModalProps extends CreatedModal {}

const DirTagsModal = ({}: {}) => {
  const _form = useAppForm<{ selectedTags: string[] }>();
  useEffect(() => {
    console.log(_form.formValues);
  }, [_form.formValues]);
  return (
    <ModalBase title={'Tags directory'} fillHeight>
      <AccordionFormArea expandable={false} isOpen hideFooter label={'Select type'}>
        <TagButtonsFilter options={tagsFilterOptions} {..._form.registerIdsToggler('selectedTags')} />
      </AccordionFormArea>

      <FlexForm padding={'8px 16px'}></FlexForm>
    </ModalBase>
  );
};

const TagsForm = ({ defaultValues }: CompProps & { defaultValues?: TagItemDto }) => {
  const _form = useAppForm<TagItemDto>({ defaultValues });

  return (
    <FlexForm
      onSubmit={_form.handleSubmit(fData => {
        console.log('TagsForm', fData);
      })}
    ></FlexForm>
  );
};

type CompProps = { type: TagTypeEnum };
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
