import ModalForm, { ModalFormProps } from 'components/ModalForm';
import { ICustomRole } from 'redux/customRoles/customRoles.types';
import styled from 'styled-components';
import InputLabel from '../../atoms/Inputs/InputLabel';
import InputText from '../../atoms/Inputs/InputText';
import TextareaPrimary from '../../atoms/Inputs/TextareaPrimary';
import FlexBox from '../../atoms/FlexBox';
import { useAppForm } from '../../../hooks';
import { SubmitErrorHandler, SubmitHandler } from 'react-hook-form';
import { useCustomRolesSelector } from '../../../redux/selectors.store';
import { useCallback, useEffect, useMemo } from 'react';
import CheckBox from '../../TableList/TebleCells/CellComponents/CheckBox';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import translate, { getTranslatedString } from '../../../i18e';
import { FieldValues } from 'react-hook-form/dist/types';
import { AppErrorSubmitHandler, AppSubmitHandler } from '../../../hooks/useAppForm.hook';
import FormAfterSubmitOptions, { useAfterSubmitOptions } from '../../atoms/FormAfterSubmitOptions';
import { ServiceName, useAppServiceProvider } from '../../../hooks/useAppServices.hook';
import { Text } from '../../atoms/Text';

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
  const { modules } = useCustomRolesSelector();
  const service = useAppServiceProvider()[ServiceName.roles];
  const submitOptions = useAfterSubmitOptions();
  const {
    formState: { errors, isValid },
    register,
    handleSubmit,
    setValue,
    formValues,
  } = useAppForm<ICustomRole>({
    defaultValues: { ...customRole, actions: customRole?.actions || [] },
    reValidateMode: 'onChange',
    resolver: yupResolver(validation),
  });

  function onSubmitWrapper<D extends FieldValues = any>(submitHandler: AppSubmitHandler<D>) {
    if (!submitHandler) return;
    const onValidSubmit: SubmitHandler<Partial<ICustomRole>> = data =>
      onSubmit(data, {
        ...submitOptions.state,
      });

    const onInvalidSubmit: SubmitErrorHandler<Partial<ICustomRole>> = errors => console.log(errors);
    return handleSubmit(onValidSubmit, onInvalidSubmit);
  }

  // const handleSelectActions = (value: string) => {
  //   setValue('actions', value ? [...(formValues?.actions || []), value] : formValues.actions);
  // };
  // const handleRemoveAction = (value: string) => {
  //   setValue(
  //     'actions',
  //     formValues.actions?.filter(r => r !== value)
  //   );
  // };

  const handleUpdateActions = useCallback(
    (value: string) => {
      const remove = formValues.actions.includes(value);

      if (remove) {
        setValue(
          'actions',
          formValues.actions?.filter(r => r !== value)
        );
      } else {
        setValue('actions', value ? [...(formValues.actions || []), value] : formValues.actions);
      }
    },
    [formValues, setValue]
  );

  useEffect(() => {
    if (modules.length === 0) {
      service.getAllActions();
    }
    // eslint-disable-next-line
  }, []);

  const renderList = useMemo(() => {
    return modules.map(module => {
      return (
        <List key={module.label}>
          <Text $weight={600} $textTransform={'uppercase'} style={{ padding: '4px 8px' }}>
            {getTranslatedString(module.labels)}
          </Text>

          <List gap={8} padding={'8px 2px 8px'}>
            {module.actions?.map(action => (
              <ListItem key={action?.type}>
                <CheckBox
                  onChange={ev => {
                    console.log(ev.checked);
                    action.type && handleUpdateActions(action.type);
                  }}
                  checked={action.type && formValues.actions?.includes(action.type)}
                />

                <Field flex={'1'} justifyContent={'center'}>
                  <Text $weight={400} $size={12}>
                    {getTranslatedString(action.labels)}
                  </Text>
                </Field>
              </ListItem>
            ))}
          </List>
        </List>
      );
    });
  }, [formValues.actions, handleUpdateActions, modules]);

  return (
    <StModalForm
      fillHeight
      {...props}
      onSubmit={onSubmitWrapper(onSubmit)}
      isValid={isValid}
      extraFooter={<FormAfterSubmitOptions {...submitOptions} />}
    >
      <FlexBox alignItems={'unset'} flex={'1'} overflow={'hidden'}>
        <FlexBox
          padding={'0 0 8px'}
          style={{ boxShadow: '0 5px 6px rgba(0, 0, 0, 0.1)', position: 'relative', zIndex: 20 }}
        >
          <FlexBox fillWidth fxDirection={'row'} gap={8}>
            <InputLabel label={translate('label')} required error={errors.label}>
              <InputText placeholder={translate('insertLabel')} {...register('label')} required />
            </InputLabel>

            <InputLabel label={translate('dateAndTime')}>
              <InputText placeholder={translate('dateAndTime')} type="datetime-local" {...register('expireAt')} />
            </InputLabel>
          </FlexBox>

          <InputLabel label={'Коментар'}>
            <TextareaPrimary placeholder="Введіть короткий коментар" {...register('description')} />
          </InputLabel>
        </FlexBox>

        <FlexBox padding={'8px 0'} gap={8} flex={'1'} fillHeight justifyContent={'flex-start'} overflow={'auto'}>
          <List padding={'8px 0'}>{renderList}</List>
        </FlexBox>
      </FlexBox>
    </StModalForm>
  );
};
const StModalForm = styled(ModalForm)`
  min-height: 250px;
`;

const List = styled.ul<{ gap?: number; padding?: string }>`
  display: flex;
  flex-direction: column;
  gap: ${p => p.gap || 0}px;

  padding: ${p => p.padding};

  border-top: 1px solid ${({ theme }) => theme.field.backgroundColor};
`;

const ListItem = styled.li`
  display: grid;
  grid-template-columns: 26px 1fr;
  gap: 8px;

  align-items: center;

  min-height: 28px;
`;
const Field = styled(FlexBox)`
  position: static;
  z-index: 0;

  height: 100%;
  padding: 4px 8px;
  border-radius: 2px;
  background-color: ${({ theme }) => theme.modalBackgroundColor};
  border: 1px solid ${({ theme }) => theme.field.backgroundColor};
`;

export default FormCreateCustomRole;
