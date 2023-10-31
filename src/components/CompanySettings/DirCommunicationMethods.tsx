import React, { memo, useEffect, useMemo } from 'react';
import ModalForm from 'components/ModalForm';
import styled from 'styled-components';
import FlexBox from '../atoms/FlexBox';

import { DirInTreeActionsCreatorType, IDirInTreeProps, MethodDirType } from '../Directories/dir.types';
import DirListItem from '../Directories/DirList/DirListItem';
import { IPaymentMethod } from '../../redux/payments/payments.types';
import { useTranslatedListData } from '../../hooks/useTranslatedMethods.hook';
import { useCustomersSelector } from '../../redux/selectors.store';
import { ICommunicationMethod } from '../../redux/integrations/integrations.types';
import useCustomersService from '../../hooks/useCustomersService';

export interface DirCommunicationMethodsProps
  extends IDirInTreeProps<MethodDirType, ICommunicationMethod, ICommunicationMethod, ICommunicationMethod> {
  updating?: boolean;
  disabling?: boolean;
  archiving?: boolean;
  creating?: boolean;
}

const DirCommunicationMethods: React.FC<DirCommunicationMethodsProps> = ({
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
  const service = useCustomersService();
  // const modalService = useModalProvider();
  const methods = useTranslatedListData(useCustomersSelector().methods);

  const renderList = useMemo(
    () =>
      methods?.map((item, idx) => (
        <DirListItem
          key={`treeItem_${item?._id || idx}`}
          {...item}
          {...props}
          item={item}
          availableLevels={1}
          currentLevel={0}
        />
      )),
    [methods, props]
  );

  useEffect(() => {
    if (methods.length === 0) {
      service.getAllMethods();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <StModalForm width={'480px'} {...props}>
      <FlexBox fillWidth flex={'1'} gap={8} padding={'8px 4px'}>
        {renderList}
      </FlexBox>
    </StModalForm>
  );
};

const StModalForm = styled(ModalForm)``;

export default memo(DirCommunicationMethods);

const actionsCreatorForDirCommunicationMethods: DirInTreeActionsCreatorType<
  MethodDirType,
  IPaymentMethod,
  any,
  IPaymentMethod
> = () => {
  return {
    onCreateChild: (parentId, parent, options) => {},
  };
};
