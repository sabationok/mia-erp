import React, { useMemo } from 'react';
import ModalForm from 'components/ModalForm';
import DirList from '../Directories/DirList/DirList';
import styled from 'styled-components';
import { useModalProvider } from 'components/ModalProvider/ModalProvider';
import useCustomRolesService, { CustomRolesService } from 'hooks/useCustomRolesServise.hook';
import FlexBox from '../atoms/FlexBox';
import { useCustomRolesSelector } from '../../redux/selectors.store';

import { DirInTreeActionsCreatorOptions, IDirInTreeProps } from '../Directories/dir.types';
import { ICustomRole } from '../../redux/customRoles/customRoles.types';

export interface DirCustomRolesProps
  extends Omit<IDirInTreeProps<any, any, ICustomRole, ICustomRole, ICustomRole>, 'actionsCreator'> {
  actionsCreator: (
    options: DirInTreeActionsCreatorOptions<any, any, ICustomRole, ICustomRole, ICustomRole, CustomRolesService>
  ) => {
    onCreateChild?: (parentId: string) => void;
    onCreateParent?: () => void;
    onUpdateItem?: (id: string) => void;
    onDeleteItem?: (id: string) => void;
    onChangeArchiveStatus?: (id: string, status?: boolean) => void;
  };
}

const DirCustomRoles: React.FC<DirCustomRolesProps> = ({ createParentTitle, actionsCreator, dirType, ...props }) => {
  const { customRoles } = useCustomRolesSelector();
  const service = useCustomRolesService();
  const modalService = useModalProvider();

  const actions = useMemo(() => {
    const findById = (id: string) => customRoles.find(el => el._id === id);
    return actionsCreator
      ? actionsCreator({
          findById,
          modalService,
          service,
          dirType,
        })
      : {};
  }, [actionsCreator, modalService, service, customRoles]);

  return (
    <StModalForm {...props}>
      <FlexBox fillWidth flex={'1'} padding={'0 12px'} maxHeight={'100%'}>
        <DirList
          list={customRoles}
          createParentTitle={createParentTitle}
          onEdit={actions?.onUpdateItem}
          onDelete={actions?.onDeleteItem}
          onChangeArchiveStatus={actions?.onChangeArchiveStatus}
          onCreateParent={actions?.onCreateParent}
        />
      </FlexBox>
    </StModalForm>
  );
};

const StModalForm = styled(ModalForm)``;

export default DirCustomRoles;
