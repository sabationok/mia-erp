import React, { useState } from 'react';
import ModalForm, { FilterOpt } from 'components/ModalForm/ModalForm';
// import DirList from '../DirList';
import { founder } from 'utils';
import styled from 'styled-components';

export interface DirProjectsProps {
  title: string;
  filterOptions: FilterOpt[];
}

const countsTest = [
  { _id: 'sfbnndgb', label: 'Рахунок 1', type: 'PASSIVE' },
  { _id: 'sffgbdgb', label: 'Рахунок 2', type: 'PASSIVE' },
  { _id: 'sfbdgngb', label: 'Рахунок 3', type: 'ACTIVE' },
  { _id: 'sfbfhmfdgngb', label: 'Рахунок 5', type: 'ACTIVE' },
  { _id: 'sffhnbdgngb', label: 'Рахунок 4', type: 'ACTIVE', owner: 'sfbdgngb' },
];

const DirProjects: React.FC<DirProjectsProps> = props => {
  const [filteredData, setFilteredData] = useState<any[]>(countsTest);

  return (
    <StModalForm
      {...props}
      onOptSelect={({ value }) => {
        console.log(filteredData);
        setFilteredData(founder({ searchParam: 'type', searchQuery: value, data: countsTest }));
      }}
    >
      <Box></Box>
    </StModalForm>
  );
};

const StModalForm = styled(ModalForm)`
  height: 70vh;
  resize: both;

  @media screen and (max-height: 480px) {
    height: 95vh;
  }
`;
const Box = styled.div`
  padding: 16px 16px;
`;

export default DirProjects;
