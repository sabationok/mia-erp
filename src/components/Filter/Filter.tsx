import { useState, useEffect } from 'react';
import Selector from './Selector';
import ModalDefault from 'components/ModalForm/ModalForm';

import styled from 'styled-components';
import SelectorContent from './SelectorContent/SelectorContent';
import { IContractor, IDocument, IProject } from 'data/transactions.types';
import SelectsList from './SelectorContent/SelectsList';
import { MinDesktop, MinTabletXl } from 'components/atoms/DeviceTypeInformer/DeviceTypeController';

const contractors: IContractor[] = [
  { _id: 'ds6d5vf6sd5f1v64d', label: 'ФОП Петров' },
  { _id: 'ds6d5vs6sd6f1v4sd', label: 'ТОВ "Рога і копита"' },
  { _id: 'ds6d5vf6sd6f1v6sd', label: 'ТОВ "Дикі крила"' },
];
// const categoriesArr: ITrCategory[] = [
//   { _id: 'ds6d5vf6sd5f1v6sd', label: 'Офісні витрати', type: 'EXPENSE', owner: '' },
//   { _id: 'ds6d5vf6sd6f1v7sd', label: 'Транспорт', type: 'EXPENSE' },
//   { _id: 'ds6d5vf6sd6f1v5sd', label: 'Обладнання', type: 'EXPENSE' },
//   { _id: 'ds6d5vf6sd6f1v5sd', label: 'Обладнання', type: 'EXPENSE' },
// ];
const documents: IDocument[] = [
  { _id: 'ds6d5vf6sd5f1v6sd', label: 'Чек №351351321' },
  { _id: 'ds6d5vf6sd6f1v3sd', label: 'Накладна №351351321' },
  { _id: 'ds6d5vf6dd6f1v2sd', label: 'Акт №351351321' },
];
const projects: IProject[] = [
  { _id: 'ds6d5vf6sd5f1v6sd', label: 'ЖК "Авалон"' },
  { _id: 'ds6d5vf6sd6f1v61d', label: 'ЖК "Захід"' },
  { _id: 'ds6d5vf6dd6f1v68d', label: 'ЖК "Люксар"' },
];
const transationTypes = [
  { _id: 'ds6d5vf6sd5f1v6sd', name: 'INCOME', label: 'ДОХІД' },
  { _id: 'ds6d5vf6sd6f1v61d', name: 'TRANSFER', label: 'ПЕРЕКАЗ' },
  { _id: 'ds6d5vf6dd6f1v68d', name: 'EXPENSE', label: 'ВИТРАТИ' },
];
export interface IFilterSelector {
  label: string;
  data: any[];
  name: string;
  ListComp: React.FC<any>;
}
const selectorsArr: IFilterSelector[] = [
  { label: 'Тип', data: transationTypes, name: 'type', ListComp: SelectsList },
  // { label: 'Категорії', data: categoriesArr, name: 'category' },
  { label: 'Контрагенти', data: contractors, name: 'contractor', ListComp: SelectsList },
  { label: 'Документи', data: documents, name: 'document', ListComp: SelectsList },
  { label: 'Проєкти', data: projects, name: 'project', ListComp: SelectsList },
];
const Filter: React.FC = () => {
  const [selectors] = useState<IFilterSelector[]>(selectorsArr);
  const [CurrentData, setCurrentData] = useState<IFilterSelector>(selectors[0]);
  const [currentIdx, setCurrentIdx] = useState<number | null>(0);

  function onSelectorClick(idx: number) {
    setCurrentIdx(prev => (prev === idx ? null : idx));
  }

  function onFilterStateChange(item: any) {
    console.log(item);
  }

  useEffect(() => {
    if (!currentIdx) return;

    setCurrentData(selectors[currentIdx]);
  }, [currentIdx, selectors]);

  return (
    <ModalDefSt title="Фільтрація транзакцій">
      <FilterContainer>
        <DatePickers>
          <InputDate type="datetime-local" />
          <InputDate type="datetime-local" />
        </DatePickers>

        <Bottom>
          <LeftSide>
            <SelectorsList>
              {selectorsArr.map(({ name, label, data }, idx) => (
                <Selector
                  key={name}
                  label={label}
                  data={data}
                  selectorName={name}
                  idx={idx}
                  onSelectorClick={() => onSelectorClick(idx)}
                  currentIdx={currentIdx}
                  CurrentData={CurrentData}
                >
                  <SelectorContent
                    data={CurrentData.data}
                    onSelect={onFilterStateChange}
                    selectorName={CurrentData?.name}
                    ListComp={CurrentData.ListComp}
                  />
                </Selector>
              ))}
            </SelectorsList>
          </LeftSide>

          <MinTabletXl>
            <RightSide>
              <SelectorContent
                data={CurrentData && CurrentData.data ? CurrentData.data : selectors[0].data}
                onSelect={onFilterStateChange}
                selectorName={CurrentData?.name}
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
  gap: 12px;

  max-width: 100%;

  min-height: 100%;
  max-height: 100%;

  padding: 8px;
  overflow: hidden;

  color: inherit;

  background-color: ${({ theme }) => theme.backgroundColorSecondary};
  @media screen and (min-width: 768px) {
    padding: 16px;
  }
`;

const DatePickers = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  color: inherit;

  width: 100%;
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
  gap: 16px;

  width: 100%;
  max-width: 100%;
  min-height: 100%;
  max-height: 100%;

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
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
const SelectorsList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
  gap: 12px;

  max-height: 100%;
  overflow: auto;
`;

export default Filter;
