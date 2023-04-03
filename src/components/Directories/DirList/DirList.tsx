import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import { ICategory } from 'data/categories.types';
import { ICount } from 'data/counts.types';
import React from 'react';
import styled from 'styled-components';
import DirListItem, { DirListItemAddsProps, DirListItemProps } from './DirListItem';

export interface DirListProps extends Partial<DirListItemAddsProps> {
  list: DirListItemProps[];
  entryList?: DirListItemProps[];
  owner?: Partial<ICount | ICategory>;
  onCreateParent?: (...args: any[]) => void;
  createParentTitle?: string;
}

const DirList: React.FC<DirListProps & React.HTMLAttributes<HTMLUListElement>> = ({
  entryList,
  list,
  owner,
  onDelete,
  onEdit,
  onCreateChild,
  onCreateParent,
  createParentTitle,
  ...pops
}) => {
  const renderList = entryList ? entryList : list;

  return (
    <Box>
      <ListBox>
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
      </ListBox>

      {onCreateParent && (
        <CreateParent>
          <ButtonIcon variant="outlinedSmall" onClick={() => onCreateParent()}>
            {createParentTitle || 'createParentTitle'}
          </ButtonIcon>
        </CreateParent>
      )}
    </Box>
  );
};
const Box = styled.div`
  flex-grow: 1;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr min-content;

  position: relative;

  max-height: 100%;
`;
const ListBox = styled.div`
  /* padding: 0 16px; */
  max-height: 100%;

  overflow: auto;
`;
const List = styled.ul`
  flex-grow: 1;

  display: flex;
  flex-direction: column;
  gap: 12px;

  padding-top: 12px;

  background-color: ${({ theme }) => theme.backgroundColorSecondary};
`;
const CreateParent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  position: sticky;
  bottom: 0;
  left: 0;
  z-index: 5;

  padding: 20px;

  background-color: ${({ theme }) => theme.backgroundColorSecondary};

  border-top: 1px solid ${({ theme }) => theme.borderColor};
`;
export default DirList;
