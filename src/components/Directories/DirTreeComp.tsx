import React, { useCallback, useMemo, useState } from 'react';
import ModalForm from 'components/ModalForm';
import DirList from './DirList/DirList';
import { useModalProvider } from 'components/ModalProvider/ModalProvider';
import { IBaseDirItem, IDirInTreeProps } from './dir.types';
import { useDirService, useFilteredLisData } from 'hooks';

import { FilterOpt } from '../ModalForm/ModalFilter';
import { useDirectoriesSelector } from '../../redux/selectors.store';

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
  const service = useDirService();
  const findById = useCallback((id: string) => directory.find(el => el._id === id), [directory]);
  const modalService = useModalProvider();
  const [current, setCurrent] = useState(filterDefaultValue);

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

  const fList = useFilteredLisData<IBaseDirItem>({
    searchParam: filterSearchPath,
    searchQuery: current,
    data: directory,
  });

  return (
    <ModalForm style={{ maxWidth: 480 }} {...props} onOptSelect={handleFilterData}>
      <DirList
        list={fList}
        currentLevel={0}
        availableLevels={availableLevels}
        createParentTitle={createParentTitle}
        {...actions}
      />
    </ModalForm>
  );
};

export default DirTreeComp;
