import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import { iconId } from 'data';
import styled from 'styled-components';
import { FilterSelectorDataType } from './AppFilter';
import React from 'react';
import { ApiDirType } from '../../redux/APP_CONFIGS';

export interface IFilterSelectorAddsProps {
  ListComp?: React.FC<any>;
}

export interface FilterSelectorProps {
  label: string;
  selectorName?: ApiDirType;
  data: FilterSelectorDataType[];
  idx: number;
  currentIdx: number | null;
  childrenListCount?: number;
  selectedChildrenCount?: number;
  CurrentData: any;
  onSelectorClick: (idx?: number) => void;
}

const Selector: React.FC<FilterSelectorProps & React.HTMLAttributes<Element>> = ({
  label = 'Selector label',
  selectorName,
  onSelectorClick,
  childrenListCount,
  selectedChildrenCount,
  currentIdx,
  data,
  idx,
  children,
}) => {
  return (
    <SelectorContainer>
      <StOpenButton
        variant="defNoEffects"
        isCurrent={currentIdx === idx}
        endIconId={iconId.SmallArrowDown}
        endIconSize="22px"
        onClick={() => onSelectorClick && onSelectorClick()}
      >
        <Label>{label}</Label>

        {/*<div>{`Обрано: ${selectedChildrenCount || 0}/${childrenListCount || 0}`}</div>*/}
      </StOpenButton>

      {currentIdx === idx ? <SelectorList>{children}</SelectorList> : null}
    </SelectorContainer>
  );
};
const SelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Label = styled.div`
  flex-grow: 1;

  display: flex;
  align-items: center;

  padding: 5px 8px;
`;
const StOpenButton = styled(ButtonIcon)<{ isCurrent: boolean }>`
  width: 100%;
  font-size: 12px;
  fill: ${({ theme }) => theme.accentColor.base};

  justify-content: space-between;

  background-color: ${({ theme }) => theme.fieldColor};

  border-color: ${({ isCurrent, theme }) => (isCurrent ? theme.accentColor.base : '')};

  & .endIcon {
    transform: ${({ isCurrent }) => `rotate(${isCurrent ? 180 : 0}deg)`};
  }

  // @media screen and (min-width: 768px) {
  //   & .endIcon {
  //     transform: ${({ isCurrent }) => `rotate(${isCurrent ? -90 : 90}deg)`};
  //   }
  // }
`;
const SelectorList = styled.div`
  overflow: hidden;
`;

export default Selector;
