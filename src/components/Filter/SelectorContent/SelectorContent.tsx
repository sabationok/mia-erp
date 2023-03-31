import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import { iconId } from 'data';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FilterSelectorProps, IFilterSelectorAddsProps } from '../Selector';

export interface SelectorListItem {
  label?: string;
  name?: string;
  _id?: string;
  checked?: boolean;
}

export interface SelectorContentProps {
  onSelect: (item: SelectorListItem) => void;
  isOpen?: boolean;
}

const SelectorContent: React.FC<
  SelectorContentProps &
    Pick<FilterSelectorProps, 'selectorName' | 'data'> &
    Pick<IFilterSelectorAddsProps, 'ListComp'> &
    React.HTMLAttributes<HTMLDivElement>
> = ({ isOpen = false, onSelect, data, selectorName, ListComp, ...props }) => {
  // const data = useData();
  const [searchParam, setSearchParam] = useState<string>('');
  const [filteredData, setFilteredData] = useState<SelectorListItem[]>(data || []);

  function onInputChange(ev: React.ChangeEvent<HTMLInputElement>) {
    const { value } = ev.target;
    setSearchParam(value);
  }
  function onSerchParamReset() {
    setSearchParam('');
  }
  function onSelectAllClick(status?: boolean) {
    setFilteredData(_prev => {
      if (searchParam) {
        return filteredData?.map(el => {
          return { ...el, checked: status ? status : false };
        });
      }

      return data?.map(el => {
        return { ...el, checked: status ? status : false };
      });
    });
  }

  useEffect(() => {
    if (data?.length === 0) {
      return;
    }

    const filteredData = data?.filter((el: any) => {
      if (searchParam && el?.name) return !(searchParam && !el.name.toLowerCase().includes(searchParam.toLowerCase()));

      if (searchParam && el?.label)
        return !(searchParam && !el.label.toLowerCase().includes(searchParam.toLowerCase()));

      return true;
    });

    filteredData && setFilteredData(filteredData);
  }, [data, searchParam]);

  return (
    <Content {...props}>
      <StyledLabel>
        <SearchInput type="text" name={selectorName} placeholder="Пошук" value={searchParam} onChange={onInputChange} />

        <ButtonIcon variant="onlyIcon" size="26px" iconId={iconId.close} onClick={onSerchParamReset} />
      </StyledLabel>

      {filteredData.length > 0 && ListComp ? (
        <ListComp
          isOpen={isOpen}
          mapedData={filteredData}
          onSelect={(data: SelectorListItem) => {
            if (selectorName) {
              console.log({ [selectorName]: data });
            }
          }}
        />
      ) : (
        <NotFound>Нчіого не знайдено</NotFound>
      )}

      <AcceptButtons>
        <ButtonIcon variant="onlyIcon" size="26px" iconId={iconId.done} />

        <ButtonIcon variant="onlyIcon" size="26px" iconId={iconId.doneAll} onClick={() => onSelectAllClick(true)} />

        <ButtonIcon variant="onlyIcon" size="26px" iconId={iconId.close} onClick={() => onSelectAllClick()} />
      </AcceptButtons>
    </Content>
  );
};
const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 28px 1fr 28px;

  width: 100%;
  /* height: 100%; */
  height: 250px;
  max-height: 100%;
  overflow: hidden;
  color: ${({ theme }) => theme.fontColorHeader};

  border-radius: 2px;
  background-color: ${({ theme }) => theme.backgroundColorLight};

  @media screen and (min-width: 768px) {
    height: 100%;
  }
`;
const StyledLabel = styled.label`
  display: flex;

  position: relative;

  border-style: none;
  border-image: none;
  border-width: 0;
  border-bottom: 1px solid ${({ theme }) => theme.globals.inputBorder};

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

  &:hover,
  &:focus {
    /* border-bottom-color: ${({ theme }) => theme.accentColor.hover}; */
    outline-style: none;
  }
`;

const NotFound = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AcceptButtons = styled.div`
  display: flex;
  justify-content: end;
  gap: 16px;

  border-top: 1px solid ${({ theme }) => theme.globals.inputBorder};
`;

export default SelectorContent;
