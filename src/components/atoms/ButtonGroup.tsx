import FlexBox from './FlexBox';
import { useCallback, useMemo, useState } from 'react';
import ButtonIcon from './ButtonIcon/ButtonIcon';
import styled from 'styled-components';
import { FilterOpt } from '../ModalForm/ModalFilter';

export interface ButtonGroupProps {
  options?: FilterOpt[];
  onSelect?: (option: FilterOpt, value?: any, index?: number) => void;
  backgroundColor?: string;
  borderRadius?: string;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ options, borderRadius, onSelect }) => {
  const [current, setCurrent] = useState(0);

  const handleSelect = useCallback(
    (idx: number) => () => {
      setCurrent(idx);
      onSelect && options && onSelect(options[idx], options[idx].value, idx);
    },
    [onSelect, options]
  );

  const renderButtons = useMemo(() => {
    return options?.map((opt, idx) => (
      <OptionButton variant={current === idx ? 'filledSmall' : 'defOutlinedSmall'} onClick={handleSelect(idx)}>
        <span className={'inner'}>{opt.label}</span>
      </OptionButton>
    ));
  }, [current, handleSelect, options]);

  return (
    <Buttons fillWidth borderRadius={borderRadius ?? '6px'} fxDirection={'row'} gap={4} padding={'4px'}>
      {renderButtons}
    </Buttons>
  );
};

const Buttons = styled(FlexBox)<ButtonGroupProps>`
  background-color: ${({ backgroundColor, theme }) => backgroundColor ?? theme.fieldBackgroundColor};
`;
const OptionButton = styled(ButtonIcon)`
  flex: 1;
  padding: 4px 8px;
  min-width: 50px;

  & .inner {
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 100%;
  }

  @media screen and (max-width: 320px) {
    font-size: 10px;
  }
  @media screen and (max-width: 480px) {
    font-size: 12px;
  }
`;
export default ButtonGroup;
