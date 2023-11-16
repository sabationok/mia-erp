import React, { memo, useEffect, useMemo } from 'react';
import ModalForm from 'components/ModalForm';
import styled from 'styled-components';
import FlexBox from '../atoms/FlexBox';

import { DirInTreeActionsCreatorType, IDirInTreeProps, MethodDirType } from '../Directories/dir.types';
import DirListItem from '../Directories/DirList/DirListItem';
import { useTranslatedMethodsList } from '../../hooks/useTranslatedMethodsList.hook';
import { IDeliveryMethod } from '../../redux/integrations/integrations.types';
import { useDeliveriesSelector } from '../../redux/selectors.store';
import { useModalProvider } from '../ModalProvider/ModalProvider';
import { ApiDirType } from '../../redux/APP_CONFIGS';
import { UseDeliveriesService } from '../../hooks/useDeliveriesService.hook';
import { useAppServiceProvider } from '../../hooks/useAppServices.hook';
import { AppModuleName } from '../../redux/reduxTypes.types';

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
  const methods = useTranslatedMethodsList(useDeliveriesSelector().methods, { withFullLabel: true });
  console.log(methods);
  const actions = actionsCreatorForDeliveryMethods({ service, modalService, dirType: ApiDirType.METHODS_SHIPMENT });
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
          {...actions}
        />
      )),
    [actions, methods, props]
  );

  useEffect(() => {
    service.getAllMethods();
    // if (methods.length === 0) {
    // }
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

export default memo(DirDeliveryMethods);

const actionsCreatorForDeliveryMethods: DirInTreeActionsCreatorType<
  MethodDirType,
  IDeliveryMethod,
  UseDeliveriesService,
  IDeliveryMethod
> = () => {
  return {
    onCreateChild: (parentId, parent, options) => {},
  };
};
