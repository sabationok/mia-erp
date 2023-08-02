import ModalForm, { ModalFormProps } from 'components/ModalForm';
import { ICustomRole } from 'redux/customRoles/customRoles.types';
import styled from 'styled-components';
import InputLabel from '../atoms/Inputs/InputLabel';
import InputText from '../atoms/Inputs/InputText';
import TextareaPrimary from '../atoms/Inputs/TextareaPrimary';
import FlexBox from '../atoms/FlexBox';
import { useAppForm } from '../../hooks';
import { SubmitErrorHandler, SubmitHandler } from 'react-hook-form';
import { useAppSettingsSelector } from '../../redux/selectors.store';
import { useEffect, useMemo } from 'react';
import TitleBase from '../atoms/TitleBase';
import CheckBox from '../TableList/TebleCells/CellComponents/CheckBox';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import translate from '../../lang';
import { FieldValues } from 'react-hook-form/dist/types';
import { AppErrorSubmitHandler, AppSubmitHandler } from '../../hooks/useAppForm.hook';
import FormAfterSubmitOptions from './components/FormAfterSubmitOptions';

export interface FormCreateCustomRoleProps extends Omit<ModalFormProps, 'onSubmit'> {
  _id?: string;
  edit?: boolean;
  customRole?: Partial<ICustomRole>;
  onSubmit: AppSubmitHandler<Partial<ICustomRole>>;
  onErrorSubmit?: AppErrorSubmitHandler<Partial<ICustomRole>>;
}

const validation = yup.object().shape({
  label: yup.string().required(),
  actions: yup.array(yup.string()).required(),
  expireAt: yup.string().optional(),
  description: yup.string(),
});
const FormCreateCustomRole: React.FC<FormCreateCustomRoleProps> = ({ onSubmit, customRole, edit, _id, ...props }) => {
  const { appActions } = useAppSettingsSelector();

  const {
    formState: { errors, isValid },
    register,
    handleSubmit,
    setValue,
    formValues,
    clearAfterSave,
    closeAfterSave,
    toggleAfterSubmitOption,
  } = useAppForm<Partial<ICustomRole>>({
    defaultValues: customRole,
    reValidateMode: 'onChange',
    resolver: yupResolver(validation),
  });

  function onSubmitWrapper<D extends FieldValues = any>(submitHandler: AppSubmitHandler<D>) {
    if (!submitHandler) return;
    const onValidSubmit: SubmitHandler<Partial<ICustomRole>> = data =>
      onSubmit(data, {
        clearAfterSave,
        closeAfterSave,
      });

    const onInvalidSubmit: SubmitErrorHandler<Partial<ICustomRole>> = errors => console.log(errors);
    return handleSubmit(onValidSubmit, onInvalidSubmit);
  }
  useEffect(() => {
    console.log(formValues);
  }, [formValues]);

  const renderList = useMemo(() => {
    return Object.entries(appActions).map(([name, value]) => {
      // const arr=enumToArray()
      return (
        <List key={name}>
          <TitleBase>{name}</TitleBase>

          <List>
            {value.map(el => (
              <ListItem key={el?.type}>
                <CheckBox
                  onChange={customEvent => {
                    if (Array.isArray(formValues.actions)) {
                      customEvent.checked
                        ? setValue('actions', el.value ? [...formValues.actions, el.value] : formValues.actions)
                        : setValue(
                            'actions',
                            formValues.actions.filter(r => r !== el.type)
                          );
                    }
                  }}
                  checked={formValues.actions?.some(r => r === el.type)}
                />

                <Field flex={'1'} justifyContent={'center'} padding={'0 12px'}>
                  {el?.type}
                </Field>
              </ListItem>
            ))}
          </List>
        </List>
      );
    });
  }, [appActions, formValues.actions, setValue]);

  return (
    <StModalForm
      fillHeight
      {...props}
      onSubmit={onSubmitWrapper(onSubmit)}
      isValid={isValid}
      extraFooter={
        <FormAfterSubmitOptions
          toggleOption={toggleAfterSubmitOption}
          clearAfterSave={clearAfterSave}
          closeAfterSave={closeAfterSave}
        />
      }
    >
      <FlexBox alignItems={'unset'} flex={'1'} overflow={'hidden'}>
        <FlexBox padding={'12px'}>
          <InputLabel label={translate('label')} direction={'vertical'} required error={errors.label}>
            <InputText placeholder={translate('insertLabel')} {...register('label')} required />
          </InputLabel>

          <InputLabel label={translate('dateAndTime')} direction={'vertical'}>
            <InputText placeholder={translate('dateAndTime')} type="datetime-local" {...register('expireAt')} />
          </InputLabel>

          <InputLabel label={'Коментар'} direction={'vertical'}>
            <TextareaPrimary placeholder="Введіть короткий коментар" {...register('description')} />
          </InputLabel>
        </FlexBox>

        <FlexBox padding={'12px'} gap={8} flex={'1'} fillHeight justifyContent={'flex-start'} overflow={'auto'}>
          <List>{renderList}</List>
        </FlexBox>
      </FlexBox>
    </StModalForm>
  );
};
const StModalForm = styled(ModalForm)`
  min-height: 250px;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ListItem = styled.li`
  display: grid;
  grid-template-columns: 26px 1fr;
  gap: 8px;

  height: 26px;
`;
const Field = styled(FlexBox)`
  border-radius: 2px;
  background-color: ${({ theme }) => theme.field.backgroundColor};
`;

export default FormCreateCustomRole;
