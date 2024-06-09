import { DirectoriesFormProps, ITagDirItem } from '../../../types/dir.types';
import ModalForm from '../../ModalForm';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import InputLabel from '../../atoms/Inputs/InputLabel';
import { t } from '../../../lang';
import InputText from '../../atoms/Inputs/InputText';
import React from 'react';
import { useAppForm } from '../../../hooks';
import FormAfterSubmitOptions, { useAfterSubmitOptions } from '../../atoms/FormAfterSubmitOptions';
import { AppSubmitHandler } from '../../../hooks/useAppForm.hook';
import { ApiDirType } from '../../../redux/APP_CONFIGS';
import { FormInputs } from '../components/atoms';
import TagButtonsFilter from 'components/atoms/TagButtonsFilter';
import { tagsFilterOptions } from '../../../data/modalFilterOptions.data';
import { TagTypeEnum } from '../../../types/directories.types';

export interface FormCreateTagProps extends DirectoriesFormProps<ApiDirType.TAGS, ITagDirItem, ITagDirItem> {}

const validation = yup.object().shape({
  type: yup.string().required(),
  label: yup.string().max(100).min(3).required(),
});

const FormCreateTag: React.FC<FormCreateTagProps> = ({
  options = tagsFilterOptions,
  onSubmit,
  type,
  parent,
  data,
  defaultState,
  ...props
}) => {
  const submitOptions = useAfterSubmitOptions();
  const {
    formState: { errors, isValid },
    register,
    handleSubmit,
    setValue,

    formValues,
  } = useAppForm<ITagDirItem>({
    defaultValues: {
      ...data,
      ...defaultState,
      type,
    },
    resolver: yupResolver(validation),
    reValidateMode: 'onChange',
  });

  // const handleFilterSelect = useCallback(
  //   (option: FilterOption<ContractorsTypesEnum>) => {
  //     setValue('type', option?.value);
  //   },
  //   [setValue]
  // );

  function formEventWrapper(evHandler?: AppSubmitHandler<ITagDirItem>) {
    if (evHandler) {
      return handleSubmit(data => evHandler(data, { ...submitOptions.state }));
    }
  }

  return (
    <ModalForm
      {...props}
      title={t('Create tag')}
      onSubmit={formEventWrapper(onSubmit)}
      isValid={isValid}
      extraFooter={<FormAfterSubmitOptions {...submitOptions} />}
    >
      <FormInputs>
        <TagButtonsFilter<TagTypeEnum>
          options={options}
          name={'type'}
          onSelectValue={({ name, value }) => setValue(name, value)}
          values={formValues.type ? [formValues.type] : undefined}
        />

        <InputLabel label={t('label')} direction={'vertical'} error={errors.label} required>
          <InputText placeholder={t('insertLabel')} {...register('label')} required autoFocus />
        </InputLabel>
      </FormInputs>
    </ModalForm>
  );
};

export default FormCreateTag;
