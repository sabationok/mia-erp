import React, { memo, useMemo } from 'react';
import ModalForm from 'components/ModalForm';
import styled from 'styled-components';
import { useModalProvider } from 'components/ModalProvider/ModalProvider';
import FlexBox from '../atoms/FlexBox';

import { DirInTreeActionsCreatorType, IDirInTreeProps, MethodDirType } from '../Directories/dir.types';
import DirListItem from '../Directories/DirList/DirListItem';
import { IPaymentMethod } from '../../redux/payments/payments.types';
import usePaymentsServiceHook from '../../hooks/usePaymentsService.hook';
import { useTranslatedPaymentMethods } from '../../hooks/useTranslatedPaymentMethods.hook';

export interface DirPaymentMethodsProps
  extends IDirInTreeProps<MethodDirType, IPaymentMethod, IPaymentMethod, IPaymentMethod> {
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
  const methods = useTranslatedPaymentMethods();

  const actions = useMemo(
    () =>
      actionsCreatorForDirPaymentMethods({
        service,
        modalService,
        dirType,
      }),
    [dirType, modalService, service]
  );

  // const listByProviders = useMemo(() => {
  //   let providers: Record<string, PaymentServProvider & { childrenList: IPaymentMethod[] }> = {};
  //   methods.map(m => {
  //     if (m.parent) {
  //       const current = providers[m.parent._id] || m.parent;
  //       providers[m.parent._id] = {
  //         ...current,
  //         childrenList: current?.childrenList ? [...current?.childrenList, m] : [m],
  //       };
  //     }
  //     return '';
  //   });
  //
  //   return Object.values(providers);
  // }, [methods]);

  const renderList = useMemo(
    () =>
      methods?.map((item, idx) => (
        <DirListItem
          key={`treeItem_${item?._id || idx}`}
          {...item}
          editing
          disabling
          {...props}
          {...actions}
          item={item}
          creatingChild={false}
          availableLevels={1}
          currentLevel={0}
        />
      )),
    [actions, methods, props]
  );
  return (
    <StModalForm style={{ maxWidth: 480 }} {...props}>
      <FlexBox fillWidth flex={'1'} gap={8} padding={'8px 4px'} maxHeight={'100%'} overflow={'auto'}>
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
    onUpdate: (id, data, options) => {
      console.log('IPaymentMethod onUpdate', data);
    },
    onChangeDisableStatus: (id, status, options) => {
      console.log('IPaymentMethod onChangeDisableStatus', id, status);
    },
  };
};
