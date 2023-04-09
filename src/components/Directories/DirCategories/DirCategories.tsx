import React, { useState } from 'react';
import ModalForm, { FilterOpt, ModalFormProps } from 'components/ModalForm/ModalForm';
import DirList from '../DirList/DirList';
import { founder } from 'utils';
import styled from 'styled-components';
import useCategoriesService from 'redux/categories/useCategoriesService.hook';
import { CategoryTypes, ICategory } from 'data/categories.types';
import { useModalProvider } from '../../ModalProvider/ModalProvider';
import FormCreateCategory from './FormCreateCategory';

export type CategoryFilterOpt = FilterOpt<CategoryTypes>;

export interface DirCategoriesProps extends ModalFormProps {
  title: string;
  filterOptions?: CategoryFilterOpt[];
}

const DirCategories: React.FC<DirCategoriesProps> = props => {
  const modal = useModalProvider();
  const { categories, create, deleteById, editById } = useCategoriesService();
  const [filteredData, setFilteredData] = useState<ICategory[]>(categories);
  const [dirType, setDirType] = useState<CategoryTypes>('INCOME');

  function onEdit(_id?: string) {
    const elForEdit = {};
    modal.handleOpenModal({
      ModalChildren: FormCreateCategory,
      modalChildrenProps: {
        title: 'Редагувати категорію',
        edit: true,
        type: dirType,
        onSubmit: (data: any) => {
          // editById(data);
        },
      },
    });
  }

  function onCreateChild(ownerId?: string) {
    modal.handleOpenModal({
      ModalChildren: FormCreateCategory,
      modalChildrenProps: {
        title: 'Створити під-категорію',
        type: dirType,
        onSubmit: (data: any) => {
          // createNewCount(data);
        },
      },
    });
  }


  function onCreateParent() {
    modal.handleOpenModal({
      ModalChildren: FormCreateCategory,
      modalChildrenProps: {
        title: 'Створити категорію',
        type: dirType,
        onSubmit: (data) => {

        },
      },
    });
  }

  return (
    <StModalForm
      {...props}
      onOptSelect={({ value }) => {
        setFilteredData(founder({ searchParam: 'type', searchQuery: value, data: categories }));
      }}
    >
      <Box>
        <DirList
          list={filteredData}
          onDelete={deleteById}
          onEdit={onEdit}
          onCreateChild={onCreateChild}
          entryList={filteredData.filter(el => !el?.owner)}
          createParentTitle='Свторити категорію'
          onCreateParent={onCreateParent}
        />
      </Box>
    </StModalForm>
  );
};

const StModalForm = styled(ModalForm)`
  height: 70vh;

  @media screen and (max-height: 480px) {
    height: 95vh;
  }
`;
const Box = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
  max-height: 100%;
  padding: 0 12px;
`;

export default DirCategories;
