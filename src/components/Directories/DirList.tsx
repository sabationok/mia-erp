import React from 'react';
import styled from 'styled-components';
import DirListItem, { DirListItemProps } from './DirListItem';

export interface DirListProps {
  list: DirListItemProps[];
  entryList: DirListItemProps[];
  owner?: string;
  onDelete: (_id?: string) => void;
  onEdit: (_id?: string) => void;
  onCreateChild: (ownerID?: string) => void;
}

const DirList: React.FC<DirListProps> = ({ entryList, list, owner, onDelete, onEdit, onCreateChild }) => {
  const renderList = entryList ? entryList : list;

  return (
    <List>
      {renderList?.map((item, idx) => (
        <DirListItem
          key={item?._id || idx}
          {...item}
          onDelete={onDelete}
          onEdit={onEdit}
          onCreateChild={onCreateChild}
          canHaveChild={!item.owner}
          list={list}
        />
      ))}
    </List>
  );
};
const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;

  padding-top: 12px;

  background-color: ${({ theme }) => theme.backgroundColorSecondary};
`;
export default DirList;
