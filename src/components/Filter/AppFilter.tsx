import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Selector from './Selector';
import ModalForm, { ModalFormProps } from 'components/ModalForm';
import { SubmitHandler } from 'react-hook-form';
import styled from 'styled-components';
import SelectorContent from './SelectorContent/SelectorContent';
import { ICount } from 'redux/directories/counts.types';
import { ITrCategory } from 'types/directories.types';
import { IContractor } from 'redux/directories/contractors.types';
import { IProject } from 'types/finances/transactions.types';
import { ApiDirType } from 'redux/APP_CONFIGS';
import InputLabel from '../atoms/Inputs/InputLabel';
import InputText from '../atoms/Inputs/InputText';
import { useAppForm } from '../../hooks';
import { FilterOption } from '../atoms/TabSelector';
import FlexBox from '../atoms/FlexBox';

export type FilterSelectorDataType = ICount | ITrCategory | IContractor | IProject | FilterOption;

export type FilterSelectorType<Key = any, DataType = any> = {
  selectorName?: Key;
  dirType?: ApiDirType;
  queryName?: string;
  label: string;
  data: DataType[];
};

// {
// [ApiDirType.CATEGORIES_PROD]?: string[];
// [ApiDirType.CATEGORIES_TR]?: string[];
// [ApiDirType.COUNTS]?: string[];
// [ApiDirType.CONTRACTORS]?: string[];
// [ApiDirType.DOCUMENTS]?: string[];
// [ApiDirType.PROJECTS]?: string[];
// [ApiDirType.ACTIVITIES]?: string[];
// [ApiDirType.MARKS]?: string[];
// }
export type FilterQueryType = Record<ApiDirType & string, string[] | undefined>;
export type OnFilterValueChangeHandler = (key: ApiDirType & string, value?: string[]) => void;

export type FilterReturnDataType = FilterQueryType & {
  timeFrom?: number | string;
  timeTo?: number | string;
};

// const validation = yup.object().shape({
//   type: yup.array().of(yup.string()).optional(),
//   categories: yup.array().of(yup.string()).optional(),
//   counts: yup.array().of(yup.string()).optional(),
//   contractors: yup.array().of(yup.string()).optional(),
//   managers: yup.array().of(yup.string()).optional(),
//   marks: yup.array().of(yup.string()).optional(),
// });

export interface AppFilterProps extends Omit<ModalFormProps, 'defaultFilterValue' | 'onSubmit'> {
  filterSelectors?: FilterSelectorType[];
  filterDefaultValues?: Partial<FilterReturnDataType>;
  onFilterSubmit?: SubmitHandler<FilterReturnDataType>;
  onSubmit?: SubmitHandler<FilterReturnDataType>;
}

const AppFilter = (props: AppFilterProps) => {
  if (!props.filterSelectors) {
    return <SelectorErr>{'Filter selectors are not passed'}</SelectorErr>;
  }

  if (!Array.isArray(props.filterSelectors) || props.filterSelectors.some(sel => !isSelectorType(sel))) {
    return <SelectorErr>{'Invalid filter selectors'}</SelectorErr>;
  }

  return <Filter {...props} />;
};

const Filter: React.FC<AppFilterProps> = ({
  onSubmit,
  onClose,
  filterSelectors,
  filterDefaultValues,
  onFilterSubmit,
  ...props
}) => {
  const [CurrentData, setCurrentData] = useState<FilterSelectorType | null>(
    filterSelectors ? filterSelectors[0] : null
  );
  const [currentIdx, setCurrentIdx] = useState<number | null>(0);

  const { register, unregister, handleSubmit, setValue, formValues } = useAppForm<FilterReturnDataType>({
    defaultValues: filterDefaultValues,
  });

  const onFilterValueChange: OnFilterValueChangeHandler = useCallback(
    (name, value) => {
      if (name && value) return setValue(name, value);
      if (!value) return unregister(name);
    },
    [setValue, unregister]
  );

  useEffect(() => {
    console.log('filter formValues', formValues);
  }, [formValues]);

  const handleOpenSelector = useCallback(
    (idx: number) => {
      setCurrentIdx(idx);
      filterSelectors && setCurrentData(filterSelectors[idx]);
    },
    [filterSelectors]
  );

  const renderSelectors = useMemo(
    () =>
      filterSelectors?.map((selector, idx) => {
        if (selector.data.length === 0) {
          return <></>;
        }
        return (
          <Selector
            key={selector.selectorName}
            {...selector}
            childrenListCount={1}
            selectedChildrenCount={1}
            idx={idx}
            onSelectorClick={() => handleOpenSelector(idx)}
            currentIdx={currentIdx}
            CurrentData={CurrentData}
          >
            <SelectorContent
              getDefaultValue={(selectorName?: ApiDirType) => (selectorName && formValues[selectorName]) || []}
              onSelectorSubmit={onFilterValueChange}
              onSelectorChange={onFilterValueChange}
              {...selector}
            />
          </Selector>
        );
      }),
    [CurrentData, currentIdx, filterSelectors, formValues, onFilterValueChange, handleOpenSelector]
  );

  const onValid = (data: FilterReturnDataType) => {
    onFilterSubmit && onFilterSubmit(data);
    onSubmit && onSubmit(data);
    onClose && onClose();
  };

  // const renderSelectorContent = useMemo(() =>
  //     (<SelectorContent
  //       defaultValue={CurrentData?.selectorName ? filterData[CurrentData?.selectorName] : []}
  //       onSelectorSubmit={onFilterValueChange}
  //       data={CurrentData?.data || []}
  //       selectorName={CurrentData?.selectorName}
  //       ListComp={CurrentData?.ListComp}
  //     />),
  //   [CurrentData?.ListComp, CurrentData?.data, CurrentData?.selectorName, filterData, onFilterValueChange]);

  return (
    <StModalForm fillHeight {...props} onSubmit={handleSubmit(onValid)}>
      <FilterContainer>
        <DatePickers>
          <InputLabel label={'Від (дата і час)'}>
            <InputText type={'datetime-local'} placeholder={'Від (дата і час)'} {...register('timeFrom')} />
          </InputLabel>

          <InputLabel label={'Від (дата і час)'}>
            <InputText type={'datetime-local'} placeholder={'До (дата і час)'} {...register('timeTo')} />
          </InputLabel>
        </DatePickers>

        <Bottom>
          <LeftSide>
            <SelectorsList fillWidth padding={'0 2px'}>
              {renderSelectors}
            </SelectorsList>
          </LeftSide>
        </Bottom>
      </FilterContainer>
    </StModalForm>
  );
};

const StModalForm = styled(ModalForm)`
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
  gap: 8px;

  padding: 0 8px 8px;

  color: inherit;
  width: 100%;

  border-bottom: 1px solid ${p => p.theme.modalBorderColor};
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

  padding: 8px 0;

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
const SelectorsList = styled(FlexBox)`
  gap: 8px;

  max-height: 100%;
  min-height: 100%;
  overflow: auto;
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
