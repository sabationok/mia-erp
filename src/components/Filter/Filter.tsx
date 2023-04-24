import { useState } from 'react';
import Selector from './Selector';
import ModalDefault, { ModalFormProps } from 'components/ModalForm/ModalForm';

import styled from 'styled-components';
import SelectorContent from './SelectorContent/SelectorContent';
import { MinTabletXl } from 'components/atoms/DeviceTypeInformer/DeviceTypeController';

import { ICount } from 'redux/counts/counts.types';
import { ICategory } from 'redux/categories/categories.types';
import InputTextPrimary from '../atoms/Inputs/InputTextPrimary';

export type FilterSelectorDataType = ICount[] | ICategory[] | any[];
export type FilterSelectorType = {
  selectorName: string;
  label: string;
  data: FilterSelectorDataType;
  ListComp: React.FC<any>;
};

export interface FilterProps extends ModalFormProps {
  useFilterSelectors: () => FilterSelectorType[] | [];
}

const Filter: React.FC<FilterProps> = props => {
  const { useFilterSelectors, ...restProps } = props;
  if (!useFilterSelectors) {
    return <SelectorErr>'useFilterSelectors' not passed</SelectorErr>;
  }

  if (typeof useFilterSelectors !== 'function') {
    return <SelectorErr>'useFilterSelectors' not function</SelectorErr>;
  }

  const selectors = props.useFilterSelectors();
  if (!Array.isArray(selectors) || selectors.some(sel => !isSelectorType(sel))) {
    return <SelectorErr>Invalid filter selectors</SelectorErr>;
  }

  return <AppFilter useFilterSelectors={props.useFilterSelectors} {...restProps} />;
};

const AppFilter: React.FC<FilterProps & ModalFormProps> = ({ useFilterSelectors, ...props }) => {
  const selectors = useFilterSelectors();
  const [CurrentData, setCurrentData] = useState<FilterSelectorType | null>(selectors[0]);
  const [currentIdx, setCurrentIdx] = useState<number | null>(0);

  function onSelectorClick(idx: number) {
    setCurrentIdx(idx);
    setCurrentData(selectors[idx]);
  }

  function onFilterStateChange(item: any) {
    console.log('onFilterStateChange', item);
  }

  return (
    <ModalDefSt {...props}>
      <FilterContainer>
        <DatePickers>
          <InputTextPrimary label='Від (дата і час)' type='datetime-local' placeholder='Від (дата і час)' />
          <InputTextPrimary label='До (дата і час)' type='datetime-local' placeholder='До (дата і час)' />
        </DatePickers>

        <Bottom>
          <LeftSide>
            <SelectorsList>
              {selectors.map(({ selectorName, label, data, ListComp }, idx) => (
                <Selector
                  key={selectorName}
                  label={label}
                  data={data}
                  selectorName={selectorName}
                  idx={idx}
                  onSelectorClick={() => onSelectorClick(idx)}
                  currentIdx={currentIdx}
                  CurrentData={CurrentData}
                >
                  <SelectorContent
                    data={data}
                    onSelect={onFilterStateChange}
                    selectorName={selectorName}
                    ListComp={ListComp}
                  />
                </Selector>
              ))}
            </SelectorsList>
          </LeftSide>

          <MinTabletXl>
            <RightSide>
              <SelectorContent
                data={CurrentData?.data || []}
                onSelect={onFilterStateChange}
                selectorName={CurrentData?.selectorName}
                ListComp={CurrentData?.ListComp}
              />
            </RightSide>
          </MinTabletXl>
        </Bottom>
      </FilterContainer>
    </ModalDefSt>
  );
};

const ModalDefSt = styled(ModalDefault)`
  height: 98vh;
  @media screen and (min-width: 768px) {
    width: 680px;
  }
`;

const FilterContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: min-content 1fr;

  max-width: 100%;
  height: 100%;

  min-height: 100%;
  max-height: 100%;

  overflow: hidden;
  color: inherit;

    // background-color: ${({ theme }) => theme.backgroundColorSecondary};
  @media screen and (min-width: 768px) {
    /* padding: 16px; */
  }
`;

const DatePickers = styled.div`
  display: grid;

  grid-template-columns: 1fr;
  gap: 12px;

  color: inherit;
  padding: 12px;

  width: 100%;

  @media screen and (min-width: 480px) {
    gap: 24px;
    grid-template-columns: 1fr 1fr;
  }
`;
const InputDate = styled.input`
  font-family: inherit;
  fill: currentColor;

  height: 26px;
  padding: 5px 8px;
  width: 100%;
  color: ${({ theme }) => theme.fillColorHeader};

  border-radius: 2px;
  border: 1px solid ${({ theme }) => theme.trBorderClr};
  background-color: ${({ theme }) => theme.backgroundColorLight};

  &::placeholder {
    color: ${({ theme }) => theme.globals.inputPlaceholderColor};
  }
`;

const Bottom = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  width: 100%;
  max-width: 100%;
  min-height: 100%;
  max-height: 100%;

  padding-bottom: 12px;

  overflow: hidden;

  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;
const Side = styled.div`
  position: relative;

  max-height: 100%;
  overflow: hidden;
`;
const LeftSide = styled(Side)``;
const RightSide = styled(Side)`
  padding: 0 12px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
const SelectorsList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 12px;

  max-height: 100%;
  min-height: 100%;
  overflow: auto;

  padding: 0 12px;
`;

const SelectorErr = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 14px;
  font-weight: 500;

  width: 250px;
  height: 250px;

  color: ${({ theme }) => theme.fontColor};

  background-color: ${({ theme }) => theme.backgroundColorMain};
`;

// define a type guard to check if an object is of type SelectorType
function isSelectorType(obj: any): obj is FilterSelectorType {
  return (
    typeof obj.selectorName === 'string' &&
    typeof obj.label === 'string' &&
    Array.isArray(obj.data) &&
    typeof obj.ListComp === 'function'
  );
}

export default Filter;
