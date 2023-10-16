import React, { memo, useMemo } from 'react';
import ModalForm from 'components/ModalForm';
import styled from 'styled-components';
import { useModalProvider } from 'components/ModalProvider/ModalProvider';
import FlexBox from '../atoms/FlexBox';

import { DirInTreeActionsCreatorType, IDirInTreeProps, IMethodDirItem, MethodDirType } from '../Directories/dir.types';
import DirListItem from '../Directories/DirList/DirListItem';
import { IPaymentMethod } from '../../redux/payments/payments.types';
import usePaymentsServiceHook from '../../hooks/usePaymentsService.hook';
import { useTranslatedPaymentMethods } from '../../hooks/useTranslatedPaymetMethods.hook';

export interface DirPaymentMethodsProps
  extends IDirInTreeProps<MethodDirType, IMethodDirItem, IMethodDirItem, IMethodDirItem> {
  updating?: boolean;
  disabling?: boolean;
  archiving?: boolean;
  creating?: boolean;
}

const DirPaymentMethods: React.FC<DirPaymentMethodsProps> = ({
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
  const service = usePaymentsServiceHook();
  const modalService = useModalProvider();
  const paymentsMethods = useTranslatedPaymentMethods();

  const renderList = useMemo(
    () =>
      paymentsMethods?.map((item, idx) => (
        <DirListItem
          key={`treeItem_${item?._id || idx}`}
          {...item}
          {...props}
          item={item}
          availableLevels={1}
          currentLevel={0}
        />
      )),
    [paymentsMethods, props]
  );
  return (
    <StModalForm style={{ maxWidth: 480 }} {...props}>
      <FlexBox fillWidth flex={'1'} gap={8} padding={'12px'} maxHeight={'100%'} overflow={'auto'}>
        {renderList}
      </FlexBox>
    </StModalForm>
  );
};

const StModalForm = styled(ModalForm)``;

export default memo(DirPaymentMethods);

const actionsCreatorForDirPaymentMethods: DirInTreeActionsCreatorType<
  MethodDirType,
  IPaymentMethod,
  any,
  IPaymentMethod
> = () => {
  return {
    onCreateChild: (parentId, parent, options) => {},
  };
};
