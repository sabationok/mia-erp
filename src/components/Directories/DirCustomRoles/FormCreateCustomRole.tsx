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

  function onSubmitWrapper() {
    onSubmit && _id && onSubmit(_id, formData);
  }

  function onChange(ev: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = ev.target;
    getCustomeRoleByName && getCustomeRoleByName(value);

    setFormData(prev => ({ ...prev, [name]: value }));
  }
  return (
    <StModalForm {...props} onSubmit={onSubmitWrapper}>
      <Inputs>
        <InputTextPrimary
          value={formData.label ? formData.label : ''}
          label="Назва"
          name="label"
          placeholder="Введіть назву ролі"
          onChange={onChange}
        />

        <InputTextPrimary
          value={formData.descr ? formData.descr : ''}
          label="Коментар"
          name="descr"
          placeholder="Введіть короткий коментар до ролі"
          onChange={onChange}
        />

        <ActionsList>
          {formData.actions?.map((act, idx) => (
            <li key={idx}>{act}</li>
          ))}
        </ActionsList>
      </Inputs>
    </StModalForm>
  );
};

const StModalForm = styled(ModalForm)`
  min-height: 250px;
`;
const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  padding: 12px;
`;
const ActionsList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  justify-content: center;

  height: 100%;
`;

export default FormCreateCustomRole;
