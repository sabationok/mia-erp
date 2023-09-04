import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import React, { memo, useMemo, useState } from 'react';
import styled from 'styled-components';
import DirList from './DirList';
import { IBaseDirItem, IDirItemBase } from '../dir.types';
import { isUndefined } from 'lodash';
import { ApiDirType } from '../../../redux/APP_CONFIGS';

export interface DirListItemAddsProps<T = any> {
  list: IDirItemBase<ApiDirType, T>[];
  item?: IDirItemBase<ApiDirType, T>;
  archived?: boolean;
  disabled?: boolean;
  deleted?: boolean;
  onUpdate?: (id: string, data: IDirItemBase) => void;
  onDelete?: (id: string) => void;
  onChangeDisableStatus?: (id: string, status: boolean) => void;
  onChangeArchiveStatus?: (id: string, status: boolean) => void;
  onCreateChild?: (parentId: string, parent: IBaseDirItem<T>) => void;
  currentLevel?: number;
  availableLevels?: number;

  creatingParent?: boolean;
  changeDisableStatus?: boolean;
  changeArchiveStatus?: boolean;
  creatingChild?: boolean;
  editing?: boolean;
}
interface DirListItemState {
  archived?: boolean;
  disabled?: boolean;
  deleted?: boolean;
}

const DirListItem: React.FC<IBaseDirItem & DirListItemAddsProps> = ({
  _id,
  label,
  name,
  parent,
  item,
  list,
  availableLevels = 1,
  currentLevel = 0,
  onUpdate,
  onCreateChild,
  childrenList,
  deleted = false,
  onDelete,
  disabled = false,
  onChangeDisableStatus,
  changeDisableStatus,
  archived = false,
  onChangeArchiveStatus,
  changeArchiveStatus = true,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [state, setState] = useState<DirListItemState>({ archived, deleted, disabled });

  const stateActionsMap: Record<keyof DirListItemState, ((id: string, status: boolean) => void) | undefined> = {
    archived: onChangeArchiveStatus,
    disabled: onChangeDisableStatus,
    deleted: onDelete,
  };

  const registerStateAction = (name: keyof DirListItemState) => {
    const action = stateActionsMap[name];

    const props = {
      disabled: !action,
      isActive: !state[name],
      onClick: () => {
        setState(prev => {
          const newState = { ...prev, [name]: !prev[name] };
          action && action(_id, !prev[name]);
          return newState;
        });
      },
    };

    return props;
  };

  const canHasChildren = useMemo(() => {
    return !isUndefined(availableLevels) && !isUndefined(currentLevel) ? availableLevels > currentLevel + 1 : !parent;
  }, [availableLevels, currentLevel, parent]);

  function onOpenClick() {
    setIsOpen(prev => !prev);
  }

  function evHandlerWrapper(evHandler?: (...arg: any[]) => void, ...arg: any[]) {
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
              onClick={evHandlerWrapper(
                onCreateChild,
                _id,
                item || {
                  label,
                  name,
                }
              )}
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
          <ActionButton
            variant="onlyIcon"
            iconSize="24px"
            icon="edit"
            disabled={!onUpdate}
            onClick={evHandlerWrapper(
              onUpdate,
              _id,
              item
              // omit(item, ['childrenList', 'parent.childrenList', 'parent.parent.childrenList'])
            )}
          />

          {changeArchiveStatus && (
            <ActionButton variant="onlyIcon" iconSize="24px" icon={'archive'} {...registerStateAction('archived')} />
          )}

          {changeDisableStatus && (
            <ActionButton
              variant="onlyIcon"
              iconSize="22px"
              icon={!state.disabled ? 'lightMode' : 'darkMode'}
              {...registerStateAction('disabled')}
            />
          )}
        </ActionsField>
      </ItemGrid>

      <Children isOpen={isOpen}>
        {childrenList && childrenList.length > 0 && (
          <DirList
            list={list}
            parent={{ label, name, _id: _id || '' }}
            entryList={childrenList}
            {...{ onDelete, onUpdate, onChangeArchiveStatus, onChangeDisableStatus, onCreateChild }}
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
  background-color: ${({ theme }) => theme.field.backgroundColor};
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
const ActionButton = styled(ButtonIcon)`
  fill: ${({ isActive = true, theme }) => (isActive ? theme.accentColor.base : theme.accentColor.light)};
  &[disabled] {
    opacity: 1;
    fill: ${({ theme }) => theme.fieldColor};
  }
`;

export default memo(DirListItem);

// {!onDelete && (
//   <ButtonIcon
//     variant="onlyIcon"
//     iconSize="24px"
//     icon="delete"
//     // disabled={!onDelete}
//     // onClick={evHandlerWrapper(onDelete, _id)}
//   />
// )}
