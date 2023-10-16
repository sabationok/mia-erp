import React, { memo, useMemo } from 'react';
import ModalForm from 'components/ModalForm';
import styled from 'styled-components';
import { useModalProvider } from 'components/ModalProvider/ModalProvider';
import FlexBox from '../atoms/FlexBox';

import { DirInTreeActionsCreatorType, IDirInTreeProps, IMethodDirItem, MethodDirType } from '../Directories/dir.types';
import DirListItem from '../Directories/DirList/DirListItem';
import { IPaymentMethod } from '../../redux/payments/payments.types';
import useShipmentsService from '../../hooks/useShipmentsService.hook';
import useTranslatedShipmentMethods from '../../hooks/useTranslatedShipmentMethods.hook';

export interface DirShipmentsMethodsProps
  extends IDirInTreeProps<MethodDirType, IMethodDirItem, IMethodDirItem, IMethodDirItem> {
  updating?: boolean;
  disabling?: boolean;
  archiving?: boolean;
  creating?: boolean;
}

const DirShipmentsMethods: React.FC<DirShipmentsMethodsProps> = ({
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
  const service = useShipmentsService();
  const modalService = useModalProvider();
  const methods = useTranslatedShipmentMethods();

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
  return (
    <StModalForm width={'480px'} {...props}>
      <FlexBox fillWidth flex={'1'} gap={8} padding={'12px'} maxHeight={'100%'} overflow={'auto'}>
        {renderList}
      </FlexBox>
    </StModalForm>
  );
};

const StModalForm = styled(ModalForm)``;

export default memo(DirShipmentsMethods);

const actionsCreatorForDirShipmentsMethods: DirInTreeActionsCreatorType<
  MethodDirType,
  IPaymentMethod,
  any,
  IPaymentMethod
> = () => {
  return {
    onCreateChild: (parentId, parent, options) => {},
  };
};
