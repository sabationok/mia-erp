import ButtonIcon from 'components/ButtonIcon/ButtonIcon';
import { iconId } from 'data';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import SelectedItemsList from './SelectedItemsList';
import { MaxToTablet } from 'components/DeviceTypeInformer/DeviceTypeController';

const Selector = ({ title = 'Selector title', list = [], name = 'selector', onSelectorClick, isCurrent }) => {
  const [selectedItems, setSelectedItem] = useState(list);
  const [isActive, setIsActive] = useState(false);

  function onChange(_id) {
    setSelectedItem(prev =>
      prev.map(el => {
        if (el._id === _id) return { ...el, checked: !el?.checked };

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
    <StyledSelector isCurrent={isCurrent}>
      <Top>
        <Title>{title}</Title>

        <ButtonIcon size="26px" variant="def" iconId={iconId.filterOff} disabled={!isActive} onClick={onResetFilter} />

        <ButtonIcon
          size="26px"
          variant="def"
          iconId={isCurrent ? iconId.SmallArrowRight : iconId.SmallArrowLeft}
          iconSize="22px"
          onClick={() => onSelectorClick && onSelectorClick()}
        />
      </Top>

      <MaxToTablet>
        {list.length > 0 && <SelectedItemsList isOpen={isCurrent} list={list} onChange={onChange}></SelectedItemsList>}
      </MaxToTablet>
    </StyledSelector>
  );
};
const StyledSelector = styled.div`
  border-radius: 2px;
  padding: 8px;
  background-color: ${({ theme }) => theme.backgroundColorMain};
  border: 2px solid ${({ isCurrent, theme }) => (isCurrent ? theme.accentColor.base : 'transparent')};
`;
const Top = styled.div`
  display: grid;
  grid-template-columns: 1fr min-content min-content min-content;
  gap: 8px;
`;
const Title = styled.div``;

export default Selector;
