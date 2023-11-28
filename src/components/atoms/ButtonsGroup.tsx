import FlexBox from './FlexBox';
import { useCallback, useEffect, useMemo, useState } from 'react';
import ButtonIcon from './ButtonIcon/ButtonIcon';
import styled from 'styled-components';
import { FilterOption } from '../ModalForm/ModalFilter';
import { isUndefined } from 'lodash';
import { Text } from './Text';

export type ButtonsGroupOption<V = any> = FilterOption<V>;
export interface ButtonsGroupProps<V = any> {
  options?: ButtonsGroupOption<V>[];
  defaultIndex?: number;
  onSelect?: ButtonGroupSelectHandler<V>;
  backgroundColor?: string;
  borderRadius?: string;
  currentOption?: ButtonsGroupOption<V>;
  onChangeIndex?: (index: number) => void;
  disabled?: boolean;
}
export type ButtonGroupSelectHandler<V = any> = (info: {
  option: ButtonsGroupOption<V>;
  value: V;
  index: number;
}) => void;
const ButtonsGroup = <V = any,>({
  options,
  borderRadius,
  onSelect,
  defaultIndex = 0,
  onChangeIndex,
  currentOption,
  disabled,
}: ButtonsGroupProps<V>) => {
  const [current, setCurrent] = useState(0);

  const handleSelect = useCallback(
    (option: ButtonsGroupOption, index: number) => () => {
      setCurrent(index);
      onSelect && options && onSelect({ option, value: option?.value, index });
      onChangeIndex && onChangeIndex(index);
    },
    [onChangeIndex, onSelect, options]
  );

  const renderButtons = useMemo(() => {
    return options?.map((opt, idx) => (
      <OptionButton
        key={`group-option-${opt?.label || idx}`}
        variant={current === idx ? 'filledSmall' : 'defOutlinedSmall'}
        onClick={handleSelect(opt, idx)}
        disabled={disabled ?? opt?.disabled}
      >
        {opt.label && (
          <Text $weight={500} className={'inner'}>
            {opt.label}
          </Text>
        )}
        {opt?.extraLabel}
      </OptionButton>
    ));
  }, [current, disabled, handleSelect, options]);

  useEffect(() => {
    if (!isUndefined(defaultIndex)) {
      setCurrent(defaultIndex);

      onSelect &&
        options &&
        onSelect({ option: options[defaultIndex], value: options[defaultIndex]?.value, index: defaultIndex });
    }

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!isUndefined(currentOption) && !isUndefined(options)) {
      setCurrent(
        options.findIndex(o => (o?.value ? o?.value === currentOption?.value : o?._id === currentOption?._id))
      );
    }
  }, [currentOption, options]);

  return (
    <Buttons fillWidth borderRadius={borderRadius ?? '6px'} fxDirection={'row'} gap={4} padding={'4px'}>
      {renderButtons}
    </Buttons>
  );
};

const Buttons = styled(FlexBox)<ButtonsGroupProps>`
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
export default ButtonsGroup;
