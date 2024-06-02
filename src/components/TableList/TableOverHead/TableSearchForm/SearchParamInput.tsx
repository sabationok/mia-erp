import ButtonIcon from 'components/atoms/ButtonIcon';
import { SelectItem } from 'components/TableList/TableList';
import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { TableSearchParam } from '../../tableTypes.types';
import { isFunction } from 'lodash';
import { Text } from '../../../atoms/Text';
import { useCloseByBackdropClick, useCloseByEscape } from '../../../../hooks/useCloseByEscapeOrClickOnBackdrop.hook';

export interface ISearchParamInputProps<DataKey = any> {
  params?: TableSearchParam<DataKey>[];
  param?: TableSearchParam<DataKey>;
  selectedItem?: TableSearchParam<DataKey>;
  onSelect?: (item: TableSearchParam<DataKey>) => void;
}

const SearchParamInput: React.FC<ISearchParamInputProps> = ({ params, param, onSelect }) => {
  const [current, setCurrent] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);

  function handleToggleList() {
    setIsOpen(prev => {
      return !prev;
    });
  }

  const handleSelect = useCallback(
    (item: SelectItem, index: number) => {
      setCurrent(index);

      isFunction(onSelect) && onSelect(item);

      handleToggleList();
    },
    [onSelect, setCurrent]
  );

  const renderFilteredList = useMemo(() => {
    return params ? (
      params.map((item, index) => {
        const compareKey: 'dataKey' | 'dataPath' | '_id' | null =
          (param?.dataKey && 'dataKey') || (param?.dataPath && 'dataPath') || (param?._id && '_id') || null;

        return (
          <ListItem
            key={item.dataKey || item.dataPath}
            title={item.label}
            isSelected={compareKey ? param?.[compareKey] === item?.[compareKey] : index === current}
            onClick={() => handleSelect(item, index)}
          >
            <Text $size={14} $weight={500}>
              {item.label}
            </Text>
          </ListItem>
        );
      })
    ) : (
      <ListItem listEmpty>
        <Text $size={14} $weight={500}>
          {'Параметри відсутні'}
        </Text>
      </ListItem>
    );
  }, [params, param, current, handleSelect]);

  useCloseByEscape(setIsOpen);
  useCloseByBackdropClick(setIsOpen, 'data-select');

  return (
    <>
      <ButtonIcon
        icon={'tune'}
        size="28px"
        iconSize={'90%'}
        variant="onlyIconNoEffects"
        onClick={() => handleToggleList()}
        data-select
        disabled={!params?.length}
      />

      <InputBox className={isOpen ? 'isOpen' : ''} isOpen={isOpen} data-select>
        <ParamsList isOpen={isOpen}>{renderFilteredList}</ParamsList>
      </InputBox>
    </>
  );
};

const InputBox = styled.label<{ isOpen?: boolean }>`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;

  position: absolute;
  top: 110%;
  right: 0;
  z-index: 100;

  width: 100%;

  fill: ${({ theme }) => theme.accentColor.base};

  max-height: ${({ isOpen }) => (isOpen ? '40vh' : '0')};
  overflow: hidden;

  background-color: ${({ theme }) => theme.modalBackgroundColor};
  border-radius: 2px;
  border: ${({ isOpen }) => (isOpen ? '1px' : '0')} solid ${({ theme }) => theme.trBorderClr};

  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
`;
// const StyledLabel = styled.label`
//   display: flex;
//
//   position: relative;
//
//   border-style: none;
//   border-image: none;
//   border-width: 5px;
//
//   height: 100%;
//   //background-color: inherit;
//
//   background-color: ${({ theme }) => theme.backgroundColorLight};
//
//   border-bottom: 1px solid ${({ theme }) => theme.trBorderClr};
//
//   &::before {
//     display: block;
//     content: '';
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     height: calc(100% + 4px);
//     width: 0;
//
//     pointer-events: none;
//
//     border-radius: 4px;
//     transition: all ${({ theme }) => theme.globals.timingFnMui};
//     transform: translate(-50%, -50%);
//     background-color: ${({ theme }) => theme.accentColor.base};
//   }
//
//   &.isOpen {
//     &::before {
//       //width: calc(100% + 4px);
//     }
//
//     /* background: linear-gradient(#fff, #fff) padding-box,
//       linear-gradient(90deg, rgba(255, 175, 61, 0) 50%, rgba(255, 175, 61, 1) 50%, rgba(255, 175, 61, 0) 50%) border-box; */
//   }
//
//   &:focus-within {
//   }
//
//   &:focus {
//     outline-style: none;
//   }
// `;

// const StyledInput = styled.input`
//   display: block;
//
//   height: 100%;
//   width: 100%;
//
//   padding: 4px 32px 4px 8px;
//
//   font-size: 14px;
//   font-family: inherit;
//   color: inherit;
//   background-color: inherit;
//
//   //background-color: ${({ theme }) => theme.backgroundColorLight};
//   border-radius: 2px;
//   border-style: none;
//   transition: border ${({ theme }) => theme.globals.timingFnMui};
//
//   &:focus {
//     outline-style: none;
//   }
//
//   &.isOpen {
//     border-color: transparent;
//   }
//
//   &::placeholder {
//     color: ${({ theme }) => theme.globals.inputPlaceholderColor};
//   }
// `;
//
// const ClearButton = styled(ButtonIcon)`
//   position: absolute;
//   right: 0;
//   top: 50%;
//   z-index: 10;
//   width: 28px;
//   height: 28px;
//
//   fill: ${({ theme }) => theme.accentColor.base};
//   transform: translateY(-50%);
// `;

const ParamsList = styled.ul<{ isOpen: boolean }>`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: 32px;

  color: ${({ theme }) => theme.fillColorHeader};

  width: 100%;
  height: 100%;
  max-width: calc(100% + 40px);
  max-height: 100%;

  overflow: auto;
`;

const ListItem = styled.li<{ listEmpty?: boolean; isSelected?: boolean }>`
  display: flex;
  align-items: center;

  padding: 8px;

  font-size: 12px;

  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  background-color: ${({ isSelected, theme }) => (!isSelected ? '' : theme.fieldBackgroundColor)};

  &:hover {
    cursor: default;
    background-color: ${({ listEmpty, theme }) => (listEmpty ? '' : theme.fieldBackgroundColor)};
  }

  @media screen and (max-width: 480px) {
    font-size: 14px;
  }
`;

export default SearchParamInput;
/* background: linear-gradient(#fff, #fff) padding-box,
    linear-gradient(90deg, rgba(255, 175, 61, 0) 50%, rgba(255, 175, 61, 1) 50%, rgba(255, 175, 61, 0) 50%) border-box; */
/* background: linear-gradient(90deg, rgba(255, 175, 61, 0) 50%, rgba(255, 175, 61, 1) 50%, rgba(255, 175, 61, 0) 50%); */
/* background: linear-gradient(#fff, #fff) padding-box,
      linear-gradient(90deg, rgba(255, 175, 61, 1) 0%, rgba(255, 175, 61, 1) 50%, rgba(255, 175, 61, 1) 100%) border-box; */
