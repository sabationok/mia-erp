import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
// import SvgIcon from 'components/atoms/SvgIcon/SvgIcon';
import { SelectItem } from 'components/TableList/TableList';
import { iconId } from 'data';
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

export interface ISearchParamInputProps {
  data?: SelectItem[];
  defaultValue?: SelectItem;
  selectedItem?: SelectItem;
  onSelect?: (item: SelectItem) => void;
}

const SearchParamInput: React.FC<ISearchParamInputProps> = ({
  data,
  defaultValue,
  selectedItem,
  onSelect,
}) => {
  const [inputValue, setInputValue] = useState({ searchParam: '' });
  const [filteredData, setFilteredData] = useState<SelectItem[]>(data || []);
  // const [current, setCurrent] = useState<SelectItem | null>(
  //   defaultValue || selectedItem || null
  // );
  const [isOpen, setIsOpen] = useState(false);

  function handleToggleList() {
    setIsOpen(prev => {
      prev && setInputValue({ searchParam: '' });
      return !prev;
    });
  }

  // function onChange(ev: React.ChangeEvent<HTMLInputElement>) {
  //   const { name, value } = ev.target;
  //
  //   current && setCurrent(null);
  //   setInputValue(prev => {
  //     return { ...prev, [name]: value };
  //   });
  // }

  // function onSearchParamReset() {
  //   setInputValue({ searchParam: '' });
  // }

  // const renderinput = (
  //   <StyledLabel className={isOpen ? 'isOpen' : ''}>
  //     <StyledInput
  //       type="text"
  //       placeholder="Параметр"
  //       name="searchParam"
  //       className={isOpen ? 'isOpen' : ''}
  //       value={inputValue.searchParam}
  //       onChange={onChange}
  //     />
  //
  //     <ClearButton
  //       onClick={onSearchParamReset}
  //       variant="onlyIconNoEffects"
  //       disabled={!inputValue?.searchParam}
  //     >
  //       <SvgIcon iconId={iconId.close} className={'svgIcon'} size="24px" />
  //     </ClearButton>
  //   </StyledLabel>
  // );

  const renderFilteredList = useMemo(() => {
    function onSelectItemClick(item: SelectItem) {
      // setCurrent(item);

      if (onSelect instanceof Function) {
        onSelect(item);
        setInputValue({ searchParam: item.label ? item.label : '' });
      }

      handleToggleList();
    }

    return filteredData.length > 0 ? (
      filteredData.map((item, idx) => (
        <ListItem
          key={item.dataKey || item.dataPath}
          title={item.label}
          onClick={() => {
            onSelectItemClick(item);
          }}
        >
          <span>{item.label}</span>
        </ListItem>
      ))
    ) : (
      <ListItem listEmpty>
        <span>Нічого не знайдено</span>
      </ListItem>
    );
  }, [filteredData, onSelect]);

  useEffect(() => {
    if (data?.length === 0) {
      return;
    }

    const filteredData = data?.filter(el => {
      if (inputValue?.searchParam && el?.name)
        return !(
          inputValue?.searchParam &&
          !el?.name
            .toLowerCase()
            .includes(inputValue?.searchParam.toLowerCase())
        );

      if (inputValue?.searchParam && el?.label)
        return !(
          inputValue?.searchParam &&
          !el?.label
            .toLowerCase()
            .includes(inputValue?.searchParam.toLowerCase())
        );

      return true;
    });

    filteredData && setFilteredData(filteredData);
  }, [data, inputValue, inputValue?.searchParam]);

  useEffect(() => {
    if (!isOpen) return;

    function onMenuClose(ev: MouseEvent | KeyboardEvent) {
      const { target } = ev;
      const allowClose =
        (target instanceof HTMLElement && !target.closest('[data-select]')) ||
        (ev instanceof KeyboardEvent && ev?.code === 'Escape');
      allowClose && setIsOpen(false);
      allowClose && setInputValue({ searchParam: '' });
    }

    document.addEventListener('click', onMenuClose);
    document.addEventListener('keydown', onMenuClose);

    return () => {
      document.removeEventListener('click', onMenuClose);
      document.removeEventListener('keydown', onMenuClose);
    };
  }, [isOpen]);

  return (
    <>
      <ButtonIcon
        iconId={iconId.tune}
        size="28px"
        iconSize={'90%'}
        variant="onlyIconNoEffects"
        onClick={() => handleToggleList()}
        data-select
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
  z-index: 2;

  width: 100%;

  fill: ${({ theme }) => theme.accentColor.base};

  max-height: ${({ isOpen }) => (isOpen ? '40vh' : '0')};
  overflow: hidden;

  background-color: ${({ theme }) => theme.backgroundColorSecondary};
  border-radius: 2px;
  border: ${({ isOpen }) => (isOpen ? '1px' : '0')} solid
    ${({ theme }) => theme.trBorderClr};
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

const ListItem = styled.li<{ listEmpty?: boolean }>`
  display: flex;
  align-items: center;

  padding: 8px;

  font-size: 12px;

  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  &:hover {
    cursor: default;
    background-color: ${({ listEmpty }) =>
      listEmpty ? '' : 'rgba(254, 254, 254, 0.1)'};
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
