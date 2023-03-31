import { useState } from 'react';
import Selector from './Selector';
import ModalDefault from 'components/ModalForm/ModalForm';

import styled from 'styled-components';
import SelectorContent from './SelectorContent/SelectorContent';
import SelectsList from './SelectorContent/SelectsList';
import { MinTabletXl } from 'components/atoms/DeviceTypeInformer/DeviceTypeController';

import { useCategoriesSelector } from 'redux/categories/useCategoriesService.hook';
import { useCountsSelector } from 'redux/selectors.store';
import { ICount } from 'data/counts.types';
import { ICategory } from 'data/categories.types';

const useFilterSelectors = (): SelectorType[] => {
  const transationTypes = [
    { _id: 'ds6d5vf6sd5f1v6sd', name: 'INCOME', label: 'ДОХІД' },
    { _id: 'ds6d5vf6sd6f1v61d', name: 'TRANSFER', label: 'ПЕРЕКАЗ' },
    { _id: 'ds6d5vf6dd6f1v68d', name: 'EXPENSE', label: 'ВИТРАТИ' },
  ];

  const selectors: SelectorType[] = [
    {
      label: 'Тип',
      data: transationTypes,
      selectorName: 'type',
      ListComp: SelectsList,
    },
    {
      label: 'Рахунки',
      data: useCountsSelector().counts,
      selectorName: 'categories',
      ListComp: SelectsList,
    },
    {
      label: 'Категорії',
      data: useCategoriesSelector().categories,
      selectorName: 'counts',
      ListComp: SelectsList,
    },
  ];

  return selectors;
};
export type FilterSelectorDataType = ICount[] | ICategory[] | any[];
export type SelectorType = {
  selectorName: string;
  label: string;
  data: FilterSelectorDataType;
  ListComp: React.FC<any>;
};
const Filter: React.FC = () => {
  const selectors = useFilterSelectors();
  const [CurrentData, setCurrentData] = useState<SelectorType>(selectors[0]);
  const [currentIdx, setCurrentIdx] = useState<number | null>(0);

  function onSelectorClick(idx: number) {
    setCurrentIdx(idx);
    if (typeof idx === 'number') setCurrentData(selectors[idx]);
  }
  function onFilterStateChange(item: any) {
    console.log('onFilterStateChange', item);
  }

  return (
    <ModalDefSt title="Фільтрація транзакцій">
      <FilterContainer>
        <DatePickers>
          <InputDate type="datetime-local" placeholder="Дата і час" />
          <InputDate type="datetime-local" placeholder="Дата і час" />
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
                data={CurrentData.data}
                onSelect={onFilterStateChange}
                selectorName={CurrentData.selectorName}
                ListComp={CurrentData.ListComp}
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

  background-color: ${({ theme }) => theme.backgroundColorSecondary};
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
  color: inherit;
  font-family: inherit;
  fill: inherit;

  height: 26px;
  padding: 5px 8px;
  width: 100%;

  border-radius: 2px;
  border: 1px solid ${({ theme }) => theme.trBorderClr};
  background-color: ${({ theme }) => theme.backgroundColorLight};
  color: ${({ theme }) => theme.fillColorHeader};
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

export default Filter;
