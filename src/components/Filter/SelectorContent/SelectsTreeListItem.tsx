import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import { iconId } from 'data';
import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import SelectsTreeList from './SelectsTreeList';
import { IBase } from '../../../redux/global.types';

export interface SelectsTreeListItemProps<TFields = IBase> {
  checked?: boolean;
  _id: string;
  label: string;
  name?: string;
  parent?: TFields;
  parentId?: string;
  onSelectItems: (ids: string[], checked: boolean) => void;
  onCheckSelectStatus: (id: string) => boolean;
  childrenList?: SelectsTreeListItemProps[];
  childrenCount?: number;
  onSelect: <T = any | undefined>(checked: boolean, item: T) => void;
  list?: Omit<SelectsTreeListItemProps, 'list'>[];
}

const SelectsTreeListItem: React.FC<
  SelectsTreeListItemProps & Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'>
> = ({
  _id,
  parent,
  checked,
  label,
  parentId,
  name,
  childrenList,
  childrenCount,
  onSelect,
  onSelectItems,
  onCheckSelectStatus,
  ...props
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(checked !== undefined ? checked : false);

  // function childrenStatusCheck() {
  //   const isEveryChildrenChecked = childrenList?.every(el => el.checked);
  //   // setIsChecked(_prev => {
  //   //   onSelect(!!isEveryChildrenChecked, {
  //   //     _id,
  //   //     parent,
  //   //     label,
  //   //     parentId,
  //   //     name,
  //   //     ...props,
  //   //     checked: !!isEveryChildrenChecked,
  //   //   });
  //   //   return !!isEveryChildrenChecked;
  //   // });
  //   if (isEveryChildrenChecked) {
  //     setIsChecked(_prev => {
  //       onSelect(true, {
  //         _id,
  //         parent,
  //         label,
  //         parentId,
  //         name,
  //         ...props,
  //         checked: true,
  //       });
  //       return true;
  //     });
  //   }
  //   if (!isEveryChildrenChecked) {
  //     setIsChecked(_prev => {
  //       onSelect(false, {
  //         _id,
  //         parent,
  //         label,
  //         parentId,
  //         name,
  //         ...props,
  //         checked: false,
  //       });
  //       return false;
  //     });
  //   }
  //   // if (!isEveryChildrenChecked) handleSelect();
  //   return !!isEveryChildrenChecked;
  // }

  // function handleChildrenSelect<T = any | undefined>(
  //   checked: boolean,
  //   item: T
  // ) {
  //   onSelect(checked, item);
  //   if (childrenStatusCheck()) return;
  // }

  function handleSelect() {
    setIsChecked(prev => {
      onSelectItems([_id], !prev);
      return !prev;
    });
  }

  useEffect(
    () => (onCheckSelectStatus && onCheckSelectStatus(_id) ? setIsChecked(true) : setIsChecked(false)),
    [_id, onCheckSelectStatus]
  );

  return (
    <MainBox noParent={!parent}>
      <Parent>
        <ButtonIcon
          size="20px"
          iconSize="100%"
          variant="onlyIcon"
          iconId={isChecked ? iconId.checkBoxOn : iconId.checkBoxOff}
          aria-checked={isChecked}
          onClick={handleSelect}
        />

        <span>{label || name}</span>
      </Parent>

      {childrenList && childrenList?.length > 0 && (
        <ChildrenBox>
          <SelectsTreeList
            isOpen={true}
            entryList={childrenList}
            onCheckSelectStatus={onCheckSelectStatus}
            onSelectItems={onSelectItems}
          />
        </ChildrenBox>
      )}
    </MainBox>
  );
};
const MainBox = styled.div<{ noParent?: boolean }>`
  display: flex;
  flex-direction: column;

  border-bottom: ${({ noParent, theme }) => (noParent ? `1px solid ${theme.backgroundColorSecondary}` : '')};
`;
const ChildrenBox = styled.div`
  margin-left: 26px;
`;
const Parent = styled.li`
  display: flex;
  align-items: center;
  height: 26px;

  gap: 8px;

  padding: 0 0 0 8px;

  border-radius: 2px;
`;

export default memo(SelectsTreeListItem);
