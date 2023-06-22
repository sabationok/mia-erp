import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import { ICategory } from 'redux/directories/categories.types';
import React, { useState } from 'react';
import styled from 'styled-components';
import DirList from './DirList';
import { IBaseDirItem } from '../dir.types';
import { ICount } from '../../../redux/directories/counts.types';
import { isUndefined } from 'lodash';

// export interface DirListItemProps {
//   _id?: string;
//   label?: string;
//   type?: any;
//   name?: string;
//   parent?: Partial<ICount | ICategory>;
//   balance?: number;
//   currency?: string;
// }

export interface ICategoriesDirItem extends IBaseDirItem<ICategory> {}

export interface ICountsDirItem extends IBaseDirItem<ICount> {}

export interface DirListItemAddsProps<T = any> {
  list: IBaseDirItem<T>[];
  canHaveChild: boolean;
  onDelete?: (id: string) => void;
  onChangeArchiveStatus?: (id: string) => void;
  onEdit?: (id: string) => void;
  onCreateChild?: (parentId: string) => void;
  currentLevel?: number;
}

const DirListItem: React.FC<IBaseDirItem & DirListItemAddsProps> = ({
  label,
  name,
  parent,
  canHaveChild,
  _id,
  list,
  onDelete,
  onChangeArchiveStatus,
  onEdit,
  onCreateChild,
  childrenList,
  currentLevel,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function onOpenClick() {
    setIsOpen(prev => !prev);
  }

  function evHandlerWrapper(evHandler: (arg: any) => void, arg: any) {
    return () => {
      if (typeof evHandler === 'function') {
        evHandler(arg);
      }
    };
  }

  return (
    <Item>
      <ItemGrid>
        <ActionsField canHaveChild={canHaveChild}>
          {canHaveChild && (
            <ButtonIcon
              variant="onlyIcon"
              iconSize="24px"
              icon="plus"
              disabled={!canHaveChild || !onCreateChild}
              onClick={onCreateChild && evHandlerWrapper(onCreateChild, _id)}
            />
          )}
        </ActionsField>

        <LabelField>
          <Label title={label || name}>{label || name}</Label>

          {!(!childrenList || childrenList?.length === 0) && (
            <ButtonIcon
              variant="onlyIconNoEffects"
              icon={isOpen ? 'SmallArrowUp' : 'SmallArrowDown'}
              iconSize="24px"
              onClick={onOpenClick}
            />
          )}
        </LabelField>

        <ActionsField>
          <ButtonIcon
            variant="onlyIcon"
            iconSize="24px"
            icon="edit"
            disabled={!onEdit}
            onClick={onEdit && evHandlerWrapper(onEdit, _id)}
          />

          <ButtonIcon
            variant="onlyIcon"
            iconSize="24px"
            icon="delete"
            disabled={!onDelete}
            onClick={onDelete && evHandlerWrapper(onDelete, _id)}
          />
          <ButtonIcon
            variant="onlyIcon"
            iconSize="24px"
            icon={'archive'}
            disabled={!onChangeArchiveStatus}
            onClick={onChangeArchiveStatus && evHandlerWrapper(onChangeArchiveStatus, _id)}
          />
        </ActionsField>
      </ItemGrid>

      <Children isOpen={isOpen}>
        {childrenList && childrenList.length > 0 && (
          <DirList
            list={list}
            parent={{ label, name, _id: _id || '' }}
            entryList={childrenList}
            onDelete={onDelete}
            onEdit={onEdit}
            onCreateChild={onCreateChild}
            currentLevel={!isUndefined(currentLevel) ? currentLevel + 1 : currentLevel}
          />
        )}
      </Children>
    </Item>
  );
};
const Item = styled.li``;

const ItemGrid = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr min-content;
  align-items: center;
  gap: 4px;

  height: 26px;
  width: 100%;

  fill: ${({ theme }) => theme.fillColorHeader};
  color: ${({ theme }) => theme.fontColorHeader};
`;

const ActionsField = styled.div<{ canHaveChild?: boolean }>`
  display: flex;
  align-items: center;

  min-width: 12px;
  height: 100%;
`;

const LabelField = styled.div`
  flex-grow: 1;

  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 100%;
  overflow: hidden;

  border-radius: 2px;
  background-color: ${({ theme }) => theme.fieldColor};
  cursor: default;
`;
const Label = styled.div`
  max-width: 100%;
  padding: 0 8px;

  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const Children = styled.ul<{ isOpen: boolean }>`
  overflow: hidden;

  max-height: ${({ isOpen }) => (isOpen ? '' : '0')};

  padding-left: 34px;
`;
export default DirListItem;
