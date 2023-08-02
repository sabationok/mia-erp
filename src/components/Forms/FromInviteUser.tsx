import ModalForm, { ModalFormProps } from '../ModalForm';
import FlexBox from '../atoms/FlexBox';
import InputLabel from '../atoms/Inputs/InputLabel';
import { useAppForm } from '../../hooks';
import { ICustomRole } from '../../redux/customRoles/customRoles.types';
import { AppSubmitHandler } from '../../hooks/useAppForm.hook';
import { useCustomRolesSelector } from '../../redux/selectors.store';
import CustomSelect from '../atoms/Inputs/CustomSelect';
import InputText from '../atoms/Inputs/InputText';
import { IPermission } from '../../redux/permissions/permissions.types';

export interface FormInviteUserProps extends Omit<ModalFormProps<any, any, IPermission>, 'onSubmit'> {
  onSubmit?: AppSubmitHandler<FormInviteUserData>;
}

export interface FormInviteUserData {
  email: string;
  role?: ICustomRole;
}
const FormInviteUser: React.FC<FormInviteUserProps> = ({ defaultState, onSubmit, ...props }) => {
  const roles = useCustomRolesSelector().customRoles;
  const {
    registerSelect,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useAppForm<FormInviteUserData>({ defaultValues: defaultState });

  const onValidSubmit = () => {};
  return (
    <ModalForm isValid={isValid} {...props} onSubmit={handleSubmit(onValidSubmit)}>
      <FlexBox fillWidth padding={'16px'}>
        <InputLabel label={'Емейл'} error={errors.email} required>
          <InputText
            {...register('email', { required: true })}
            type={'email'}
            placeholder={'Впишіть емейл для запрошення'}
            required
            autoFocus
          />
        </InputLabel>

        <InputLabel label={'Роль'} error={errors.role}>
          <CustomSelect {...registerSelect('role', { options: roles, placeholder: 'Оберіть роль для користувача' })} />
        </InputLabel>
      </FlexBox>
    </ModalForm>
  );
};

export default FormInviteUser;
