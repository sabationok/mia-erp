import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import DirList from './DirList';
import { IBaseDirItem, SubmitFormOptions } from '../dir.types';
import { isUndefined } from 'lodash';

export interface DirListItemAddsProps<T = any> {
  list: IBaseDirItem<T>[];
  item?: IBaseDirItem<T>;
  onDelete?: (id: string, options?: SubmitFormOptions) => void;
  onEdit?: (id: string, options?: SubmitFormOptions) => void;
  onChangeArchiveStatus?: (id: string, status: boolean, options?: SubmitFormOptions) => void;
  onCreateChild?: (parentId: string, parent: IBaseDirItem<T>, options?: SubmitFormOptions) => void;
  currentLevel?: number;
  availableLevels?: number;
}

const DirListItem: React.FC<IBaseDirItem & DirListItemAddsProps> = ({
  label,
  name,
  parent,
  item,
  _id,
  list,
  onDelete,
  onChangeArchiveStatus,
  onEdit,
  onCreateChild,
  childrenList,
  currentLevel,
  availableLevels,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const canHasChildren = useMemo(() => {
    return !isUndefined(availableLevels) && !isUndefined(currentLevel) ? availableLevels > currentLevel + 1 : !parent;
  }, [availableLevels, currentLevel, parent]);

  function onOpenClick() {
    setIsOpen(prev => !prev);
  }

  function evHandlerWrapper(evHandler: (...arg: any[]) => void, ...arg: any[]) {
    return () => {
      if (typeof evHandler === 'function') {
        evHandler(...arg);
      }
    };
  }

  return (
    <Item>
      <ItemGrid>
        <ActionsField canHasChildren={canHasChildren}>
          {canHasChildren && (
            <ButtonIcon
              variant="onlyIcon"
              iconSize="24px"
              icon="plus"
              disabled={!canHasChildren || !onCreateChild}
              onClick={
                onCreateChild &&
                evHandlerWrapper(
                  onCreateChild,
                  _id,
                  item || {
                    label,
                    name,
                  }
                )
              }
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

          {onDelete && (
            <ButtonIcon
              variant="onlyIcon"
              iconSize="24px"
              icon="delete"
              disabled={!onDelete}
              onClick={onDelete && evHandlerWrapper(onDelete, _id)}
            />
          )}

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
            availableLevels={availableLevels}
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

const ActionsField = styled.div<{ canHasChildren?: boolean }>`
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
