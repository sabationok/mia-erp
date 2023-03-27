import ButtonIcon from 'components/ButtonIcon/ButtonIcon';
import { iconId } from 'data';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

export interface SelectorListItem {
  label?: string;
  _id?: string;
  checked?: boolean;
}

export interface ISelectorItemsList {
  onSelect: (item: SelectorListItem) => void;
  isOpen?: boolean;
  data: SelectorListItem[];
  selectorName?: string;
}

const SelectorItemsList: React.FC<ISelectorItemsList & React.HTMLAttributes<HTMLDivElement>> = ({
  isOpen = false,
  onSelect,
  data,
  selectorName,
  ...props
}) => {
  const [searchParam, setSearchParam] = useState<string>();
  const [filteredData, setFilteredData] = useState<SelectorListItem[]>(data || []);

  function onInputChange(ev: React.ChangeEvent<HTMLInputElement>) {
    const { value } = ev.target;
    setSearchParam(value);
    // setInputValue(prev => {
    //   return { ...prev, [name]: value };
    // });
  }
  function onSerchParamReset() {
    setSearchParam('');
  }

  useEffect(() => {
    // console.log('select data', data);
    if (data?.length === 0) {
      return;
    }

    const filteredData = data?.filter(el => {
      if (searchParam && el?.label)
        return !(searchParam && !el.label.toLowerCase().includes(searchParam.toLowerCase()));

      return true;
    });

    filteredData && setFilteredData(filteredData);
  }, [data, searchParam]);

  return (
    <ListContainer {...props}>
      <StyledLabel htmlFor={selectorName}>
        <SearchInput type="text" name={selectorName} placeholder="Пошук" value={searchParam} onChange={onInputChange} />

        <StResetInputButton variant="onlyIcon" size="26px" iconId={iconId.close} onClick={onSerchParamReset} />
      </StyledLabel>

      <SelectList isOpen={isOpen}>
        {filteredData.map((item, idx) => (
          <SelectListItem key={idx}>
            <ButtonIcon
              size="26px"
              variant="onlyIcon"
              iconId={item?.checked ? iconId.checkBoxOn : iconId.checkBoxOff}
              aria-checked={!!item?.checked}
              onClick={() => onSelect && onSelect(item)}
            />

            <span>{item?.label}</span>
          </SelectListItem>
        ))}
      </SelectList>
    </ListContainer>
  );
};

const StyledLabel = styled.label`
  position: relative;

  border-style: none;
  border-image: none;
  border-width: 0;

  &::before {
    display: block;
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    height: 2px;
    width: 0;
    transition: all ${({ theme }) => theme.globals.timingFnMui};
    transform: translate(-50%);
    background-color: ${({ theme }) => theme.accentColor.base};
  }

  &:focus-within {
    &::before {
      width: 100%;
    }
  }
`;
const SearchInput = styled.input`
  height: 100%;
  width: 100%;
  padding: 4px 30px 4px 8px;

  font-size: 12px;
  font-family: inherit;
  color: inherit;

  &::placeholder {
    color: ${({ theme }) => theme.globals.inputPlaceholderColor};
  }
  background-color: transparent;

  border-style: none;
  border-bottom: 1px solid ${({ theme }) => theme.globals.inputBorder};
  &:hover,
  &:focus {
    /* border-bottom-color: ${({ theme }) => theme.accentColor.hover}; */
    outline-style: none;
  }
`;
const ListContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 28px 1fr;

  width: 100%;
  height: 100%;
  max-height: 100%;
  overflow: hidden;
  color: ${({ theme }) => theme.fontColorHeader};

  border-radius: 2px;
  background-color: ${({ theme }) => theme.backgroundColorSecondary};
`;
const StResetInputButton = styled(ButtonIcon)`
  position: absolute;

  right: 0;
  top: 0;
`;

const SelectList = styled.ul<{ isOpen: boolean }>`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: 22px;

  padding: 8px 0;
  gap: 2px;

  width: 100%;
  max-height: 100%;
  overflow: auto;

  /* background-color: #323234; */
`;
const SelectListItem = styled.li`
  display: flex;
  align-items: center;

  gap: 8px;

  padding: 0 8px;

  border-radius: 2px;
`;

export default SelectorItemsList;
