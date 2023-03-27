import { useState } from 'react';
import Selector from './Selector';
import ModalDefault from 'components/ModalForm/ModalForm';

import styled from 'styled-components';
import SelectorItemsList from './SelectorItemsList';
import { IContractor, IDocument, IProject, ITrCategory } from 'data/transactions.types';

const contractors: IContractor[] = [
  { _id: 'ds6d5vf6sd5f1v64d', label: 'ФОП Петров' },
  { _id: 'ds6d5vs6sd6f1v4sd', label: 'ТОВ "Рога і копита"' },
  { _id: 'ds6d5vf6sd6f1v6sd', label: 'ТОВ "Дикі крила"' },
];
const categoriesArr: ITrCategory[] = [
  { _id: 'ds6d5vf6sd5f1v6sd', label: 'Офісні витрати', type: 'EXPENSE' },
  { _id: 'ds6d5vf6sd6f1v7sd', label: 'Транспорт', type: 'EXPENSE' },
  { _id: 'ds6d5vf6sd6f1v5sd', label: 'Обладнання', type: 'EXPENSE' },
];
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
}
const selectorsArr: IFilterSelector[] = [
  { label: 'Тип', data: transationTypes, name: 'type' },
  { label: 'Категорії', data: categoriesArr, name: 'category' },
  { label: 'Контрагенти', data: contractors, name: 'contractor' },
  { label: 'Документи', data: documents, name: 'document' },
  { label: 'Проєкти', data: projects, name: 'project' },
];
const Filter: React.FC = () => {
  const [current, setCurrent] = useState<IFilterSelector | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filterFormData, setFilterFormData] = useState();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectors, setSelectors] = useState(selectorsArr);

  function onSelectorClick(idx: number) {
    setCurrent(prev => (prev === selectors[idx] ? null : selectors[idx]));
  }

  function onFilterStateChange(item: any) {
    console.log(item);
  }

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
                  current={current}
                />
              ))}
            </SelectorsList>
          </LeftSide>

          <RightSide>
            <SelectorItemsList
              data={current && current.data ? current.data : selectors[0].data}
              onSelect={onFilterStateChange}
              selectorName={current?.name}
            />
          </RightSide>
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

  background-color: ${({ theme }) => theme.backgroundColorLight};
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
  background-color: ${({ theme }) => theme.backgroundColorSecondary};
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
