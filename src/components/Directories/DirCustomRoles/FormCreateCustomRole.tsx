import InputTextPrimary from 'components/atoms/Inputs/InputTextPrimary';
import ModalForm, { ModalFormProps } from 'components/ModalForm/ModalForm';
import { ICustomRole } from 'data/roles.types';
import { useState } from 'react';
import styled from 'styled-components';

export interface FormCreateCustomRoleProps extends Omit<ModalFormProps, 'onSubmit'> {
  _id?: string;
  edit?: boolean;
  customRole?: ICustomRole;
  getCustomeRoleByName?: (name: string) => string | undefined;
  onSubmit: (_id: string, data: Partial<ICustomRole>) => void;
}

const FormCreateCustomRole: React.FC<FormCreateCustomRoleProps> = ({
  onSubmit,
  getCustomeRoleByName,
  customRole,
  edit,
  _id,
  ...props
}) => {
  const [formData, setFormData] = useState<Partial<ICustomRole>>(customRole ? customRole : {});
  // ! setFormData

  function handleFormSubmit() {
    onSubmit && _id && onSubmit(_id, formData);
  }

  function onChange(ev: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = ev.target;
    getCustomeRoleByName && getCustomeRoleByName(value);

    setFormData(prev => ({ ...prev, [name]: value }));
  }
  return (
    <StModalForm {...props} onSubmit={handleFormSubmit}>
      <InputTextPrimary
        value={formData.label ? formData.label : ''}
        name="label"
        placeholder="Введіть назву ролі"
        onChange={onChange}
      />

      <ActionsList>
        <span>{formData?._id}</span>
        <span>{formData?.label || formData?.name}</span>
        <span>{formData?.descr}</span>
      </ActionsList>
    </StModalForm>
  );
};

const StModalForm = styled(ModalForm)`
  min-height: 250px;
`;
const ActionsList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  justify-content: center;

  height: 100%;
`;

export default FormCreateCustomRole;
