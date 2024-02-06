import React, { memo, useEffect, useMemo } from 'react';
import ModalForm from 'components/ModalForm';
import styled from 'styled-components';
import FlexBox from '../atoms/FlexBox';

import { DirInTreeActionsCreatorType, IDirInTreeProps, MethodDirType } from '../../types/dir.types';
import DirListItem from '../Directories/DirList/DirListItem';
import { useTranslatedMethodsList } from '../../hooks/useTranslatedMethodsList.hook';
import { useCustomersSelector } from '../../redux/selectors.store';
import { ICommunicationMethod } from '../../types/integrations.types';
import useCustomersService, { CustomersService } from '../../hooks/useCustomersService';
import { useModalProvider } from '../ModalProvider/ModalProvider';
import { ApiDirType } from '../../redux/APP_CONFIGS';
import FormCreateMethod from '../Forms/Directories/FormCreateMethod';

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
  const modalService = useModalProvider();
  const methods = useTranslatedMethodsList(useCustomersSelector().methods);

  const actions = actionsCreatorForDirCommunicationMethods({
    service,
    modalService,
    dirType: ApiDirType.METHODS_COMMUNICATION,
  });

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

export default memo(DirCommunicationMethods);

const actionsCreatorForDirCommunicationMethods: DirInTreeActionsCreatorType<
  MethodDirType,
  ICommunicationMethod,
  CustomersService,
  ICommunicationMethod
> = ({ service, modalService: mS }) => {
  return {
    onUpdate: (_id, data, o) => {
      const m = mS.open({
        ModalChildren: FormCreateMethod,
        modalChildrenProps: {
          defaultState: data,
          onSubmit: (data, o) => {
            service.updateMethod({
              data: { _id, data },
              onSuccess: () => {
                m?.onClose && m?.onClose();
              },
            });
          },
        },
      });
    },
  };
};
