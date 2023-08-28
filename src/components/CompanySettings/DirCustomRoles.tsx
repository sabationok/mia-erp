import React, { useMemo } from 'react';
import ModalForm from 'components/ModalForm';
import DirList from '../Directories/DirList/DirList';
import styled from 'styled-components';
import { useModalProvider } from 'components/ModalProvider/ModalProvider';
import useCustomRolesService, { CustomRolesService } from 'hooks/useCustomRolesServise.hook';
import FlexBox from '../atoms/FlexBox';
import { useCustomRolesSelector } from '../../redux/selectors.store';

import { IDirInTreeProps } from '../Directories/dir.types';
import { ICustomRole } from '../../redux/customRoles/customRoles.types';
import { ApiDirType } from '../../redux/APP_CONFIGS';

export interface DirCustomRolesProps
  extends IDirInTreeProps<any, any, ICustomRole, ICustomRole, ICustomRole, CustomRolesService> {}

const DirCustomRoles: React.FC<DirCustomRolesProps> = ({ createParentTitle, actionsCreator, ...props }) => {
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
          dirType: ApiDirType.DEFAULT,
        })
      : {};
  }, [actionsCreator, modalService, service, customRoles]);

  return (
    <StModalForm {...props}>
      <FlexBox fillWidth flex={'1'} padding={'0'} maxHeight={'100%'}>
        <DirList list={customRoles} createParentTitle={createParentTitle} {...actions} />
      </FlexBox>
    </StModalForm>
  );
};

const StModalForm = styled(ModalForm)``;

export default DirCustomRoles;
