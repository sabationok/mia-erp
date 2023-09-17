import FlexBox from './FlexBox';
import { useCallback, useEffect, useMemo, useState } from 'react';
import ButtonIcon from './ButtonIcon/ButtonIcon';
import styled from 'styled-components';
import { FilterOption } from '../ModalForm/ModalFilter';
import { isUndefined } from 'lodash';

export interface ButtonGroupProps<V = any> {
  options?: FilterOption<V>[];
  defaultIndex?: number;
  onSelect?: ButtonGroupSelectHandler<V>;
  backgroundColor?: string;
  borderRadius?: string;
}
export type ButtonGroupSelectHandler<V = any> = (info: { option: FilterOption<V>; value?: V; index: number }) => void;
const ButtonGroup = <V = any,>({ options, borderRadius, onSelect, defaultIndex }: ButtonGroupProps<V>) => {
  const [current, setCurrent] = useState(0);

  const handleSelect = useCallback(
    (option: FilterOption, index: number) => () => {
      setCurrent(index);
      onSelect && options && onSelect({ option, value: option?.value, index });
    },
    [onSelect, options]
  );

  useEffect(() => {
    if (!isUndefined(defaultIndex)) {
      setCurrent(defaultIndex);

      onSelect &&
        options &&
        onSelect({ option: options[defaultIndex], value: options[defaultIndex]?.value, index: defaultIndex });
    }

    // eslint-disable-next-line
  }, []);

  const renderButtons = useMemo(() => {
    return options?.map((opt, idx) => (
      <OptionButton
        key={`group-option-${opt?.label || idx}`}
        variant={current === idx ? 'filledSmall' : 'defOutlinedSmall'}
        onClick={handleSelect(opt, idx)}
        disabled={opt?.disabled}
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
