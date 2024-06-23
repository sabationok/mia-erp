import * as yup from 'yup';
import FormAfterSubmitOptions, { useAfterSubmitOptions } from '../../atoms/FormAfterSubmitOptions';
import { useAppForm } from '../../../hooks';
import { BankAccountFormData } from '../../../types/finances/bank-accounts.types';
import { yupResolver } from '@hookform/resolvers/yup';
import InputLabel from '../../atoms/Inputs/InputLabel';
import InputText from '../../atoms/Inputs/InputText';
import { toReqData } from '../../../utils';
import { t } from '../../../lang';
import { AppSubmitHandler } from '../../../hooks/useAppForm.hook';
import { Text } from '../../atoms/Text';
import { ToastService } from '../../../services';
import ModalBase, { ModalBaseProps } from '../../atoms/Modal';
import { AccordionForm, AccordionFormBaseProps } from '../../atoms/FormArea/AccordionForm';
import { useAppDispatch } from '../../../redux/store.store';
import {
  createBankAccountThunk,
  updateBankAccountThunk,
} from '../../../redux/finances/bank-accounts/bank-accounts.thunks';
import { BankAccountTypeFilterOptions } from '../../../data';
import { omit, pick } from 'lodash';
import { useLoaders } from '../../../Providers/Loaders/useLoaders.hook';
import TagButtonsFilter from '../../atoms/TagButtonsFilter';
import ButtonSwitch from '../../atoms/ButtonSwitch';

export interface FormCreateBankAccountProps extends ModalBaseProps {
  onSubmit?: AppSubmitHandler<BankAccountFormData>;
  defaultState?: BankAccountFormData;
}

const validation = yup.object().shape({
  label: yup.string().required(),
  description: yup.string().max(250).optional(),
});

type FormAreaName = keyof BankAccountFormData | 'main';
const FormCreateBankAccount: React.FC<FormCreateBankAccountProps> = ({ defaultState, onSubmit, ...props }) => {
  const submitOptions = useAfterSubmitOptions();
  const loaders = useLoaders<FormAreaName>();
  const dispatch = useAppDispatch();
  const {
    formState: { errors },
    register,
    handleSubmit,
    getFieldState,
    formValues,
    setValue,
  } = useAppForm<BankAccountFormData>({
    defaultValues: { ...defaultState },
    resolver: yupResolver(validation),
    reValidateMode: 'onSubmit',
  });

  const getOnSubmit = (name: FormAreaName) => {
    return ({ withMethod, ...fData }: BankAccountFormData) => {
      const submitData = name === 'main' ? omit(fData, 'bank') : pick(fData, ['_id', 'bank']);

      console.log(`[FormCreateBankAccount] [${name}]`, { defaultState, submitData, fData });

      if (!fData._id) {
        dispatch(
          createBankAccountThunk({
            data: { data: { data: toReqData(submitData), params: { withMethod } } },
            onLoading: loaders.onLoading(name),
            onSuccess: ({ data }) => {
              ToastService.success(`${data.label} created`);
              setValue('_id', data._id);
            },
          })
        );
      } else {
        dispatch(
          updateBankAccountThunk({
            data: { data: { data: toReqData(submitData) } },
            onLoading: loaders.onLoading(name),
            onSuccess: ({ data }) => {
              ToastService.success(`${data.label} updated`);
            },
          })
        );
      }
    };
  };

  const registerFormArea = (name: FormAreaName): AccordionFormBaseProps => {
    return {
      canSubmit: name === 'bank' ? getFieldState('bank').isDirty : true,
      disabled: name === 'bank' ? !formValues?._id : false,
      isLoading: name === 'bank' ? loaders.isLoading.bank : loaders.isLoading.main,
      onSubmit: handleSubmit(getOnSubmit(name)),
    };
  };

  return (
    <ModalBase {...props}>
      <AccordionForm label={'Main info'} {...registerFormArea('main')}>
        <InputLabel label={t('label')} error={errors.label} required>
          <InputText placeholder={t('insertLabel')} {...register('label')} required autoFocus />
        </InputLabel>

        <InputLabel label={t('IBAN')} error={errors.iban} required>
          <InputText placeholder={t('IBAN')} {...register('iban')} required />
        </InputLabel>

        <InputLabel label={t('Account holder')} error={errors.holder}>
          <InputText placeholder={t('Holder')} {...register('holder')} />
        </InputLabel>

        <InputLabel label={t('Tax ID')} error={errors.taxCode}>
          <InputText placeholder={t('Tax ID')} {...register('taxCode')} />
        </InputLabel>

        <InputLabel label={t('Select type')} error={errors.type}>
          <TagButtonsFilter
            options={BankAccountTypeFilterOptions}
            value={formValues.type ?? undefined}
            onSelect={option => {
              option.value && setValue('type', option.value, { shouldTouch: true, shouldDirty: true });
            }}
          />
        </InputLabel>

        {!formValues._id && (
          <InputLabel label={t('Create method')}>
            <ButtonSwitch
              value={formValues.withMethod}
              onChange={v => {
                setValue('withMethod', v);
              }}
            />
          </InputLabel>
        )}
      </AccordionForm>

      <AccordionForm label={'Bank details'} {...registerFormArea('bank')}>
        <Text $size={12} $weight={600} $padding={'8px'}>
          {t('Bank details')}
        </Text>

        <InputLabel label={t('label')} error={errors.bank?.label}>
          <InputText placeholder={t('insertLabel')} {...register('bank.label')} />
        </InputLabel>

        <InputLabel label={t('Country')} error={errors.bank?.label}>
          <InputText placeholder={t('Country')} {...register('bank.country')} />
        </InputLabel>

        <InputLabel label={t('Tax ID')} error={errors.bank?.taxCode}>
          <InputText placeholder={t('Tax ID')} {...register('bank.taxCode')} />
        </InputLabel>
      </AccordionForm>

      <FormAfterSubmitOptions {...submitOptions} />
    </ModalBase>
  );
};

export default FormCreateBankAccount;
