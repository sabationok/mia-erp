import styled from 'styled-components';
import ModalForm from '../ModalForm';
import { useMemo, useState } from 'react';
import { useModalProvider } from '../ModalProvider/ModalProvider';
import { useDirService, useFilteredLisData } from '../../hooks';
import { useDirectoriesSelector } from '../../redux/selectors.store';
import { FilterOpt } from '../ModalForm/ModalFilter';
import ButtonIcon from '../atoms/ButtonIcon/ButtonIcon';
import DirListItem from './DirList/DirListItem';
import FlexBox from '../atoms/FlexBox';
import { ApiDirType } from '../../redux/APP_CONFIGS';
import { DirInTreeActionsCreatorType, IDirItemBase } from './dir.types';
import { RenderModalComponentChildrenProps } from '../ModalProvider/ModalComponent';

export interface DirTreeComponentProps extends RenderModalComponentChildrenProps {
  createParentTitle?: string;
  dirType: ApiDirType;
  filterSearchPath?: keyof IDirItemBase;
  filterDefaultValue?: string;
  actionsCreator?: DirInTreeActionsCreatorType;
}
const DirTreeComp = ({
  createParentTitle,
  dirType,
  filterSearchPath,
  filterDefaultValue,
  actionsCreator,
  onClose,
  modalId,

  ...props
}: DirTreeComponentProps) => {
  const { directory } = useDirectoriesSelector(dirType);
  const service = useDirService();
  const modalService = useModalProvider();
  const [current, setCurrent] = useState(filterDefaultValue);

  const actions = useMemo(
    () =>
      actionsCreator &&
      actionsCreator({
        modalService,
        type: current,
        service,
        dirType,
      }),
    [actionsCreator, current, service, dirType, modalService]
  );

  function handleFilterData({ value }: FilterOpt) {
    value && setCurrent(value);
  }

  const fList = useFilteredLisData({
    searchParam: filterSearchPath,
    searchQuery: current,
    data: directory,
  });

  const renderList = useMemo(() => {
    return fList.map((item, index) => {
      return (
        <DirListItem
          key={`${dirType}_${item._id}`}
          item={item}
          list={item?.childrenList}
          currentLevel={0}
          {...props}
          {...actions}
        />
      );
    });
  }, [actions, dirType, fList, props]);

  return (
    <ModalForm
      style={{ maxWidth: 480 }}
      {...props}
      onOptSelect={handleFilterData}
      extraFooter={
        actions?.onCreateParent && (
          <CreateParent>
            <ButtonIcon variant="outlinedSmall" onClick={actions?.onCreateParent}>
              {createParentTitle || 'Create parent'}
            </ButtonIcon>
          </CreateParent>
        )
      }
    >
      <FlexBox padding={'12px 6px'} overflow={'auto'} gap={8}>
        {renderList}
      </FlexBox>
    </ModalForm>
  );
};
const CreateParent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;

  padding: 8px;
`;
export default DirTreeComp;
