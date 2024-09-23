import ModalForm from 'components/ModalForm';
import { FinAccountEntity, FinAccountFormData, FinAccountsTypeEnum } from 'types/finances/fin-accounts.types';
import React from 'react';
import translate, { t } from '../../../i18e';
import InputLabel from '../../atoms/Inputs/InputLabel';
import InputText from '../../atoms/Inputs/InputText';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { DirectoriesFormProps } from '../../../types/dir.types';
import { useAppForm } from '../../../hooks';
import { AppSubmitHandler } from '../../../hooks/useAppForm.hook';
import { pick } from 'lodash';
import FormAfterSubmitOptions, { useAfterSubmitOptions } from '../../atoms/FormAfterSubmitOptions';
import { ApiDirType } from '../../../redux/APP_CONFIGS';
import { FormInputs } from '../components/atoms';
import { IsEnum, IsString255, IsString64, IsUUID } from '../../../schemas';
import { CurrencyCode } from '../../../types/utils.types';

export interface FormCreateFinAccountProps
  extends DirectoriesFormProps<ApiDirType.COUNTS, FinAccountEntity, FinAccountFormData> {}

const finAccountDtoSchema: yup.ObjectSchema<FinAccountFormData> = yup.object().shape({
  _id: IsUUID(),
  parentId: IsUUID(),
  label: IsString255().required(),
  // description:  IsString255().optional(),
  dirType: IsEnum(ApiDirType).required(),
  code: IsString64(),
  type: IsEnum(FinAccountsTypeEnum),
  status: IsEnum({}),
  currency: IsEnum(CurrencyCode),
  balance: IsString64(),
});
const FormCreateCount: React.FC<FormCreateFinAccountProps> = ({
  parent,
  create,
  type,
  data,
  edit,
  _id,
  onSubmit,
  ...props
}) => {
  const submitOptions = useAfterSubmitOptions();

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useAppForm<FinAccountFormData>({
    defaultValues: (parent?._id
      ? {
          ...data,
          type,
          parent: pick(parent, '_id'),
          parentId: parent?._id,
        }
      : {
          ...data,
          type,
        }) as FinAccountFormData,
    resolver: yupResolver(finAccountDtoSchema, { stripUnknown: true }),
    reValidateMode: 'onSubmit',
  });

  function formEventWrapper(evHandler?: AppSubmitHandler<FinAccountFormData>) {
    if (evHandler) {
      return handleSubmit(data =>
        evHandler(data, {
          ...submitOptions.state,
        })
      );
    }
  }

  return (
    <ModalForm
      onSubmit={formEventWrapper(onSubmit)}
      {...props}
      extraFooter={<FormAfterSubmitOptions {...submitOptions} />}
    >
      <FormInputs>
        <InputLabel label={t('type')} direction={'vertical'} error={errors.type} disabled>
          <InputText placeholder={type ? translate(type) : type} disabled />
        </InputLabel>

        {parent && (
          <InputLabel label={t('parentItem')} direction={'vertical'} disabled>
            <InputText placeholder={parent?.label ?? ''} disabled />
          </InputLabel>
        )}

        <InputLabel label={t('label')} direction={'vertical'} error={errors.label}>
          <InputText placeholder={translate('insertLabel')} {...register('label')} autoFocus />
        </InputLabel>

        <InputLabel label={t('startBalance')} direction={'vertical'} error={errors.balance}>
          <InputText placeholder={translate('insertStartBalance')} {...register('balance')} type="number" />
        </InputLabel>

        <InputLabel label={t('currency')} direction={'vertical'} error={errors.currency} disabled>
          <InputText placeholder={translate('selectCurrency')} {...register('currency')} disabled />
        </InputLabel>

        {/*<InputLabel label={t('comment')} direction={'vertical'} error={errors.description}>*/}
        {/*  <TextareaPrimary placeholder={t('insertComment')} {...register('description')} maxLength={250} />*/}
        {/*</InputLabel>*/}
      </FormInputs>
    </ModalForm>
  );
};

export default FormCreateCount;
