import React from 'react';
import styled from 'styled-components';
import DirListItem, { DirListItemProps } from './DirListItem';

export interface DirListProps {
  list: DirListItemProps[];
  entryList?: DirListItemProps[];
  owner?: string;
  ActionsComponent: React.FC<any>;
}

const DirList: React.FC<DirListProps> = ({ entryList, list, owner, ActionsComponent }) => {
  const renderList = entryList ? entryList : list;

  return (
    <List>
      {renderList.map((item, idx) => (
        <DirListItem
          key={item?._id || idx}
          {...item}
          isLast={entryList?.length === 1 || (entryList ? idx === entryList.length - 1 : false)}
          list={list}
          ActionsComponent={ActionsComponent}
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
