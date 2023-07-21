import ModalForm, { ModalFormProps } from 'components/ModalForm';
import { ICustomRole } from 'redux/customRoles/customRoles.types';
import styled from 'styled-components';
import InputLabel from '../atoms/Inputs/InputLabel';
import InputText from '../atoms/Inputs/InputText';
import TextareaPrimary from '../atoms/Inputs/TextareaPrimary';
import FlexBox from '../atoms/FlexBox';
import useAppForm from '../../hooks/useAppForm.hook';
import { SubmitHandler } from 'react-hook-form';
import { useAppSettingsSelector } from '../../redux/selectors.store';
import { useMemo } from 'react';
import TitleBase from '../atoms/TitleBase';
import CheckBox from '../TableList/TebleCells/CellComponents/CheckBox';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export interface FormCreateCustomRoleProps extends Omit<ModalFormProps, 'onSubmit'> {
  _id?: string;
  edit?: boolean;
  customRole?: Partial<ICustomRole>;
  onSubmit: SubmitHandler<Partial<ICustomRole>>;
}

const validation = yup.object().shape({
  label: yup.string().required(),
  actions: yup.array(yup.string()).required(),
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
  } = useAppForm<Partial<ICustomRole>>({
    defaultValues: customRole,
    reValidateMode: 'onChange',
    resolver: yupResolver(validation),
  });

  function onSubmitWrapper(submitHandler?: SubmitHandler<Partial<ICustomRole>>) {
    return submitHandler ? handleSubmit(submitHandler) : undefined;
  }

  const renderList = useMemo(() => {
    return Object.entries(appActions).map(([name, value]) => {
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
                        ? setValue('actions', [...formValues.actions, el])
                        : setValue(
                            'actions',
                            formValues.actions.filter(r => r.type !== el.type)
                          );
                    } else {
                      setValue('actions', [el]);
                    }
                  }}
                  checked={formValues.actions?.some(r => r.type === el.type)}
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
  }, [appActions]);

  return (
    <StModalForm fillHeight {...props} onSubmit={onSubmitWrapper(onSubmit)} isValid={isValid}>
      <FlexBox alignItems={'unset'} flex={'1'} overflow={'hidden'}>
        <FlexBox padding={'12px'}>
          <InputLabel label="Назва" direction={'vertical'} required error={errors.label}>
            <InputText placeholder="Введіть назву ролі" {...register('label')} required />
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
