import React, { useState } from 'react';
import ModalForm, { FilterOpt } from 'components/ModalForm/ModalForm';
import DirList from '../DirList';
import { founder } from 'utils';
import styled from 'styled-components';
import CategoriesActions from './CategoriesActions';

export interface DirCategoriesProps {
  title: string;
  filterOptions: FilterOpt[];
}

const countsTest = [
  { _id: 'sfbnndgb', label: 'Категорія 1', type: 'TRANSFER' },
  { _id: 'sffgbdgb', label: 'Категорія 2', type: 'TRANSFER' },
  { _id: 'sfbdgngb', label: 'Категорія 3', type: 'INCOME' },
  { _id: 'sfbfhmfdgngb', label: 'Категорія 5', type: 'EXPENSE' },
  { _id: 'sffhnbdgngb', label: 'Під-категорія 4', type: 'INCOME', owner: 'sfbdgngb' },
  { _id: 'sffhпnbdgngb', label: 'Під-категорія 6', type: 'INCOME', owner: 'sfbdgngb' },
  { _id: 'sffаhnbdgngb', label: 'Під-категорія 8', type: 'INCOME', owner: 'sfbdgngb' },
];

const DirCategories: React.FC<DirCategoriesProps> = props => {
  const [filteredData, setFilteredData] = useState<any[]>(countsTest);

  return (
    <StModalForm
      {...props}
      onOptSelect={({ value }) => {
        setFilteredData(founder({ searchParam: 'type', searchQuery: value, data: countsTest }));
      }}
    >
      <Box>
        <DirList
          list={filteredData}
          entryList={filteredData.filter(el => !el?.owner)}
          ActionsComponent={CategoriesActions}
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
