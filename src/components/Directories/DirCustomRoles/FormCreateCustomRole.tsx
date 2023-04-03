import ModalForm, { ModalFormProps } from 'components/ModalForm/ModalForm';
import { ICustomRole } from 'data/roles.types';
import { useState } from 'react';
import styled from 'styled-components';

export interface FormCreateCustomRoleProps extends ModalFormProps {
  _id?: string;
  edit?: boolean;
  customRole?: ICustomRole;
}

const FormCreateCustomRole: React.FC<FormCreateCustomRoleProps> = ({ customRole, edit, _id, ...props }) => {
  const [formData, setFormData] = useState(customRole);
  console.log('FormCreateCustomRole', { customRole, edit, _id, props });
  return (
    <StModalForm {...props}>
      <ActionsList>
        <span>{formData?._id}</span>
        <span>{formData?.label || formData?.name}</span>
        <span>{formData?.descr}</span>
      </ActionsList>
    </StModalForm>
  );
};

const StModalForm = styled(ModalForm)`
  min-height: 150px;
  min-width: 200px;
`;
const ActionsList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;

  height: 100%;
`;

export default FormCreateCustomRole;
