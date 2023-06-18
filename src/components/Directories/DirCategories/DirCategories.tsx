import React, { useEffect, useState } from 'react';
import ModalForm from 'components/ModalForm';
import DirList from '../DirList/DirList';
import useCategoriesService from 'redux/categories/useCategoriesService.hook';
import { CategoryTypes } from 'redux/categories/categories.types';
import { useModalProvider } from 'components/ModalProvider/ModalProvider';
import FormCreateCategory from './FormCreateCategory';
import { CategoryFilterOpt, DirBaseProps } from '../dir.types';
import t from '../../../lang';
import { toast } from 'react-toastify';
import { useEntryListData, useFilteredLisData } from '../../../hooks';

export interface DirCategoriesProps extends DirBaseProps {
  filterOptions?: CategoryFilterOpt[];
}

const DirCategories: React.FC<DirCategoriesProps> = props => {
  const modals = useModalProvider();
  const [isLoading, setIsLoading] = useState(false);

  const {
    state: { categories },
    create,
    deleteById,
    editById,
    findById,
    getAll,
  } = useCategoriesService();

  const [current, setCurrent] = useState<CategoryTypes>('INCOME');

  function onEdit(_id?: string) {
    const category = findById(_id);
    const modal = modals.handleOpenModal({
      ModalChildren: FormCreateCategory,
      modalChildrenProps: {
        title: `${t(category?.owner ? 'editChildCategory' : 'editParentCategory')} "${
          category?.label || category?.name
        }"`,
        category: categories.find(el => el._id === _id),
        edit: true,
        type: current,
        onSubmit: data =>
          _id &&
          editById({
            data: { _id, data },
            onSuccess: rd => {
              toast.success(`Edited category: ${rd?.label}`);

              modal?.onClose();
            },
          }),
      },
    });
  }

  function onCreateChild(parent?: string) {
    const modal = modals.handleOpenModal({
      ModalChildren: FormCreateCategory,
      modalChildrenProps: {
        title: t('createChildCategory'),
        type: current,
        parent: findById(parent),
        onSubmit: data => {
          create({
            data: { ...data, parent },
            onSuccess(rd) {
              toast.success(`New category: ${rd.label}`);
              modal?.onClose();
            },
          });
        },
      },
    });
  }

  function onCreateParent() {
    const modal = modals.handleOpenModal({
      ModalChildren: FormCreateCategory,
      modalChildrenProps: {
        title: t('createParentCategory'),
        type: current,
        onSubmit: data => {
          create({
            data,
            onSuccess: rd => {
              modal?.onClose();

              toast.success(`New category: ${rd.label}`);
            },
          });
        },
      },
    });
  }

  function onDelete(_id: string) {
    if (window.confirm(`Delete item ?`))
      deleteById({
        data: { _id },
        onSuccess(data) {
          toast.success(`Deleted category: ${data?.label}`);
          if (data?.deletedChildrens) {
            toast.isActive(`Deleted childrens count for ${data?.label}: ${data.deletedChildrens}`);
          }
        },
      });
  }

  function handleFilterData({ value }: CategoryFilterOpt) {
    value && setCurrent(value);
  }

  const fd = useFilteredLisData({
    searchParam: 'type',
    searchQuery: current,
    data: categories,
  });
  const el = useEntryListData(fd, 'parent');

  useEffect(() => {
    getAll({ onLoading: setIsLoading });
  }, [getAll]);

  return (
    <ModalForm {...props} onOptSelect={handleFilterData}>
      <DirList
        entryList={el}
        list={fd}
        onDelete={onDelete}
        onEdit={onEdit}
        onCreateChild={onCreateChild}
        createParentTitle={t('createParentCategory')}
        onCreateParent={onCreateParent}
        currentLevel={0}
        style={{ paddingBottom: '16px' }}
        className={'dir categories'}
      />
    </ModalForm>
  );
};

export default DirCategories;
