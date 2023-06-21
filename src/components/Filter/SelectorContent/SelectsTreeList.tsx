import React, { memo, useMemo } from 'react';
import styled from 'styled-components';
import SelectsTreeListItem, { SelectsTreeListItemProps } from './SelectsTreeListItem';

export interface SelectsListProps<T = any> {
  isOpen: boolean;
  onSelectItems: (ids: string[], checked: boolean) => void;
  onCheckSelectStatus: (id: string) => boolean;
  entryList?: T[];
  list?: T[];
  parentId?: string;
}

const SelectsTreeList: React.FC<SelectsListProps<SelectsTreeListItemProps>> = ({
  isOpen,
  parentId,
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
    <List isOpen={isOpen} parentId={parentId}>
      {renderList}
    </List>
  );
};

const List = styled.ul<{ isOpen?: boolean; parentId?: string }>`
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

export default memo(SelectsTreeList);
