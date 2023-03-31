import React, { useState } from 'react';
import ModalForm, { FilterOpt } from 'components/ModalForm/ModalForm';
import DirList from '../DirList';
import { founder } from 'utils';
import styled from 'styled-components';
import CountActions from './CountActions';
import useCountsService from 'redux/counts/useCountsService.hook';
import { ICount } from 'data/counts.types';

export interface DirCountsProps {
  title: string;
  filterOptions: FilterOpt[];
}

const DirCounts: React.FC<DirCountsProps> = props => {
  const { counts } = useCountsService();
  const [filteredData, setFilteredData] = useState<ICount[]>(counts);

  function onDelete() {}
  function onEdit() {}
  function onCreateChild() {}

  return (
    <StModalForm
      {...props}
      onOptSelect={({ value }) => {
        setFilteredData(founder({ searchParam: 'type', searchQuery: value, data: counts }));
      }}
    >
      <Box>
        <DirList
          onDelete={onDelete}
          onEdit={onEdit}
          onCreateChild={onCreateChild}
          list={filteredData}
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

export default DirCounts;
