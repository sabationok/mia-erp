import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import { iconId } from 'data';
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import SelectsTreeList from './SelectsTreeList';

export interface SelectsTreeListItemProps {
  checked?: boolean;
  _id: string;
  label: string;
  name?: string;
  owner?: { _id?: string };
  ownerId?: string;
  onSelectItems: (ids: string[], checked: boolean) => void;
  onCheckSelectStatus: (id: string) => boolean;
  childrenList?: SelectsTreeListItemProps[];
  childrenCount?: number;
  onSelect: <T = any | undefined>(checked: boolean, item: T) => void;
  list?: Omit<SelectsTreeListItemProps[], 'list'>;
}

const SelectsTreeListItem: React.FC<SelectsTreeListItemProps & Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'>> =
  ({
     _id,
     owner,
     checked,
     label,
     ownerId,
     name,
     childrenList,
     childrenCount,
     onSelect,
     onSelectItems,
     onCheckSelectStatus,
     ...props
   }) => {
    const [isChecked, setIsChecked] = useState<boolean>(checked !== undefined ? checked : false);

    function childrenStatusCheck() {
      const isEveryChildrenChecked = childrenList?.every(el => el.checked);
      // setIsChecked(_prev => {
      //   onSelect(!!isEveryChildrenChecked, {
      //     _id,
      //     owner,
      //     label,
      //     ownerId,
      //     name,
      //     ...props,
      //     checked: !!isEveryChildrenChecked,
      //   });
      //   return !!isEveryChildrenChecked;
      // });
      if (isEveryChildrenChecked) {
        setIsChecked(_prev => {
          onSelect(true, { _id, owner, label, ownerId, name, ...props, checked: true });
          return true;
        });
      }
      if (!isEveryChildrenChecked) {
        setIsChecked(_prev => {
          onSelect(false, { _id, owner, label, ownerId, name, ...props, checked: false });
          return false;
        });
      }
      ;
      // if (!isEveryChildrenChecked) handleSelect();
      return !!isEveryChildrenChecked;
    }

    function handleChildrenSelect<T = any | undefined>(checked: boolean, item: T) {
      onSelect(checked, item);
      if (childrenStatusCheck()) return;

    }

    function handleSelect() {
      setIsChecked(prev => {
        onSelectItems([_id], !prev);
        return !prev;
      });
    }

    useEffect(() =>
      onCheckSelectStatus && onCheckSelectStatus(_id) ? setIsChecked(true) : setIsChecked(false), [_id, onCheckSelectStatus]);


    return (
      <MainBox noOwner={!owner}>
        <Parent>
          <ButtonIcon
            size='26px'
            iconSize='100%'
            variant='onlyIcon'
            iconId={isChecked ? iconId.checkBoxOn : iconId.checkBoxOff}
            aria-checked={isChecked}
            onClick={handleSelect}
          />

          <span>{label || name}</span>
        </Parent>

        {childrenList && childrenList?.length > 0 &&
          <ChildrenBox>
            <SelectsTreeList
              isOpen={true}
              entryList={childrenList}
              onCheckSelectStatus={onCheckSelectStatus}
              onSelectItems={onSelectItems} />
          </ChildrenBox>}
      </MainBox>
    );
  };
const MainBox = styled.div<{ noOwner?: boolean }>`
  display: flex;
  flex-direction: column;

  border-bottom: ${({ noOwner, theme }) => noOwner ? `1px solid ${theme.backgroundColorSecondary}` : ''};
`;
const ChildrenBox = styled.div`
  margin-left: 26px;
`;
const Parent = styled.li`
  display: flex;
  align-items: center;

  gap: 8px;

  padding: 0 0 0 8px;

  border-radius: 2px;
`;


export default SelectsTreeListItem;
