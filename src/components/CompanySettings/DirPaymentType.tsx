import React, { useMemo } from 'react';
import ModalForm from 'components/ModalForm';
import DirList from '../Directories/DirList/DirList';
import styled from 'styled-components';
import { useModalProvider } from 'components/ModalProvider/ModalProvider';
import FlexBox from '../atoms/FlexBox';
import { useDirectoriesSelector } from '../../redux/selectors.store';

import { DirInTreeActionsCreatorOptions, IBaseDirItem, IDirInTreeProps } from '../Directories/dir.types';
import { ApiDirType } from '../../redux/APP_CONFIGS';
import useDirServiceHook, { DirectoriesService } from '../../hooks/useDirService.hook';

export interface DirPaymentMethodsProps
  extends Omit<
    IDirInTreeProps<
      ApiDirType.METHODS_PAYMENT,
      any,
      IBaseDirItem<any, ApiDirType.METHODS_PAYMENT>,
      IBaseDirItem<any, ApiDirType.METHODS_PAYMENT>,
      IBaseDirItem<any, ApiDirType.METHODS_PAYMENT>
    >,
    'actionsCreator'
  > {
  actionsCreator: (
    options: DirInTreeActionsCreatorOptions<
      ApiDirType.METHODS_PAYMENT,
      any,
      IBaseDirItem,
      IBaseDirItem,
      IBaseDirItem,
      DirectoriesService
    >
  ) => {
    onCreateChild?: (parentId: string) => void;
    onCreateParent?: () => void;
    onUpdateItem?: (id: string) => void;
    onDeleteItem?: (id: string) => void;
    onGoToConfig?: (id: string) => void;
    onToggleDisabledStatus?: (id: string, status?: boolean) => void;
    onToggleArchiveStatus?: (id: string, status?: boolean) => void;
    onChangeArchiveStatus?: (id: string, status?: boolean) => void;
  };
}

const DirPaymentMethods: React.FC<DirPaymentMethodsProps> = ({ createParentTitle, actionsCreator, ...props }) => {
  const { directory } = useDirectoriesSelector(ApiDirType.METHODS_PAYMENT);

  const service = useDirServiceHook();
  const modalService = useModalProvider();

  const actions = useMemo(() => {
    const findById = (id: string) => directory.find(el => el._id === id);

    return actionsCreator
      ? actionsCreator({
          findById,
          modalService,
          service,
          dirType: props.dirType,
        })
      : {};
  }, [actionsCreator, modalService, service, props.dirType, directory]);

  return (
    <StModalForm {...props}>
      <FlexBox fillWidth flex={'1'} padding={'0 12px'} maxHeight={'100%'}>
        <DirList
          list={directory}
          createParentTitle={createParentTitle}
          onEdit={actions?.onUpdateItem}
          onDelete={actions?.onDeleteItem}
          onChangeArchiveStatus={actions?.onChangeArchiveStatus}
          onCreateParent={actions?.onCreateParent}
        />
      </FlexBox>
    </StModalForm>
  );
};

const StModalForm = styled(ModalForm)``;

export default DirPaymentMethods;
