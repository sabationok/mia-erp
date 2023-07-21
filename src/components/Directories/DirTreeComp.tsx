import React, { useCallback, useMemo, useState } from 'react';
import ModalForm from 'components/ModalForm';
import DirList from './DirList/DirList';
import { useModalProvider } from 'components/ModalProvider/ModalProvider';
import { IBaseDirItem, IDirInTreeProps } from './dir.types';
import { useFilteredLisData } from 'hooks';
import useDirServiceHook from 'hooks/useDirService.hook';
import { useDirectoriesSelector } from 'redux/directories/useDirectoriesService.hook';
import { FilterOpt } from '../ModalForm/ModalFilter';

const DirTreeComp: React.FC<IDirInTreeProps> = ({
  createParentTitle,
  dirType,
  filterSearchPath,
  filterDefaultValue,
  actionsCreator,
  ...props
}) => {
  const { directory } = useDirectoriesSelector(dirType);
  const dirService = useDirServiceHook();
  const findById = useCallback((id: string) => directory.find(el => el._id === id), [directory]);
  const modalService = useModalProvider();
  const [current, setCurrent] = useState(filterDefaultValue);
  const actions = useMemo(
    () =>
      actionsCreator({
        findById,
        modalService,
        type: current,
        dirService,
      }),
    [actionsCreator, current, dirService, findById, modalService]
  );

  function handleFilterData({ value }: FilterOpt) {
    value && setCurrent(value);
  }

  const fList = useFilteredLisData<IBaseDirItem>({
    searchParam: filterSearchPath,
    searchQuery: current,
    data: directory,
  });

  return (
    <>
      <ModalForm {...props} onOptSelect={handleFilterData}>
        <DirList
          list={fList}
          currentLevel={0}
          onEdit={actions?.onUpdateItem}
          onDelete={actions?.onDeleteItem}
          onCreateChild={actions?.onCreateChild}
          onCreateParent={actions?.onCreateParent}
          createParentTitle={createParentTitle}
        />
      </ModalForm>
    </>
  );
};

export default DirTreeComp;
