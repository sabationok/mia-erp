import { useState } from 'react';
import Selector from './Selector';
import ModalDefault from 'components/ModalForm/ModalForm';

import styled from 'styled-components';
import SelectedItemsList from './SelectedItemsList';

const contractors = [
  { _id: 'ds6d5vf6sd5f1v64d', name: 'ФОП Петров' },
  { _id: 'ds6d5vs6sd6f1v4sd', name: 'ТОВ "Рога і копита"' },
  { _id: 'ds6d5vf6sd6f1v6sd', name: 'ТОВ "Дикі крила"' },
];
const categoriesArr = [
  { _id: 'ds6d5vf6sd5f1v6sd', name: 'Офісні витрати', type: 'EXPENSE' },
  { _id: 'ds6d5vf6sd6f1v7sd', name: 'Транспорт', type: 'EXPENSE' },
  { _id: 'ds6d5vf6sd6f1v5sd', name: 'Обладнання', type: 'EXPENSE' },
];
const documents = [
  { _id: 'ds6d5vf6sd5f1v6sd', name: 'Чек №351351321' },
  { _id: 'ds6d5vf6sd6f1v3sd', name: 'Накладна №351351321' },
  { _id: 'ds6d5vf6dd6f1v2sd', name: 'Акт №351351321' },
];
const transationTypes = [
  { _id: 'ds6d5vf6sd5f1v6sd', name: 'INCOME', title: 'ДОХІД' },
  { _id: 'ds6d5vf6sd6f1v61d', name: 'TRANSFER', title: 'ПЕРЕКАЗ' },
  { _id: 'ds6d5vf6dd6f1v68d', name: 'EXPENSE', title: 'ВИТРАТИ' },
];

const Filter = () => {
  const [current, setCurrent] = useState(0);
  const selectorsArr = [
    { title: 'Тип', list: transationTypes, name: 'type' },
    { title: 'Категорії', list: categoriesArr, name: 'category' },
    { title: 'Контрагенти', list: contractors, name: 'contractor' },
    { title: 'Документи', list: documents, name: 'document' },
  ];
  const [selectors, setSelectors] = useState(selectorsArr);

  function onSelectorClick(idx) {
    setCurrent(prev => (prev === idx ? null : idx));
  }

  function onChange() {
    false && setSelectors();
  }

  return (
    <ModalDefault title="Фільтрація транзакцій">
      <FilterContainer>
        <DatePickers>
          <InputDate type="datetime-local" />
          <InputDate type="datetime-local" />
        </DatePickers>

        <Bottom>
          <LeftSide>
            <SelectorsList>
              {selectors.map(({ title, list }, idx) => (
                <Selector
                  key={title}
                  title={title}
                  list={list}
                  idx={idx}
                  onSelectorClick={() => onSelectorClick(idx)}
                  isCurrent={current === idx}
                />
              ))}
            </SelectorsList>
          </LeftSide>

          <RightSide>
            <div>{selectors[current]?.title}</div>

            <SelectedItemsList list={selectors[current]?.list} onChange={onChange} isOpen />
          </RightSide>
        </Bottom>
      </FilterContainer>
    </ModalDefault>
  );
};

const FilterContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: min-content 1fr;

  max-width: 100%;
  height: 98vh;
  min-height: 100%;
  max-height: 100%;

  color: inherit;
  @media screen and (min-width: 768px) {
    width: 680px;
  }
`;

const DatePickers = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  color: inherit;
  padding: 16px;
`;
const InputDate = styled.input`
  color: inherit;
  font-family: inherit;
  fill: inherit;

  height: 26px;
  padding: 5px 8px;

  border-radius: 2px;
  border: 1px solid ${({ theme }) => theme.trBorderClr};
  background-color: ${({ theme }) => theme.backgroundColorMain};
`;

const Bottom = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  min-height: 100%;
  max-height: 100%;
  overflow: auto;

  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;
const LeftSide = styled.div``;
const RightSide = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: min-content max-content;
  padding: 8px;

  background-color: ${({ theme }) => theme.backgroundColorMain};

  @media screen and (max-width: 768px) {
    display: none;
  }
`;
const SelectorsList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
  align-content: start;
  gap: 8px;

  padding: 4px 8px;
`;

export default Filter;
