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
  createParentTitle,
  onCreateParent,
  creatingParent = true,
  containerProps,
  listBoxProps,
  listProps,

  currentLevel = 0,
  availableLevels = 1,

  ...props
}) => {
  const listForRender = useMemo(() => (entryList ? entryList : list), [entryList, list]);

  const renderList = useMemo(
    () =>
      listForRender?.map((item, idx) => (
        <DirListItem
          key={item?._id || idx}
          {...item}
          item={item}
          {...props}
          list={list}
          availableLevels={availableLevels}
          currentLevel={currentLevel}
        />
      )),
    [availableLevels, currentLevel, list, listForRender, props]
  );

  return (
    <Box {...containerProps}>
      <ListBox {...listBoxProps} style={{ ...listBoxProps?.style, padding: currentLevel === 0 ? '0 12px' : '0' }}>
        {listForRender.length > 0 ? (
          <List
            {...listProps}
            style={{
              ...listProps?.style,
              padding: currentLevel === 0 ? '12px 0' : '',
            }}
          >
            {renderList}
          </List>
        ) : (
          <EmptyList>Список порожній</EmptyList>
        )}
      </ListBox>
    </Box>
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
  max-height: 100%;
  overflow: auto;
`;
const List = styled.ul`
  flex-grow: 1;

  display: flex;
  flex-direction: column;
  gap: 12px;

  padding-top: 12px;
`;
const CreateParent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  position: sticky;
  bottom: 0;
  left: 0;
  z-index: 5;

  padding: 8px;

  border-top: 1px solid ${({ theme }) => theme.modalBorderColor};
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
