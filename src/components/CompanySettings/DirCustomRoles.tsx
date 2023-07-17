import React from 'react';
import ModalForm, { ModalFormProps } from 'components/ModalForm';
import DirList from '../Directories/DirList/DirList';

import styled from 'styled-components';
import { useModalProvider } from 'components/ModalProvider/ModalProvider';
import useCustomRolesService from 'redux/customRoles/useCustomRolesServise.hook';
import FormCreateCustomRole from '../Forms/FormCreateCustomRole';
import FlexBox from '../atoms/FlexBox';
import { useCustomRolesSelector } from '../../redux/selectors.store';

export interface DirCustomRolesProps extends ModalFormProps {
  title: string;
}

const DirCustomRoles: React.FC<DirCustomRolesProps> = props => {
  const modal = useModalProvider();
  const { customRoles } = useCustomRolesSelector();
  const { create, edit } = useCustomRolesService();

  function onEdit(_id: string) {
    modal.handleOpenModal({
      ModalChildren: FormCreateCustomRole,
      modalChildrenProps: {
        title: 'Редагувати роль',
        _id,
        customRole: customRoles.find(el => el._id === _id),
        onSubmit: d => {
          edit && edit();
        },
      },
    });
  }

  function onCreateParent() {
    modal.handleOpenModal({
      ModalChildren: FormCreateCustomRole,
      modalChildrenProps: {
        title: 'Створити роль',
        onSubmit: (data: any) => {
          create && create();
        },
      },
    });
  }

  return (
    <StModalForm {...props}>
      <FlexBox fillWidth flex={'1'} padding={'0 12px'} maxHeight={'100%'}>
        <DirList
          onEdit={onEdit}
          createParentTitle="Свторити роль"
          onCreateParent={onCreateParent}
          // list={[...customRoles, ...customRoles, ...customRoles, ...customRoles]}
          list={customRoles}
        />
      </FlexBox>
    </StModalForm>
  );
};

const StModalForm = styled(ModalForm)`
  height: 70vh;
  @media screen and (max-height: 480px) {
    height: 95vh;
  }
`;

export default DirCustomRoles;
