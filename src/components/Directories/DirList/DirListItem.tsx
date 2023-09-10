import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { IDirItemBase } from '../dir.types';
import { isUndefined } from 'lodash';
import FlexBox from '../../atoms/FlexBox';

export interface DirListItemProps {
  list?: IDirItemBase[];
  item?: IDirItemBase;
  parent?: IDirItemBase;
  archived?: boolean;
  disabled?: boolean;
  deleted?: boolean;
  onUpdate?: (id: string, data: IDirItemBase) => void;
  onDelete?: (id: string) => void;
  onChangeDisableStatus?: (id: string, status: boolean) => void;
  onChangeArchiveStatus?: (id: string, status: boolean) => void;
  onCreateChild?: (parentId: string, parent: IDirItemBase) => void;
  currentLevel?: number;
  availableLevels?: number;

  creatingParent?: boolean;
  creatingChild?: boolean;
  disabling?: boolean;
  archiving?: boolean;
  editing?: boolean;
}
interface DirListItemState {
  archived?: boolean;
  disabled?: boolean;
  deleted?: boolean;
}

const DirListItem: React.FC<DirListItemProps> = props => {
  const {
    item,
    parent,
    availableLevels = 1,
    currentLevel = 0,
    onUpdate,
    onCreateChild,
    deleted = false,
    onDelete,
    disabled = false,
    onChangeDisableStatus,
    disabling,
    archived = false,
    onChangeArchiveStatus,
    archiving,
    editing,
  } = props;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [state, setState] = useState<DirListItemState>({ archived, deleted, disabled });

  // const stateActionsMap: Record<keyof DirListItemState, ((id: string, status: boolean) => void) | undefined> = {
  //   archived: onChangeArchiveStatus,
  //   disabled: onChangeDisableStatus,
  //   deleted: onDelete,
  // };
  //
  // const registerStateAction = (name: keyof DirListItemState, handlerKey: 'onClick' | 'onChange' = 'onClick') => {
  //   const action = stateActionsMap[name];
  //
  //   const props = {
  //     disabled: !action,
  //     isActive: !state[name],
  //     [handlerKey]: () => {
  //       setState(prev => {
  //         const newState = { ...prev, [name]: !prev[name] };
  //         action && action(item?._id, !prev[name]);
  //         return newState;
  //       });
  //     },
  //   };
  //
  //   return props;
  // };
  const isTreeItem = useMemo(() => {
    return availableLevels > 1;
  }, [availableLevels]);

  const canHasChildren = useMemo(() => {
    return !isUndefined(availableLevels) && !isUndefined(currentLevel)
      ? availableLevels > currentLevel + 1
      : !item?.parent;
  }, [availableLevels, currentLevel, item?.parent]);

  const hasChildren = useMemo(() => {
    return item?.childrenList && item?.childrenList?.length > 0;
  }, [item?.childrenList]);

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

  const renderChildren = useMemo(() => {
    if (!item?.childrenList || item.childrenList.length === 0) return null;
    return item?.childrenList.map(ch => {
      return (
        <DirListItem
          key={`dirItem_lvl_${currentLevel + 1}_${ch?._id}`}
          {...props}
          item={ch}
          list={ch?.childrenList}
          parent={item}
          currentLevel={currentLevel + 1}
        />
      );
    });
  }, [currentLevel, props, item]);

  return (
    <Item>
      <ButtonIcon
        variant="onlyIconNoEffects"
        icon={hasChildren && isOpen ? 'SmallArrowUp' : 'SmallArrowDown'}
        size={'32px'}
        iconSize={'24px'}
        disabled={!hasChildren}
        onClick={onOpenClick}
      />

      <FlexBox flex={1}>
        <ItemBox fxDirection={'row'}>
          <LabelField>
            <Label>{item?.label || item?.name}</Label>

            {canHasChildren && (
              <Actions canHasChildren={canHasChildren}>
                <ButtonIcon
                  variant="onlyIcon"
                  size={'32px'}
                  iconSize={'24px'}
                  icon="plus"
                  disabled={!canHasChildren || !onCreateChild}
                  onClick={evHandlerWrapper(onCreateChild, item?._id, item)}
                />
              </Actions>
            )}
          </LabelField>

          <Actions>
            {editing && (
              <ActionButton
                variant="onlyIcon"
                iconSize="24px"
                icon="edit"
                disabled={!onUpdate}
                onClick={evHandlerWrapper(onUpdate, item?._id, item)}
              />
            )}

            {archiving && <ActionButton variant="onlyIcon" iconSize="24px" icon={'archive'} />}

            {disabling && (
              <ActionButton variant="onlyIcon" iconSize="22px" icon={!state.disabled ? 'lightMode' : 'darkMode'} />
            )}

            {/*{onChangeDisableStatus && <Toggler {...registerStateAction('disabled', 'onChange')} />}*/}
          </Actions>
        </ItemBox>

        <ChildrenList isOpen={isOpen}>{renderChildren}</ChildrenList>
      </FlexBox>
    </Item>
  );
};
// <Item>
// <ChildrenList isOpen={isOpen}>{renderChildren}</ChildrenList>
// </Item>
const Item = styled.li`
  display: flex;
  align-items: flex-start;

  overflow: hidden;
  max-width: 100%;
`;

const ItemBox = styled(FlexBox)<{ level?: number }>`
  align-items: center;
  gap: 6px;

  height: 32px;
  //padding: 0 6px;

  fill: ${({ theme }) => theme.fillColorHeader};
  color: ${({ theme }) => theme.fontColorHeader};

  border-radius: 2px;

  //background-color: ${({ theme }) => theme.field.backgroundColor};
`;

const LabelField = styled.div`
  flex: 1;

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

const ChildrenList = styled.ul<{ isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 6px;

  overflow-y: hidden;
  overflow-x: visible;

  max-height: ${({ isOpen }) => (isOpen ? '' : '0')};

  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  padding: ${p => (p.isOpen ? `6px 0 0` : '')};
`;
const Actions = styled.div<{ canHasChildren?: boolean }>`
  display: flex;
  align-items: center;

  gap: 6px;

  height: 100%;
`;
const ActionButton = styled(ButtonIcon)`
  fill: ${({ isActive = true, theme }) => (isActive ? theme.accentColor.base : theme.accentColor.light)};

  &[disabled] {
    opacity: 1;
    fill: ${({ theme }) => theme.fieldColor};
  }
`;

export default DirListItem;

// {!onDelete && (
//   <ButtonIcon
//     variant="onlyIcon"
//     iconSize="24px"
//     icon="delete"
//     // disabled={!onDelete}
//     // onClick={evHandlerWrapper(onDelete, _id)}
//   />
// )}
