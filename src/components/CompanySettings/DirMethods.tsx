import React, { memo, useEffect, useMemo } from 'react';
import ModalForm from 'components/ModalForm';
import DirList from '../Directories/DirList/DirList';
import styled from 'styled-components';
import { useModalProvider } from 'components/ModalProvider/ModalProvider';
import FlexBox from '../atoms/FlexBox';
import { useDirectoriesSelector } from '../../redux/selectors.store';

import { IDirInTreeProps, IMethodDirItem, MethodDirType } from '../Directories/dir.types';
import useDirServiceHook from '../../hooks/useDirService.hook';

export interface DirMethodsProps
  extends IDirInTreeProps<MethodDirType, any, IMethodDirItem, IMethodDirItem, IMethodDirItem> {
  updating?: boolean;
  disabling?: boolean;
  archiving?: boolean;
  creating?: boolean;
}

const DirMethods: React.FC<DirMethodsProps> = ({
  createParentTitle,
  availableLevels,
  actionsCreator,
  dirType,
  updating,
  disabling = true,
  archiving,
  creating,
  ...props
}) => {
  const { directory } = useDirectoriesSelector(dirType);

  useEffect(() => {
    console.log(process.env);
  }, []);
  const service = useDirServiceHook();
  const modalService = useModalProvider();

  const actions = useMemo(() => {
    const findById = (id: string) => directory.find(el => el._id === id);

    return actionsCreator
      ? actionsCreator({
          findById: findById as any,
          modalService,
          service,
          dirType,
        })
      : {};
  }, [actionsCreator, modalService, service, dirType, directory]);

  return (
    <StModalForm style={{ maxWidth: 480 }} {...props}>
      <FlexBox fillWidth flex={'1'} padding={'0'} maxHeight={'100%'}>
        <DirList
          list={directory}
          currentLevel={0}
          availableLevels={availableLevels}
          disabling
          updating
          creatingParent
          // createParentTitle={createParentTitle}
          // onCreateParent={creating ? actions.onCreateParent : undefined}
          // onCreateChild={creating ? actions.onCreateChild : undefined}
          // onChangeDisableStatus={disabling ? actions.onChangeDisableStatus : undefined}
          // onChangeArchiveStatus={archiving ? actions.onChangeArchiveStatus : undefined}
          {...actions}
        />
      </FlexBox>
    </StModalForm>
  );
};

const StModalForm = styled(ModalForm)``;

export default memo(DirMethods);
