import React, { memo, useEffect, useMemo } from 'react';
import ModalForm from 'components/ModalForm';
import styled from 'styled-components';
import { useModalProvider } from 'components/ModalProvider/ModalProvider';
import FlexBox from '../atoms/FlexBox';

import { DirInTreeActionsCreatorType, IDirInTreeProps, MethodDirType } from '../../types/dir.types';
import DirListItem from '../Directories/DirList/DirListItem';
import { useTranslatedMethodsList } from '../../hooks/useTranslatedMethodsList.hook';
import { ServiceName, useAppServiceProvider } from '../../hooks/useAppServices.hook';
import { IInvoicingMethod } from '../../types/integrations.types';
import { useInvoicesSelector } from '../../redux/selectors.store';
import { UseInvoicingService } from '../../hooks/useInvoicingService.hook';
import Forms from '../Forms';
import ExtraFooterWithButton from '../atoms/ExtraFooterWithButton';

export interface DirInvoicingMethodsProps
  extends IDirInTreeProps<MethodDirType, IInvoicingMethod, IInvoicingMethod, IInvoicingMethod> {
  updating?: boolean;
  disabling?: boolean;
  archiving?: boolean;
  creating?: boolean;
}

const DirInvoicingMethods: React.FC<DirInvoicingMethodsProps> = ({
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
  const service = useAppServiceProvider()[ServiceName.invoicing];
  const methods = useTranslatedMethodsList(useInvoicesSelector().methods, { withFullLabel: true });

  const modalService = useModalProvider();

  const actions = useMemo(
    () =>
      actionsCreatorForDirInvoicingMethods({
        service,
        modalService,
        dirType,
      }),
    [dirType, modalService, service]
  );

  // const listByProviders = useMemo(() => {
  //   let providers: Record<string, PaymentServProvider & { childrenList: IInvoicingMethod[] }> = {};
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

  useEffect(() => {
    service.getAllMethods();
    // eslint-disable-next-line
  }, []);

  return (
    <StModalForm
      style={{ maxWidth: 480 }}
      {...props}
      extraFooter={
        actions?.onCreateParent && (
          <ExtraFooterWithButton buttonText={createParentTitle || 'Create parent'} onClick={actions?.onCreateParent} />
        )
      }
    >
      <FlexBox fillWidth flex={1} gap={8} padding={'8px 4px'}>
        {renderList}
      </FlexBox>
    </StModalForm>
  );
};

const StModalForm = styled(ModalForm)``;

export default memo(DirInvoicingMethods);

const actionsCreatorForDirInvoicingMethods: DirInTreeActionsCreatorType<
  MethodDirType,
  IInvoicingMethod,
  UseInvoicingService,
  IInvoicingMethod
> = ({ modalService }) => {
  return {
    onUpdate: (id, data, options) => {
      modalService.open({
        ModalChildren: Forms.InvoicingMethod,
        modalChildrenProps: { defaultState: data },
      });

      console.log('Invoice mtd onUpdate', data);
    },
    // onChangeDisableStatus: (id, status, options) => {
    //   console.log('IInvoc onChangeDisableStatus', id, status);
    // },
    onCreateParent: () => {
      modalService.open({ ModalChildren: Forms.InvoicingMethod, modalChildrenProps: { create: true } });
    },
  };
};
