import FlexBox from './FlexBox';
import { useCallback, useEffect, useMemo, useState } from 'react';
import ButtonIcon from './ButtonIcon/ButtonIcon';
import styled from 'styled-components';
import { FilterOption } from './TabSelector';
import { isUndefined } from 'lodash';
import { Text } from './Text';
import { Path } from 'react-hook-form';
import { FieldValues } from '../../types/utils.types';
import { UseFormReturn } from 'react-hook-form/dist/types';

export type ButtonsGroupOption<V = any> = FilterOption<V>;
export interface ButtonsGroupProps<V = any, FormData extends FieldValues = any, Name = Path<FormData>> {
  options?: ButtonsGroupOption<V>[];
  defaultIndex?: number;
  value?: V;
  onSelect?: ButtonGroupSelectHandler<V>;
  backgroundColor?: string;
  borderRadius?: string;
  currentOption?: ButtonsGroupOption<V>;
  onChangeIndex?: (index: number) => void;
  disabled?: boolean;
  name?: Name;
  form?: UseFormReturn<FormData>;
}
export type ButtonGroupSelectHandler<V = any> = (info: {
  option: ButtonsGroupOption<V>;
  value: V;
  index: number;
}) => void;
const ButtonsGroup = <V = any, Opt extends ButtonsGroupOption<V> = any>({
  options,
  borderRadius,
  onSelect,
  defaultIndex = 0,
  onChangeIndex,
  currentOption,
  disabled,
  value,
  name,
  form,
}: ButtonsGroupProps<V, Opt>) => {
  const [current, setCurrent] = useState(defaultIndex);

  const handleSelect = useCallback(
    (option: ButtonsGroupOption, index: number) => () => {
      if (form?.setValue && name) {
        form?.setValue(name, option?.value, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
      } else if (onSelect) {
        options && onSelect({ option, value: option?.value, index });
      } else if (onChangeIndex) {
        onChangeIndex(index);
      } else {
        setCurrent(index);
      }
    },
    [name, onChangeIndex, onSelect, options]
  );

  const renderButtons = useMemo(() => {
    return options?.map((opt, idx) => {
      const isActive = value !== undefined ? value === opt.value : current === idx;
      return (
        <OptionButton
          key={`group-option-${opt?.label || idx}`}
          variant={isActive ? 'filledSmall' : 'defaultSmall'}
          onClick={handleSelect(opt, idx)}
          disabled={disabled ?? opt?.disabled}
        >
          {opt.label && (
            <Text $size={11} $weight={600} $align={'center'} className={'inner'}>
              {opt.label}
            </Text>
          )}
          {opt?.extraLabel}
        </OptionButton>
      );
    });
  }, [current, disabled, handleSelect, options, value]);

  useEffect(() => {
    if (!isUndefined(currentOption)) {
      setCurrent(
        options?.findIndex(o => (o?.value ? o?.value === currentOption?.value : o?._id === currentOption?._id)) ?? 0
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
  height: fit-content;

  background-color: ${({ backgroundColor, theme }) => backgroundColor ?? theme.fieldBackgroundColor};
`;
const OptionButton = styled(ButtonIcon)`
  flex: 1;
  padding: 0 8px;
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
