import React, { useMemo, useState } from 'react';
import ModalForm from 'components/ModalForm';
import DirList from '../DirList/DirList';
import { useModalProvider } from 'components/ModalProvider/ModalProvider';
import { IBaseDirItem, IDirInTreeProps } from '../dir.types';
import { useFilteredLisData } from 'hooks';
import AppLoader from '../../atoms/AppLoader';
import useDirServiceHook from 'hooks/useDirService.hook';
import { useDirectoriesSelector } from 'redux/directories/useDirectoriesService.hook';
import { FilterOpt } from '../../ModalForm/ModalFilter';
import { toast } from 'react-toastify';

export type { IDirInTreeProps } from '../dir.types';
const DirTreeComp: React.FC<IDirInTreeProps> = <T = any, V extends string | undefined = any>({
  createParentTitle,
  dirType,
  filterSearchPath,
  filterDefaultValue,
  ...props
}: IDirInTreeProps<T, V>) => {
  const { directory } = useDirectoriesSelector<T>(dirType);
  const { getAllByDirType } = useDirServiceHook();

  const modals = useModalProvider();
  const [isLoading, setIsLoading] = useState(false);
  const [current, setCurrent] = useState<V | undefined>(filterDefaultValue);

  // function onEdit(_id?: string) {
  //   const category = findById(_id);
  //   const modal = modals.handleOpenModal({
  //     ModalChildren: FormCreateCategory,
  //     modalChildrenProps: {
  //       title: `${t(category?.owner ? 'editChildCategory' : 'editParentCategory')} "${
  //         category?.label || category?.name
  //       }"`,
  //       category: categories.find(el => el._id === _id),
  //       edit: true,
  //       type: current,
  //       onSubmit: data =>
  //         _id &&
  //         editById({
  //           data: { _id, data },
  //           onSuccess: rd => {
  //             toast.success(`Edited category: ${rd?.label}`);
  //
  //             modal?.onClose();
  //           },
  //         }),
  //     },
  //   });
  // }
  //
  // function onCreateChild(parent?: string) {
  //   const modal = modals.handleOpenModal({
  //     ModalChildren: FormCreateCategory,
  //     modalChildrenProps: {
  //       title: t('createChildCategory'),
  //       type: current,
  //       parent: findById(parent),
  //       onSubmit: data => {
  //         create({
  //           data: { ...data, parent },
  //           onSuccess(rd) {
  //             toast.success(`New category: ${rd.label}`);
  //             modal?.onClose();
  //           },
  //         });
  //       },
  //     },
  //   });
  // }
  //
  // function onCreateParent() {
  //   const modal = modals.handleOpenModal({
  //     ModalChildren: FormCreateCategory,
  //     modalChildrenProps: {
  //       title: t('createParentCategory'),
  //       type: current,
  //       onSubmit: data => {
  //         create({
  //           data,
  //           onSuccess: rd => {
  //             modal?.onClose();
  //
  //             toast.success(`New category: ${rd.label}`);
  //           },
  //         });
  //       },
  //     },
  //   });
  // }

  // function onDelete(_id: string) {
  //   // TODO  const modal = modals.handleOpenModal({
  //   // TODO    ModalChildren: ConfirmModal,
  //   // TODO    modalChildrenProps: {
  //   // TODO      onClose: () => {},
  //   // TODO      onConfirm: () => {},
  //   // TODO      onReject: () => {},
  //   // TODO    },
  //   // TODO    settings: {
  //   // TODO      onEscapePressClose: false,
  //   // TODO      onBackdropClose: false,
  //   // TODO    },
  //   // TODO  });
  //
  //   if (window.confirm(`Delete item`))
  //     deleteById({
  //       data: { _id },
  //       onSuccess(data) {
  //         toast.success(`Deleted category: ${data?.label}`);
  //         if (data?.deletedChildrens) {
  //           toast.info(`Deleted children for ${data?.label}: ${data.deletedChildrens}`);
  //         }
  //       },
  //     });
  // }

  function handleFilterData({ value }: FilterOpt<V>) {
    value && setCurrent(value);
  }

  const fList = useFilteredLisData<IBaseDirItem<T>>({
    searchParam: filterSearchPath,
    searchQuery: current,
    data: directory,
  });

  useMemo(async () => {
    getAllByDirType({
      data: { dirType, params: { isArchived: false, createTreeData: true } },
      onLoading: setIsLoading,
      onSuccess: () => {
        toast.success(`Loaded data for directory: ${dirType}`);
      },
    });
  }, [dirType, getAllByDirType]);

  return (
    <>
      <ModalForm {...props} onOptSelect={handleFilterData}>
        <DirList
          list={fList}
          currentLevel={0}
          onEdit={() => {}}
          onDelete={() => {}}
          onCreateChild={() => {}}
          onCreateParent={() => {}}
          createParentTitle={createParentTitle}
        />
      </ModalForm>

      <AppLoader isLoading={isLoading} />
    </>
  );
};

export default DirTreeComp;
