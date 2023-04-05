import React from 'react';
import ModalForm, { FilterOpt, ModalFormProps } from 'components/ModalForm/ModalForm';
import DirList from '../DirList/DirList';
// import { founder } from 'utils';
import styled from 'styled-components';
import { CountType } from 'data/counts.types';
import { useModalProvider } from 'components/ModalProvider/ModalProvider';
import useCustomRolesService from 'redux/customRoles/useCustomRolesServise.hook';
import FormCreateCustomRole from './FormCreateCustomRole';

export type CustomRoleFilterOpt = FilterOpt<CountType>;
export interface DirCustomRolesProps extends ModalFormProps {
  title: string;
}

const DirCustomRoles: React.FC<DirCustomRolesProps> = props => {
  const modal = useModalProvider();
  const { customRoles, create, editById, deleteById, getById } = useCustomRolesService();

  function onEdit(_id: string) {
    modal.handleOpenModal({
      ModalChildren: FormCreateCustomRole,
      modalChildrenProps: {
        title: 'Редагувати роль',
        _id,
        customRole: getById(_id),
        onSubmit: editById,
      },
    });
  }
  function onCreateParent() {
    modal.handleOpenModal({
      ModalChildren: FormCreateCustomRole,
      modalChildrenProps: {
        title: 'Створити роль',
        onSubmit: (data: any) => {
          create(data);
        },
      },
    });
  }

  return (
    <StModalForm {...props}>
      <Box>
        <DirList
          onDelete={deleteById}
          onEdit={onEdit}
          createParentTitle="Свторити роль"
          onCreateParent={onCreateParent}
          // list={[...customRoles, ...customRoles, ...customRoles, ...customRoles]}
          list={customRoles}
        />
      </Box>
    </StModalForm>
  );
};

const StModalForm = styled(ModalForm)`
  height: 70vh;
  @media screen and (max-height: 480px) {
    height: 95vh;
  }
`;
const Box = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
  max-height: 100%;
  padding: 0 12px;
`;

export default DirCustomRoles;
