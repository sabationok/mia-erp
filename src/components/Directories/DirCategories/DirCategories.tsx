import React, { useEffect, useMemo, useState } from 'react';
import ModalForm from 'components/ModalForm';
import DirList from '../DirList/DirList';
import { founder } from 'utils';
import useCategoriesService from 'redux/categories/useCategoriesService.hook';
import { CategoryTypes, ICategory } from 'redux/categories/categories.types';
import { useModalProvider } from 'components/ModalProvider/ModalProvider';
import FormCreateCategory from './FormCreateCategory';
import { CategoryFilterOpt, DirBaseProps } from '../dir.types';
import { defaultThunkPayload } from '../../../utils/fabrics';
import t from '../../../lang';
import { toast } from 'react-toastify';

export interface DirCategoriesProps extends DirBaseProps {
  filterOptions?: CategoryFilterOpt[];
}

const DirCategories: React.FC<DirCategoriesProps> = props => {
  const modal = useModalProvider();

  const {
    state: { categories },
    create,
    deleteById,
    editById,
    findById,
  } = useCategoriesService();
  const [current, setCurrent] = useState<CategoryTypes>('INCOME');

  function onEdit(_id?: string) {
    const category = findById(_id);
    const { id } = modal.handleOpenModal({
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
            onSuccess: () => {
              toast.success('Edited successfully');
              console.log('modalId', id);
              modal.handleCloseModal(id);
            },
          }),
      },
    });
  }

  function onCreateChild(parent?: string) {
    modal.handleOpenModal({
      ModalChildren: FormCreateCategory,
      modalChildrenProps: {
        title: t('createChildCategory'),
        type: current,
        onSubmit: data => create({ data: { ...data, parent } }),
      },
    });
  }

  function onCreateParent() {
    const { id } = modal.handleOpenModal({
      ModalChildren: FormCreateCategory,
      modalChildrenProps: {
        title: t('createParentCategory'),
        type: current,
        onSubmit: data => {
          create({
            data,
            onSuccess: data => {
              console.log(data);
              console.log('modalId', id);
              modal.handleCloseModal(id);
              toast.success('Created successfully');
            },
          });
        },
      },
    });
  }

  function handleFilterData({ value }: CategoryFilterOpt) {
    value && setCurrent(value);
  }

  const filteredData = useMemo(
    () =>
      founder<ICategory>({
        searchParam: 'type',
        searchQuery: current,
        data: categories,
      }),
    [categories, current]
  );
  const entryList = useMemo(() => filteredData.filter(el => !el?.owner), [filteredData]);

  useEffect(() => {
    console.log(modal.modalContent);
  }, [modal.modalContent]);

  return (
    <ModalForm {...props} onOptSelect={handleFilterData}>
      <DirList
        entryList={entryList}
        list={filteredData}
        onDelete={_id => deleteById(defaultThunkPayload({ data: { _id: '' } }))}
        onEdit={onEdit}
        onCreateChild={onCreateChild}
        createParentTitle={t('createParentCategory')}
        onCreateParent={onCreateParent}
        currentLevel={0}
      />
    </ModalForm>
  );
};

export default DirCategories;
