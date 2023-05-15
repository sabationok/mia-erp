import React, { memo, useMemo } from 'react';
import styled from 'styled-components';
import SelectsTreeListItem, { SelectsListItemProps } from './SelectsTreeListItem';

export interface SelectsListProps<T = any> {
  isOpen: boolean;
  onSelectItems: (ids: string[], checked: boolean) => void;
  onCheckSelectStatus: (id: string) => boolean;
  onSelect: <T = any | undefined>(checked: boolean, item: T) => void;
  entryList?: T[];
  list?: T[];
  ownerId?: string;
}

const SelectsTreeList: React.FC<SelectsListProps<SelectsListItemProps>> =
  ({
     isOpen,
     ownerId,
     entryList,
     onSelectItems,
     onCheckSelectStatus,
   }) => {

    const renderList = useMemo(() => {
      return entryList?.map((item, idx) => (
        <SelectsTreeListItem
          key={item._id || idx}
          {...item}
          onSelectItems={onSelectItems}
          onCheckSelectStatus={onCheckSelectStatus}
        />
      ));

    }, [entryList, onCheckSelectStatus, onSelectItems]);


    return (
      <List isOpen={isOpen} ownerId={ownerId}>
        {renderList}
      </List>
    );
  };

const List = styled.ul<{ isOpen?: boolean, ownerId?: string }>`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;

  padding: 0;

  width: 100%;
  /* height: 100%; */

  overflow: auto;


  @media screen and (max-width: 768px) {
    //max-height: 200px;
  }
  /* background-color: #323234; */
`;

export default SelectsTreeList;
