import React from 'react';
import styled from 'styled-components';
import SelectsListItem from './SelectsListItem';

export interface SelectsListProps<T = any> {
  isOpen: boolean;
  onSelect: () => void;
  mapedData: T[];
}

const SelectsList: React.FC<SelectsListProps> = ({ isOpen, onSelect, mapedData }) => {
  return (
    <List isOpen={isOpen}>
      {mapedData.map(({ _id, label }, idx) => (
        <SelectsListItem key={_id || idx} onSelect={onSelect} _id={_id} label={label} />
      ))}
    </List>
  );
};

const List = styled.ul<{ isOpen?: boolean }>`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;

  padding: 8px 0;
  gap: 2px;

  width: 100%;
  max-height: 100%;
  overflow: auto;

  /* background-color: #323234; */
`;

export default SelectsList;
