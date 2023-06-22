import React, { useCallback, useMemo, useState } from 'react';
import Selector from './Selector';
import ModalDefault, { ModalFormProps } from 'components/ModalForm';
import { SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';
import SelectorContent from './SelectorContent/SelectorContent';
import { ICount } from 'redux/directories/counts.types';
import { ICategory } from 'redux/directories/categories.types';
import InputTextPrimary from '../atoms/Inputs/InputTextPrimary';
import { IContractor } from '../../redux/contractors/contractors.types';
import { IProject } from '../../redux/transactions/transactions.types';
import { ApiDirType } from '../../redux/APP_CONFIGS';

export type FilterSelectorDataType = ICount | ICategory | IContractor | IProject | any;
export type FilterSelectorType = {
  selectorName?: ApiDirType;
  queryName?: string;
  label: string;
  data: FilterSelectorDataType[];
};

export interface FilterReturnDataType extends Record<ApiDirType | string, string[] | undefined> {
  [ApiDirType.CATEGORIES_PROD]?: string[];
  [ApiDirType.CATEGORIES_TR]?: string[];
  [ApiDirType.COUNTS]?: string[];
  [ApiDirType.CONTRACTORS]?: string[];
  [ApiDirType.DOCUMENTS]?: string[];
  [ApiDirType.PROJECTS]?: string[];
  [ApiDirType.ACTIVITIES]?: string[];
  [ApiDirType.MARKS]?: string[];
}

// const validation = yup.object().shape({
//   type: yup.array().of(yup.string()).optional(),
//   categories: yup.array().of(yup.string()).optional(),
//   counts: yup.array().of(yup.string()).optional(),
//   contractors: yup.array().of(yup.string()).optional(),
//   managers: yup.array().of(yup.string()).optional(),
//   marks: yup.array().of(yup.string()).optional(),
// });

export interface FilterProps extends Omit<ModalFormProps, 'defaultFilterValue' | 'onSubmit'> {
  filterSelectors?: FilterSelectorType[];
  filterDefaultValues?: Partial<Record<ApiDirType, string[] | any[]>>;
  onFilterSubmit?: SubmitHandler<FilterReturnDataType>;
}

const AppFilter: React.FC<FilterProps> = props => {
  if (!props.filterSelectors) {
    return <SelectorErr>'Filter selectors' not passed</SelectorErr>;
  }

  if (!Array.isArray(props.filterSelectors) || props.filterSelectors.some(sel => !isSelectorType(sel))) {
    return <SelectorErr>Invalid filter selectors</SelectorErr>;
  }

  return <Filter {...props} />;
};

const Filter: React.FC<FilterProps> = ({ filterSelectors, filterDefaultValues, onFilterSubmit, ...props }) => {
  const [CurrentData, setCurrentData] = useState<FilterSelectorType | null>(
    filterSelectors ? filterSelectors[0] : null
  );
  const [currentIdx, setCurrentIdx] = useState<number | null>(0);

  const {
    // formState: { errors },
    // register,
    unregister,
    handleSubmit,
    setValue,

    watch,
  } = useForm<FilterReturnDataType>({
    defaultValues: filterDefaultValues,
    reValidateMode: 'onSubmit',
  });
  const formValues = watch();

  const onFilterDataChange = useCallback(
    (name: ApiDirType, value?: string[]) => {
      if (name && value) setValue(name, value);
      if (!value) unregister(name);
    },
    [setValue, unregister]
  );

  const onSelectorClick = useCallback(
    (idx: number) => {
      setCurrentIdx(idx);
      filterSelectors && setCurrentData(filterSelectors[idx]);
    },
    [filterSelectors]
  );

  const renderSelectors = useMemo(
    () =>
      filterSelectors?.map(({ selectorName, label, data }, idx) => (
        <Selector
          key={selectorName}
          label={label}
          data={data}
          selectorName={selectorName}
          childrenListCount={1}
          selectedChildrenCount={1}
          idx={idx}
          onSelectorClick={() => onSelectorClick(idx)}
          currentIdx={currentIdx}
          CurrentData={CurrentData}
        >
          <SelectorContent
            getDefaultValue={(selectorName?: ApiDirType) => (selectorName && formValues[selectorName]) || []}
            onSelectorSubmit={onFilterDataChange}
            data={data}
            selectorName={selectorName}
          />
        </Selector>
      )),
    [CurrentData, currentIdx, filterSelectors, formValues, onFilterDataChange, onSelectorClick]
  );

  // const renderSelectorContent = useMemo(() =>
  //     (<SelectorContent
  //       defaultValue={CurrentData?.selectorName ? filterData[CurrentData?.selectorName] : []}
  //       onSelectorSubmit={onFilterDataChange}
  //       data={CurrentData?.data || []}
  //       selectorName={CurrentData?.selectorName}
  //       ListComp={CurrentData?.ListComp}
  //     />),
  //   [CurrentData?.ListComp, CurrentData?.data, CurrentData?.selectorName, filterData, onFilterDataChange]);

  return (
    <StModalDefault {...props} onSubmit={onFilterSubmit ? handleSubmit(onFilterSubmit) : undefined}>
      <FilterContainer>
        <DatePickers>
          <InputTextPrimary
            label="Від (дата і час)"
            type="datetime-local"
            name={'timeFrom'}
            placeholder="Від (дата і час)"
          />
          <InputTextPrimary
            label="До (дата і час)"
            type="datetime-local"
            name={'timeTo'}
            placeholder="До (дата і час)"
          />
        </DatePickers>

        <Bottom>
          <LeftSide>
            <SelectorsList>{renderSelectors}</SelectorsList>
          </LeftSide>
        </Bottom>
      </FilterContainer>
    </StModalDefault>
  );
};

const StModalDefault = styled(ModalDefault)`
  height: 98vh;
  max-width: 480px;
  //@media screen and (min-width: 768px) {
  //  width: 680px;
  //}
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
  @media screen and (min-width: 768px) {
    /* padding: 16px; */
  }
`;

const DatePickers = styled.div`
  display: grid;

  grid-template-columns: 1fr 1fr;
  gap: 12px;

  color: inherit;
  padding: 12px;

  width: 100%;

  //@media screen and (min-width: 480px) {
  //  gap: 24px;
  //  grid-template-columns: 1fr 1fr;
  //}
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

  //@media screen and (min-width: 768px) {
  //  grid-template-columns: 1fr 1fr;
  //}
`;
const Side = styled.div`
  position: relative;

  max-height: 100%;
  overflow: hidden;
`;
const LeftSide = styled(Side)``;
// const RightSide = styled(Side)`
//   padding: 0 12px;
//   @media screen and (max-width: 768px) {
//     display: none;
//   }
// `;
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

  background-color: ${({ theme }) => theme.modalBackgroundColor};
`;

function isSelectorType(obj: any): obj is FilterSelectorType {
  return (
    typeof (obj.selectorName === 'string' || typeof obj.queryName === 'string') &&
    typeof obj.label === 'string' &&
    Array.isArray(obj.data)
  );
}

export default AppFilter;
