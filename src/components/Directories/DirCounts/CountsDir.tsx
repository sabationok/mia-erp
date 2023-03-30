import React, { useState } from 'react';
import ModalForm, { FilterOpt } from 'components/ModalForm/ModalForm';
import DirList from '../DirList';
import { founder } from 'utils';
import styled from 'styled-components';

export interface CountsListProps {
  title: string;
  filterOptions: FilterOpt[];
}

const countsTest = [
  { _id: 'sfbnndgb', label: 'Count 1', type: 'PASSIVE' },
  { _id: 'sffgbdgb', label: 'Count 2', type: 'PASSIVE' },
  { _id: 'sfbdgngb', label: 'Count 3', type: 'ACTIVE' },
  { _id: 'sfbfhmfdgngb', label: 'Count 5', type: 'ACTIVE' },
  { _id: 'sffhnbdgngb', label: 'Count 4', type: 'ACTIVE', owner: 'sfbdgngb' },
];

const CountsList: React.FC<CountsListProps> = props => {
  const [filteredData, setFilteredData] = useState<any[]>(countsTest);

  return (
    <StModalForm
      {...props}
      onOptSelect={({ value }) => {
        setFilteredData(founder({ searchParam: 'type', searchQuery: value, data: countsTest }));
      }}
    >
      <Box>
        <DirList list={filteredData} entryList={filteredData.filter(el => !el?.owner)} />
      </Box>
    </StModalForm>
  );
};

const StModalForm = styled(ModalForm)`
  height: 70vh;
`;
const Box = styled.div`
  padding: 16px 8px;
`;

export default CountsList;
