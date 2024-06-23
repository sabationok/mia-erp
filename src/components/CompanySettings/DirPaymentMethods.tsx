import React, { memo, useEffect, useMemo, useState } from 'react';
import ModalForm from 'components/ModalForm';
import styled from 'styled-components';
import { useModalProvider } from 'Providers/ModalProvider/ModalProvider';
import FlexBox from '../atoms/FlexBox';
import { DirInTreeActionsCreatorType, IDirInTreeProps, MethodDirType } from '../../types/dir.types';
import DirListItem from '../Directories/DirList/DirListItem';
import usePaymentsServiceHook from '../../hooks/usePaymentsService.hook';
import { usePaymentsSelector } from '../../redux/selectors.store';
import { IPaymentMethod, PaymentInternalTypeEnum } from '../../types/integrations.types';
import { t } from '../../lang';
import { FormPaymentMethod } from '../Forms/methods/FormPaymentMethod';

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
  const methods = usePaymentsSelector().methods;
  const [providerId, setProviderId] = useState<string>();

  const [current, _setCurrent] = useState<PaymentInternalTypeEnum>();

  const providersData = useMemo(() => {
    const _map = new Map(
      methods.map(method => {
        return [method.service?.provider, method.service];
      })
    );
    return {
      map: _map,
      set: [..._map.keys()],
      tabs: [..._map.entries()].map(([key, item]) => {
        return {
          value: item?._id,
          _id: item?._id,
          label: key ? t(key) : key,
        };
      }),
    };
  }, [methods]);

  const fData = useMemo(() => {
    return methods.filter(item => {
      if (providerId && item.service?._id !== providerId) {
        return false;
      }
      if (current && item.type?.internal !== current) {
        return false;
      }
      return true;
    });
  }, [current, methods, providerId]);

  const actions = useMemo(
    () =>
      actionsCreatorForDirPaymentMethods({
        service,
        modalService,
        dirType,
      }),
    [dirType, modalService, service]
  );

  const renderList = useMemo(
    () =>
      fData?.map((item, idx) => (
        <DirListItem
          key={`treeItem_${item?._id || idx}`}
          {...(item as any)}
          editing
          {...props}
          {...actions}
          item={item}
          creatingChild={false}
          availableLevels={1}
          currentLevel={0}
        />
      )),
    [actions, fData, props]
  );

  useEffect(() => {
    service.getAllMethods();
    // eslint-disable-next-line
  }, []);
  return (
    <StModalForm
      style={{ maxWidth: 480 }}
      {...props}
      options={providersData.tabs}
      onOptSelect={option => setProviderId(option.value)}
    >
      <FlexBox fillWidth flex={'1'} gap={8} padding={'8px 4px'}>
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
> = controls => {
  return {
    onUpdate: (id, data, options) => {
      controls.modalService.create(FormPaymentMethod, {
        defaultState: data,
      });
    },
    // onChangeDisableStatus: (id, status, options) => {
    //   console.log('IPaymentMethod onChangeDisableStatus', id, status);
    // },
  };
};
