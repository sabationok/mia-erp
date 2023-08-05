import FlexBox from './FlexBox';
import { useCallback, useMemo, useState } from 'react';
import ButtonIcon from './ButtonIcon/ButtonIcon';
import styled from 'styled-components';
import { FilterOpt } from '../ModalForm/ModalFilter';

export interface ButtonGroupProps<V = any> {
  options?: FilterOpt<V>[];
  onSelect?: ButtonGroupOnSelectHandler<V>;
  backgroundColor?: string;
  borderRadius?: string;
}
export type ButtonGroupOnSelectHandler<V = any> = (info: { option: FilterOpt<V>; value?: V; index: number }) => void;
const ButtonGroup: React.FC<ButtonGroupProps> = ({ options, borderRadius, onSelect }) => {
  const [current, setCurrent] = useState(0);

  const handleSelect = useCallback(
    (option: FilterOpt, index: number) => () => {
      setCurrent(index);
      onSelect && options && onSelect({ option, value: option?.value, index });
    },
    [onSelect, options]
  );

  const renderButtons = useMemo(() => {
    return options?.map((opt, idx) => (
      <OptionButton
        key={`group-option-${opt?.label || idx}`}
        variant={current === idx ? 'filledSmall' : 'defOutlinedSmall'}
        onClick={handleSelect(opt, idx)}
      >
        {opt.label && <div className={'inner'}>{opt.label}</div>}
        {opt?.extraLabel}
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

  overflow: hidden;

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
