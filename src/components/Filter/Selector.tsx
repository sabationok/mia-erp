import ButtonIcon from 'components/ButtonIcon/ButtonIcon';
import { iconId } from 'data';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

// import { MaxToTablet } from 'components/DeviceTypeInformer/DeviceTypeController';

export interface FilterSelectorProps {
  label: string;
  name?: string;
  list?: any[];
  idx: number;
  current: number | null;
  onCheckAll?: () => void;
  onSelectorClick: (idx?: number) => void;
}
const Selector: React.FC<FilterSelectorProps> = ({
  label = 'Selector label',
  list = [],
  name = 'selector',
  onSelectorClick,
  current,
  onCheckAll,
  idx,
}) => {
  const [selectedItems, setSelectedItem] = useState<any[]>(list);
  const [isActive, setIsActive] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function onChange(id: string) {
    setSelectedItem(prev =>
      prev.map(el => {
        if (el._id === id) return { ...el, checked: !el?.checked };

        return el;
      })
    );
  }
  function onResetFilter() {
    setSelectedItem(prev =>
      prev.map(el => {
        return { ...el, checked: false };
      })
    );
  }

  useEffect(() => {
    setIsActive(selectedItems.some(el => el.checked));
  }, [selectedItems]);

  return (
    <SelectorContainer>
      <StyledSelector isCurrent={current === idx}>
        <ButtonIcon
          size="26px"
          variant="def"
          iconId={iconId.checkBoxOff}
          iconSize="22px"
          onClick={() => onCheckAll && onCheckAll()}
        />

        <SelectorBody isCurrent={current === idx}>
          <Label>{label}</Label>

          <ButtonIcon
            size="26px"
            variant="def"
            iconId={iconId.filterOff}
            disabled={!isActive}
            onClick={onResetFilter}
          />

          <StOpenButton
            size="26px"
            variant="def"
            isCurrent={current === idx}
            iconId={iconId.SmallArrowDown}
            iconSize="22px"
            onClick={() => onSelectorClick && onSelectorClick()}
          />
        </SelectorBody>

        {/* <MaxToTablet> */}
        {/* {list.length > 0 && <SelectedItemsList isOpen={isCurrent} list={list} onChange={onChange}></SelectedItemsList>} */}
        {/* </MaxToTablet> */}
      </StyledSelector>
    </SelectorContainer>
  );
};
const SelectorContainer = styled.div``;
const StyledSelector = styled.div<{ isCurrent: boolean }>`
  display: flex;
  align-items: center;

  gap: 2px;

  font-size: 12px;
  color: ${({ theme }) => theme.fontColorHeader};
  fill: ${({ theme }) => theme.accentColor.base};

  border-radius: 2px;
  /* border: 2px solid ${({ isCurrent, theme }) => (isCurrent ? theme.accentColor.base : 'transparent')}; */
`;
const SelectorBody = styled.div<{ isCurrent: boolean }>`
  flex-grow: 1;

  display: grid;
  grid-template-columns: 1fr min-content min-content;
  gap: 4px;

  border-radius: 2px;

  background-color: ${({ theme }) => theme.backgroundColorSecondary};
  border: 2px solid ${({ isCurrent, theme }) => (isCurrent ? theme.accentColor.base : 'transparent')};
`;
const Label = styled.div`
  flex-grow: 1;

  display: flex;
  align-items: center;

  padding: 5px 8px;
`;
const StOpenButton = styled(ButtonIcon)<{ isCurrent: boolean }>`
  & .icon {
    transform: ${({ isCurrent }) => `rotate(${isCurrent ? 180 : 0}deg)`};
  }

  @media screen and (min-width: 768px) {
    & .icon {
      transform: ${({ isCurrent }) => `rotate(${isCurrent ? -90 : 90}deg)`};
    }
  }
`;

export default Selector;
