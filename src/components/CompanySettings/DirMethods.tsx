import React, { useMemo } from 'react';
import ModalForm from 'components/ModalForm';
import styled from 'styled-components';
import { useModalProvider } from 'components/ModalProvider/ModalProvider';
import FlexBox from '../atoms/FlexBox';
import { useCheckoutPaymentsSelector, useDirectoriesSelector } from '../../redux/selectors.store';

import { IDirInTreeProps, IMethodDirItem, MethodDirType } from '../Directories/dir.types';
import useDirServiceHook from '../../hooks/useDirService.hook';
import DirListItem from '../Directories/DirList/DirListItem';

export interface DirMethodsProps
  extends IDirInTreeProps<MethodDirType, IMethodDirItem, IMethodDirItem, IMethodDirItem> {
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

  const paymentsMethods = useCheckoutPaymentsSelector().methods;

  const service = useDirServiceHook();
  const modalService = useModalProvider();

  const actions = useMemo(() => {
    return actionsCreator
      ? actionsCreator({
          modalService,
          service,
          dirType,
        })
      : {};
  }, [actionsCreator, modalService, service, dirType]);

  const renderList = useMemo(
    () =>
      directory?.map((item, idx) => (
        <DirListItem
          key={`treeItem_${item?._id || idx}`}
          {...item}
          {...props}
          {...actions}
          item={item}
          availableLevels={1}
          currentLevel={0}
        />
      )),
    [actions, directory, props]
  );
  return (
    <StModalForm style={{ maxWidth: 480 }} {...props}>
      <FlexBox fillWidth flex={'1'} gap={8} padding={'12px'}>
        {renderList}
      </FlexBox>
    </StModalForm>
  );
};

const StModalForm = styled(ModalForm)``;

export default DirMethods;
