import React, { useState } from 'react';
import ModalForm, { FilterOpt, ModalFormProps } from 'components/ModalForm/ModalForm';
import DirList from '../DirList/DirList';
import { founder } from 'utils';
import styled from 'styled-components';
import useCategoriesService from 'redux/categories/useCategoriesService.hook';
import { CategoryTypes, ICategory } from 'data/categories.types';

export type CategoryFilterOpt = FilterOpt<CategoryTypes>;

export interface DirCategoriesProps extends ModalFormProps {
  title: string;
  filterOptions?: CategoryFilterOpt[];
}

const DirCategories: React.FC<DirCategoriesProps> = props => {
  const { categories } = useCategoriesService();
  const [filteredData, setFilteredData] = useState<ICategory[]>(categories);
  function onDelete(_id?: string) {
    console.log(_id);
  }
  function onEdit(_id?: string) {
    console.log(_id);
  }
  function onCreateChild(ownerId?: string) {
    console.log(ownerId);
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
          onDelete={onDelete}
          onEdit={onEdit}
          onCreateChild={onCreateChild}
          entryList={filteredData.filter(el => !el?.owner)}
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
  padding: 16px 16px;
`;

export default DirCategories;
