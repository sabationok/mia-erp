import React, { memo, useEffect, useMemo, useState } from 'react';
import ModalForm from 'components/ModalForm';
import styled from 'styled-components';
import FlexBox from '../atoms/FlexBox';

import { DirInTreeActionsCreatorType, IDirInTreeProps, MethodDirType } from '../../types/dir.types';
import DirListItem from '../Directories/DirList/DirListItem';
import { IDeliveryMethod } from '../../types/integrations.types';
import { useDeliveriesSelector } from '../../redux/selectors.store';
import { useModalProvider } from '../../Providers/ModalProvider/ModalProvider';
import { ApiDirType } from '../../redux/APP_CONFIGS';
import { UseDeliveriesService } from '../../hooks/services/useDeliveriesService.hook';
import { useAppServiceProvider } from '../../hooks/useAppServices.hook';
import { AppModuleName } from '../../redux/reduxTypes.types';
import { toReqData } from '../../utils';
import Forms from '../Forms';
import { IDeliveryMethodFormData } from '../Forms/methods/FormDeliveryMethod';
import { t } from '../../lang';

export interface DirDeliveryMethodsProps
  extends IDirInTreeProps<MethodDirType, IDeliveryMethod, IDeliveryMethod, IDeliveryMethod> {
  updating?: boolean;
  disabling?: boolean;
  archiving?: boolean;
  creating?: boolean;
}

const DirDeliveryMethods: React.FC<DirDeliveryMethodsProps> = ({
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
  const service = useAppServiceProvider()[AppModuleName.deliveries];
  const modalService = useModalProvider();
  const methods = useDeliveriesSelector().methods;
  const actions = actionsCreatorForDeliveryMethods({ service, modalService, dirType: ApiDirType.METHODS_SHIPMENT });

  const [providerId, setProviderId] = useState<string>();

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

  const renderList = useMemo(
    () =>
      methods
        .filter(item => {
          return item.service?._id === providerId;
        })
        ?.map((item, idx) => (
          <DirListItem
            key={`treeItem_${item?._id || idx}`}
            {...props}
            item={item}
            availableLevels={1}
            currentLevel={0}
            {...actions}
          />
        )),
    [actions, methods, props, providerId]
  );

  useEffect(() => {
    service.getAllMethods();
    // if (methods.length === 0) {
    // }
    // eslint-disable-next-line
  }, []);

  return (
    <StModalForm
      width={'480px'}
      {...props}
      options={providersData.tabs}
      defaultFilterValue={providerId}
      onFilterValueSelect={option => {
        setProviderId(option.value);
      }}
      // onSelect={option => {
      //   setProvider(option);
      // }}
    >
      <FlexBox fillWidth flex={'1'} gap={8} padding={'8px 4px'}>
        {renderList}
      </FlexBox>
    </StModalForm>
  );
};

const StModalForm = styled(ModalForm)``;

export default memo(DirDeliveryMethods);

const actionsCreatorForDeliveryMethods: DirInTreeActionsCreatorType<
  MethodDirType,
  IDeliveryMethod,
  UseDeliveriesService,
  IDeliveryMethod
> = ({ modalService, service }) => {
  return {
    onCreateParent: options => {},
    onUpdate: (_id, data) => {
      const m = modalService.open({
        ModalChildren: Forms.DeliveryMethod,
        modalChildrenProps: {
          defaultState: data,
          title: `Edit ${data.label}`,
          onSubmit: (data, options) => {
            const omitPaths = data.isDefault
              ? (['label', 'labels', 'type'] as (keyof IDeliveryMethodFormData | string)[])
              : ['isDefault', 'service', 'extService', 'value', 'parent'];
            console.log('Form data', data);
            console.log('Req Method data', toReqData(data, { omitPathArr: omitPaths }));

            service.update({
              data: { _id, data: toReqData(data, { omitPathArr: omitPaths }) },
              onLoading: options?.onLoading,
              onSuccess: () => {
                options?.onSuccess && options?.onSuccess();
                m?.onClose();
              },
              onError: options?.onSuccess,
            });
          },
        },
      });
    },
  };
};
