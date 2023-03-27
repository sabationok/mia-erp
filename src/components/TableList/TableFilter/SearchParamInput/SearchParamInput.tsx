import ButtonIcon from 'components/ButtonIcon/ButtonIcon';
import SvgIcon from 'components/SvgIcon/SvgIcon';
import { iconId } from 'data';
import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

export interface SelectItem extends Record<string, any> {
  _id?: string;
  filter?: boolean;
  search: boolean;
  label: string;
  dataKey: string;
}
export interface ISearchParamInputProps {
  data?: SelectItem[];
  defaultValue?: SelectItem;
  selectedItem?: SelectItem;
  onSelect?: (item: SelectItem) => void;
}

const SearchParamInput: React.FC<ISearchParamInputProps> = ({ data, defaultValue, selectedItem, onSelect }) => {
  const [inputValue, setInputValue] = useState({ searchParam: '' });
  const [filteredData, setFilteredData] = useState<SelectItem[]>(data || []);
  const [current, setCurrent] = useState<SelectItem | null>(defaultValue || selectedItem || null);
  const [isOpen, setIsOpen] = useState(false);
  function handleToggleList(state?: boolean) {
    setIsOpen(state || !isOpen);
  }
  function onSelectItemClick(item: SelectItem) {
    setCurrent(item);

    if (onSelect instanceof Function) {
      onSelect(item);
      setInputValue({ searchParam: item.label });
    }

    handleToggleList();
  }

  function onChange(ev: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = ev.target;

    current && setCurrent(null);
    setInputValue(prev => {
      return { ...prev, [name]: value };
    });
  }
  function onSerchParamReset() {
    setInputValue({ searchParam: '' });
  }

  useEffect(() => {
    // console.log('select data', data);
    if (data?.length === 0) {
      return;
    }

    const filteredData = data?.filter(el => {
      if (inputValue?.searchParam)
        return !(inputValue?.searchParam && !el?.label.toLowerCase().includes(inputValue?.searchParam.toLowerCase()));

      return true;
    });

    filteredData && setFilteredData(filteredData);
  }, [data, inputValue, inputValue?.searchParam]);

  useEffect(() => {
    function onMenuClose(ev: MouseEvent | KeyboardEvent) {
      const { target } = ev;
      if (target instanceof HTMLElement && !target.closest('[data-select]')) setIsOpen(false);
      if (ev instanceof KeyboardEvent && ev?.code === 'Escape') setIsOpen(false);
    }
    document.addEventListener('click', onMenuClose);
    document.addEventListener('keydown', onMenuClose);

    return () => {
      document.removeEventListener('click', onMenuClose);
      document.removeEventListener('keydown', onMenuClose);
    };
  }, []);

  return (
    <InputBox className={isOpen ? 'isOpen' : ''} data-select>
      <ToggleButton onClick={() => handleToggleList()}>
        <SvgIcon iconId={iconId.SmallArrowDown} className={'svgIcon'} size="24px" />
      </ToggleButton>

      <StyledLabel>
        <StyledInput
          type="text"
          placeholder="Параметр"
          name="searchParam"
          // defaultValue={defaultValue?.label || data[current].label}
          value={inputValue.searchParam}
          onChange={onChange}
          onClick={() => handleToggleList(true)}
        />
      </StyledLabel>

      <ParamsListContainer isOpen={isOpen}>
        <ParamsList>
          {filteredData.length > 0 &&
            filteredData.map((item, idx) => (
              <ListItem
                key={item.dataKey}
                title={item.label}
                onClick={() => {
                  onSelectItemClick(item);
                }}
              >
                <span>{item.label}</span>
              </ListItem>
            ))}

          {filteredData.length === 0 && (
            <ListItem listEmpty>
              <span>Нічого не знайдено</span>
            </ListItem>
          )}
        </ParamsList>
        {false && (
          <CloseListItem>
            <ButtonIcon variant="outlinedSmall" onClick={onSerchParamReset}>
              Очистити
            </ButtonIcon>
          </CloseListItem>
        )}
      </ParamsListContainer>
    </InputBox>
  );
};

const StyledLabel = styled.label`
  display: block;
  position: relative;

  border-style: none;
  border-image: none;
  border-width: 0;

  height: 100%;

  &::before {
    display: block;
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    height: calc(100% + 4px);
    width: 0;

    border-radius: 4px;
    transition: all ${({ theme }) => theme.globals.timingFnMui};
    transform: translate(-50%, -50%);
    background-color: ${({ theme }) => theme.accentColor.base};
  }

  &:focus-within {
    &::before {
      width: calc(100% + 4px);
    }
  }
`;

const InputBox = styled.label`
  position: relative;
  z-index: 2;

  height: 100%;
  width: 100%;

  fill: ${({ theme }) => theme.accentColor.base};

  /* &::before {
    display: block;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;

    height: calc(10% + 4px);
    width: 0;

    transition: all ${({ theme }) => theme.globals.timingFnMui};
     transform: translate(50, 50);
  background-color: ${({ theme }) => theme.accentColor.base};
  }

  &:focus-within {
    &::before {
      width: calc(100% + 4px);
    }
  } */
  &.isOpen {
    & .svgIcon {
      transform: rotate(-180deg);
    }
  }
`;

const StyledInput = styled.input`
  display: block;

  position: sticky;
  top: 0;
  left: 0;
  z-index: 10;

  height: 100%;
  width: 100%;
  padding: 4px 30px 4px 8px;

  font-size: 12px;
  font-family: inherit;
  color: inherit;
  background-color: transparent;

  border-radius: 2px;
  border-style: none;
  border: 1px solid ${({ theme }) => theme.globals.inputBorder};
  background-color: ${({ theme }) => theme.backgroundColorMain};
  transition: all ${({ theme }) => theme.globals.timingFnMui};
  &:focus {
    border-color: transparent;
  }
  &::placeholder {
    color: ${({ theme }) => theme.globals.inputPlaceholderColor};
  }
`;

const ToggleButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  right: 5px;
  top: 50%;

  transform: translateY(-50%);
  &:focus-within {
    ${StyledInput} {
      border-color: ${({ theme }) => theme.accentColor.base};
      outline: 2px solid ${({ theme }) => theme.accentColor.base};
    }
  }
`;

const ParamsListContainer = styled.ul<{ isOpen: boolean }>`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr min-content;

  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  z-index: 50;

  min-width: 100%;
  width: max-content;
  max-width: calc(100% + 40px);
  height: max-content;

  /* height: 50vh; */

  max-height: ${({ isOpen }) => (isOpen ? '60vh' : '0')};
  overflow: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  ${({ isOpen }) => (isOpen ? css`` : null)}

  font-size: 12px;

  border-radius: 2px;
  box-shadow: var(--header-shadow);

  background-color: ${({ theme }) => theme.backgroundColorSecondary};
  /* border: 1px solid ${({ theme }) => theme.trBorderClr}; */
  border: ${({ isOpen }) => (isOpen ? '1px' : '0')} solid ${({ theme }) => theme.trBorderClr};

  @media screen and (max-width: 480px) {
    font-size: 10px;
  }
`;
const ParamsList = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: 32px;

  max-width: 100%;

  overflow: auto;

  color: ${({ theme }) => theme.fillColorHeader};
`;

const ListItem = styled.li<{ listEmpty?: boolean }>`
  display: flex;
  align-items: center;

  padding: 8px;

  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  &:hover {
    cursor: default;
    background-color: ${({ listEmpty }) => (listEmpty ? '' : 'rgba(254, 254, 254, 0.1)')};
  }
`;

const CloseListItem = styled.div`
  display: flex;
  justify-content: center;

  /* position: sticky;
  bottom: 0;
  left: 0; */

  width: 100%;
  height: max-content;
  padding: 6px;

  border-top: 1px solid ${({ theme }) => theme.trBorderClr};
  background-color: inherit;
  &:hover,
  &:active {
    background-color: inherit;
  }
`;

export default SearchParamInput;
