import React, { useCallback, useEffect, useState } from 'react';
import ModalForm from 'components/ModalForm';
import DirList from './DirList/DirList';
import { useModalProvider } from 'components/ModalProvider/ModalProvider';
import { ActionsCreatorOptions, DirBaseProps, IBaseDirItem } from './dir.types';
import { useFilteredLisData } from 'hooks';
import AppLoader from '../atoms/AppLoader';
import useDirServiceHook from 'hooks/useDirService.hook';
import { useDirectoriesSelector } from 'redux/directories/useDirectoriesService.hook';
import { FilterOpt } from '../ModalForm/ModalFilter';
import { toast } from 'react-toastify';
import { ApiDirType } from '../../redux/APP_CONFIGS';

export interface IDirInTreeProps<
  DirType extends ApiDirType = any,
  ItemType = any,
  CreateDTO = any,
  UpdateDTO = any,
  ItemDataType = any
> extends DirBaseProps {
  filterOptions?: FilterOpt<ItemType>[];
  type?: ItemType;
  createParentTitle?: string;
  dirType: ApiDirType;
  filterSearchPath?: keyof IBaseDirItem<ItemType>;
  filterDefaultValue?: ItemType;

  actionsCreator: (options: ActionsCreatorOptions<DirType, ItemType, CreateDTO, UpdateDTO, ItemDataType>) => {
    onCreateChild?: (parentId: string) => void;
    onCreateParent?: () => void;
    onUpdateItem?: (id: string) => void;
    onDeleteItem?: (id: string) => void;
    onChangeArchiveStatus?: (id: string, status?: boolean) => void;
  };
}

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
  const { getAllByDirType } = dirService;
  const findById = useCallback((id: string) => directory.find(el => el._id === id), [directory]);
  const modalService = useModalProvider();
  const [isLoading, setIsLoading] = useState(false);
  const [current, setCurrent] = useState(filterDefaultValue);
  const actions = actionsCreator({ findById, modalService, type: current, dirService });

  function handleFilterData({ value }: FilterOpt) {
    value && setCurrent(value);
  }

  const fList = useFilteredLisData<IBaseDirItem>({
    searchParam: filterSearchPath,
    searchQuery: current,
    data: directory,
  });

  useEffect(() => {
    getAllByDirType({
      data: { dirType, params: { isArchived: false, createTreeData: true } },
      onLoading: setIsLoading,
      onSuccess: () => {
        toast.success(`Updated data for directory: ${dirType}`);
      },
    });
  }, [dirType, getAllByDirType]);

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

      <AppLoader isLoading={isLoading} />
    </>
  );
};

export default DirTreeComp;
