import React, { useCallback, useMemo, useState } from 'react';
import ModalForm from 'components/ModalForm';
import DirList from './DirList/DirList';
import { useModalProvider } from 'components/ModalProvider/ModalProvider';
import { IBaseDirItem, IDirInTreeProps } from './dir.types';
import { useDirService, useFilteredLisData } from 'hooks';

import { useDirectoriesSelector } from 'redux/directories/useDirectoriesService.hook';
import { FilterOpt } from '../ModalForm/ModalFilter';

const DirTreeComp: React.FC<IDirInTreeProps> = ({
  createParentTitle,
  dirType,
  filterSearchPath,
  filterDefaultValue,
  actionsCreator,
  availableLevels,
  ...props
}) => {
  const { directory } = useDirectoriesSelector(dirType);
  console.log(dirType, directory);
  const dirService = useDirService();
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
        dirType,
      }),
    [actionsCreator, current, dirService, dirType, findById, modalService]
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
    <ModalForm {...props} onOptSelect={handleFilterData}>
      <DirList
        list={fList}
        currentLevel={0}
        availableLevels={availableLevels}
        onEdit={actions?.onUpdateItem}
        onDelete={actions?.onDeleteItem}
        onCreateChild={actions?.onCreateChild}
        onCreateParent={actions?.onCreateParent}
        onChangeArchiveStatus={actions?.onChangeArchiveStatus}
        createParentTitle={createParentTitle}
      />
    </ModalForm>
  );
};

export default DirTreeComp;
