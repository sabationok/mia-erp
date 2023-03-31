import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import { ICategory } from 'data/categories.types';
import { ICount } from 'data/counts.types';
import React, { useState } from 'react';
import styled from 'styled-components';
import DirList from './DirList';

export interface DirListItemProps {
  _id?: string;
  label?: string;
  type?: any;
  name?: string;
  owner?: ICount | ICategory;
  balance?: number;
  currency?: string;
}
export interface DirListItemAddsProps {
  list: DirListItemProps[];
  canHaveChild: boolean;
  onDelete: (_id?: string) => void;
  onEdit: (_id?: string) => void;
  onCreateChild: (ownerID?: string) => void;
}

const DirListItem: React.FC<DirListItemProps & DirListItemAddsProps> = ({
  label,
  name,
  type,
  owner,
  canHaveChild,
  _id,
  list,
  onDelete,
  onEdit,
  onCreateChild,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const childrensList = list?.filter(el => el?.owner === _id || el?.owner?._id === _id);

  function onOpenClick() {
    setIsOpen(prev => !prev);
  }

  return (
    <Item>
      <CountGrid>
        <ActionsField>
          {canHaveChild && (
            <ButtonIcon variant="onlyIcon" iconSize="24px" iconId="plus" onClick={() => onCreateChild(_id)} />
          )}
        </ActionsField>

        <LabelField>
          <Label>{label || name}</Label>

          {!(!childrensList || childrensList?.length === 0) && (
            <ButtonIcon
              variant="onlyIcon"
              iconId={isOpen ? 'SmallArrowUp' : 'SmallArrowDown'}
              iconSize="24px"
              onClick={onOpenClick}
            />
          )}
        </LabelField>

        <ActionsField>
          <ButtonIcon variant="onlyIcon" iconSize="24px" iconId="edit" onClick={() => onEdit(_id)} />

          <ButtonIcon variant="onlyIcon" iconSize="24px" iconId="delete" onClick={() => onDelete(_id)} />
        </ActionsField>
      </CountGrid>

      <Children isOpen={isOpen}>
        {childrensList && childrensList.length > 0 && (
          <DirList
            list={list}
            entryList={childrensList}
            onDelete={onDelete}
            onEdit={onEdit}
            onCreateChild={onCreateChild}
          />
        )}
      </Children>
    </Item>
  );
};
const Item = styled.li``;

const CountGrid = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr min-content;
  align-items: center;
  gap: 8px;

  height: 26px;
  width: 100%;

  fill: ${({ theme }) => theme.fillColorHeader};
  color: ${({ theme }) => theme.fontColorHeader};
`;

const ActionsField = styled.div`
  display: flex;
  align-items: center;

  min-width: 26px;
  height: 100%;
`;

const LabelField = styled.div`
  flex-grow: 1;

  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 100%;
  border-radius: 2px;
  background-color: ${({ theme }) => theme.backgroundColorLight};
`;
const Label = styled.div`
  padding: 0 8px;
`;
const Children = styled.ul<{ isOpen: boolean }>`
  overflow: hidden;

  max-height: ${({ isOpen }) => (isOpen ? '' : '0')};

  padding-left: 34px;
`;
export default DirListItem;
