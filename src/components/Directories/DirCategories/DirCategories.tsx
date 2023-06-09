import React, { useMemo, useState } from 'react';
import ModalForm from 'components/ModalForm';
import DirList from '../DirList/DirList';
import { founder } from 'utils';
import useCategoriesService from 'redux/categories/useCategoriesService.hook';
import { CategoryTypes, ICategory } from 'redux/categories/categories.types';
import { useModalProvider } from 'components/ModalProvider/ModalProvider';
import FormCreateCategory from './FormCreateCategory';
import styled from 'styled-components';
import { CategoryFilterOpt, DirBaseProps } from '../dir.types';
import { defaultThunkPayload } from '../../../utils/fabrics';

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
  const [dirType, setDirType] = useState<CategoryTypes>('INCOME');

  // const [selectedList, setSelectedList] = useState<string[]>();

  function onEdit(_id?: string) {
    const category = findById(_id);
    modal.handleOpenModal({
      ModalChildren: FormCreateCategory,
      modalChildrenProps: {
        title: `Редагувати ${category?.owner ? 'під-категорію' : 'категорію'} "${category?.label || category?.name}"`,
        category: categories.find(el => el._id === _id),
        edit: true,
        type: dirType,
        onSubmit: submitData => _id && submitData && editById({ data: { _id, newData: {} } }),
      },
    });
  }

  function onCreateChild(ownerId?: string) {
    modal.handleOpenModal({
      ModalChildren: FormCreateCategory,
      modalChildrenProps: {
        title: 'Створити під-категорію',
        type: dirType,
        onSubmit: submitData => create(defaultThunkPayload()),
      },
    });
  }

  function onCreateParent() {
    modal.handleOpenModal({
      ModalChildren: FormCreateCategory,
      modalChildrenProps: {
        title: 'Створити категорію',
        type: dirType,
        onSubmit: data => create({}),
      },
    });
  }

  function handleFilterData({ value }: CategoryFilterOpt) {
    value && setDirType(value);
  }

  const filteredData = useMemo(
    () =>
      founder<ICategory>({
        searchParam: 'type',
        searchQuery: dirType,
        data: categories,
      }) || [],
    [categories, dirType]
  );
  const entryList = useMemo(() => filteredData.filter(el => !el?.owner), [filteredData]);

  return (
    <StModalForm {...props} onOptSelect={handleFilterData}>
      <DirList
        entryList={entryList}
        list={filteredData}
        onDelete={_id => deleteById(defaultThunkPayload({ data: { _id: '' } }))}
        onEdit={onEdit}
        onCreateChild={onCreateChild}
        createParentTitle="Створити категорію"
        onCreateParent={onCreateParent}
        currentLevel={0}
      />
    </StModalForm>
  );
};

const StModalForm = styled(ModalForm)`
  height: 70vh;

  @media screen and (max-height: 480px) {
    height: 95vh;
  }
`;

export default DirCategories;
