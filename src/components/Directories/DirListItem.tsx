import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import React, { useState } from 'react';
import styled from 'styled-components';
import DirList from './DirList';

export interface DirListItemProps {
  label: string;
  _id?: string;
  type?: any;
  name?: string;
  owner?: string;
  balance?: number;
  currency?: string;
  isLast?: boolean;
  list: DirListItemProps[];
  ActionsComponent: React.FC<any>;
}
const DirListItem: React.FC<DirListItemProps> = ({ label, type, owner, isLast, _id, list, ActionsComponent }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const childrensList = list.filter(el => el?.owner === _id);

  function onOpenClick() {
    setIsOpen(prev => !prev);
  }

  return (
    <Item>
      <CountGrid>
        <ActionsField>{isLast && <ActionsComponent type={type} owner={owner} filled />}</ActionsField>

        <LabelField>
          <Label>{label}</Label>

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
          <ActionsComponent type={type} _id={_id} iconId="edit" />

          <ButtonIcon variant="onlyIcon" iconSize="24px" iconId="delete" />
        </ActionsField>
      </CountGrid>

      <Children isOpen={isOpen}>
        {childrensList && childrensList.length > 0 && (
          <DirList list={list} entryList={childrensList} ActionsComponent={ActionsComponent} />
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
