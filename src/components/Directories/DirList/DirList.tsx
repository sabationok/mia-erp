import React from 'react';
import styled from 'styled-components';
import DirListItem, { DirListItemAddsProps, DirListItemProps } from './DirListItem';

export interface DirListProps extends Pick<DirListItemAddsProps, 'onCreateChild' | 'onDelete' | 'onEdit'> {
  list: DirListItemProps[];
  entryList: DirListItemProps[];
  owner?: string;
}

const DirList: React.FC<DirListProps & React.HTMLAttributes<HTMLUListElement>> = ({
  entryList,
  list,
  owner,
  onDelete,
  onEdit,
  onCreateChild,
  ...pops
}) => {
  const renderList = entryList ? entryList : list;

  return (
    <List {...pops}>
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
