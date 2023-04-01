import { ICategory } from 'data/categories.types';
import { ICount } from 'data/counts.types';
import React from 'react';
import styled from 'styled-components';
import DirListItem, { DirListItemAddsProps, DirListItemProps } from './DirListItem';

export interface DirListProps extends Pick<DirListItemAddsProps, 'onCreateChild' | 'onDelete' | 'onEdit'> {
  list: DirListItemProps[];
  entryList: DirListItemProps[];
  owner?: Partial<ICount | ICategory>;
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
          owner={owner}
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
  gap: 6px;

  padding: 6px 0;

  background-color: ${({ theme }) => theme.backgroundColorSecondary};
`;
export default DirList;
