import React, { useMemo } from 'react';
import ModalForm from 'components/ModalForm';
import styled from 'styled-components';
import { useModalProvider } from 'components/ModalProvider/ModalProvider';
import useCustomRolesService, { CustomRolesService } from 'hooks/useCustomRolesService.hook';
import FlexBox from '../atoms/FlexBox';
import { useCustomRolesSelector } from '../../redux/selectors.store';

import { IDirInTreeProps } from '../Directories/dir.types';
import { ICustomRole } from '../../redux/customRoles/customRoles.types';
import { ApiDirType } from '../../redux/APP_CONFIGS';
import DirListItem from '../Directories/DirList/DirListItem';
import ExtraFooterWithButtonButton from '../Forms/components/ExtraFooterWithButtonButton';
import { t } from '../../lang';

export interface DirCustomRolesProps
  extends IDirInTreeProps<any, ICustomRole, ICustomRole, ICustomRole, CustomRolesService> {}

const DirCustomRoles: React.FC<DirCustomRolesProps> = ({ createParentTitle, actionsCreator, ...props }) => {
  const { customRoles, modules } = useCustomRolesSelector();

  const service = useCustomRolesService();
  const modalService = useModalProvider();

  const actions = useMemo(() => {
    return actionsCreator
      ? actionsCreator({
          modalService,
          service,
          dirType: ApiDirType.DEFAULT,
        })
      : {};
  }, [actionsCreator, modalService, service]);
  // !!! REFACTORING ACTIONS
  const renderList = useMemo(
    () =>
      customRoles?.map((item, idx) => (
        <DirListItem
          key={`treeItem_${item?._id || idx}`}
          {...item}
          {...props}
          item={item}
          availableLevels={1}
          currentLevel={0}
          {...(actions as object)}
        />
      )),
    [actions, customRoles, props]
  );

  return (
    <StModalForm
      {...props}
      extraFooter={<ExtraFooterWithButtonButton buttonText={t('Create new role')} onClick={actions?.onCreateParent} />}
    >
      <FlexBox fillWidth flex={'1'} gap={8} padding={'12px'}>
        {renderList}
      </FlexBox>
    </StModalForm>
  );
};

const StModalForm = styled(ModalForm)``;

export default DirCustomRoles;
