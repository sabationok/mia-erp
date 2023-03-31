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
      {mapedData.map((item, idx) => (
        <SelectsListItem key={item._id || idx} onSelect={onSelect} {...item} />
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
  /* height: 100%; */

  overflow: auto;
  @media screen and (max-width: 768px) {
    max-height: 200px;
  }
  /* background-color: #323234; */
`;

export default SelectsList;
