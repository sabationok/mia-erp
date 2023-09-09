import React, { useMemo } from 'react';
import DirListItem, { DirListItemAddsProps } from './DirListItem';
import styled from 'styled-components';
import { IBaseDirItem } from '../dir.types';

export interface DirListProps<T = any> extends Partial<DirListItemAddsProps> {
  list: IBaseDirItem<T>[];
  entryList?: IBaseDirItem<T>[];
  parent?: T;
  onCreateParent?: (...args: any[]) => void;
  createParentTitle?: string;
  currentLevel?: number;
  containerProps?: React.HTMLAttributes<HTMLDivElement>;
  listBoxProps?: React.HTMLAttributes<HTMLDivElement>;
  listProps?: React.HTMLAttributes<HTMLUListElement>;
  availableLevels?: number;
}

const DirList: React.FC<DirListProps & React.HTMLAttributes<HTMLDivElement>> = ({
  entryList,
  list,

  listBoxProps,
  listProps,
  availableLevels = 1,

  ...props
}) => {
  const listForRender = useMemo(() => (entryList ? entryList : list), [entryList, list]);

  const renderList = useMemo(
    () =>
      listForRender?.map((item, idx) => (
        <DirListItem
          key={`treeItem_${item?._id || idx}`}
          {...item}
          {...props}
          item={item}
          list={list}
          availableLevels={availableLevels}
          currentLevel={0}
        />
      )),
    [availableLevels, list, listForRender, props]
  );

  return (
    <ListBox {...listBoxProps} style={{ ...listBoxProps?.style, padding: '0 12px' }}>
      {listForRender.length > 0 ? (
        <List
          {...listProps}
          style={{
            ...listProps?.style,
            padding: '12px 0',
          }}
        >
          {renderList}
        </List>
      ) : (
        <EmptyList>Список порожній</EmptyList>
      )}
    </ListBox>
  );
};
const Box = styled.div`
  //display: flex;
  //flex-direction: column;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr min-content;

  position: relative;

  height: 100%;
  max-height: 100%;

  overflow: hidden;
`;
const ListBox = styled.div`
  flex: 1;

  width: 100%;
  max-height: 100%;

  overflow: auto;
`;
const List = styled.ul`
  flex-grow: 1;

  display: grid;
  grid-template-columns: 1fr;

  gap: 8px;

  padding-top: 12px;
`;
const EmptyList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 20px;

  width: 100%;
  height: 100%;
`;
export default DirList;
