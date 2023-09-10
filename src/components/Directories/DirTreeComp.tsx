import styled from 'styled-components';
import ModalForm from '../ModalForm';
import { useCallback, useMemo, useState } from 'react';
import { useModalProvider } from '../ModalProvider/ModalProvider';
import { useDirService, useFilteredLisData } from '../../hooks';
import { useDirectoriesSelector } from '../../redux/selectors.store';
import { FilterOpt } from '../ModalForm/ModalFilter';
import ButtonIcon from '../atoms/ButtonIcon/ButtonIcon';
import DirListItem from './DirList/DirListItem';
import FlexBox from '../atoms/FlexBox';

const DirTreeComp = ({
  createParentTitle,
  dirType,
  filterSearchPath,
  filterDefaultValue,
  actionsCreator,
  availableLevels,

  ...props
}: any) => {
  const { directory } = useDirectoriesSelector(dirType);
  const service = useDirService();
  const modalService = useModalProvider();
  const [current, setCurrent] = useState(filterDefaultValue);
  const findById = useCallback((id: string) => directory.find(el => el._id === id), [directory]);

  const actions = useMemo(
    () =>
      actionsCreator &&
      actionsCreator({
        findById,
        modalService,
        type: current,
        service,
        dirType,
      }),
    [actionsCreator, current, service, dirType, findById, modalService]
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
      return <DirListItem key={`${dirType}_${item._id}`} item={item} list={item?.childrenList} />;
    });
  }, [dirType, fList]);

  return (
    <ModalForm
      style={{ maxWidth: 480 }}
      {...props}
      onOptSelect={handleFilterData}
      extraFooter={
        actions?.onCreateParent && (
          <CreateParent>
            <ButtonIcon variant="outlinedSmall" onClick={() => actions.onCreateParent()}>
              {createParentTitle || 'Create parent'}
            </ButtonIcon>
          </CreateParent>
        )
      }
    >
      <FlexBox padding={'12px'} overflow={'auto'} gap={8}>
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
