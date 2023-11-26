import { ChangeEventHandler, useEffect, useRef, useState } from 'react';
import FlexBox from './FlexBox';
import ButtonIcon from './ButtonIcon/ButtonIcon';
import styled from 'styled-components';
import InputText from './Inputs/InputText';
import { checks } from '../../utils';
import { MaybeNull } from '../../types/utils.types';

const CountSelectorBase = ({
  value = 0,
  onChangeValue,
  width,
  height = '18px',
  disabled,
  className,
  autoFocus,
}: {
  value?: MaybeNull<number>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onChangeValue?: (number: number) => void;
  height?: string;
  width?: string;
  disabled?: boolean;
  className?: string;
  autoFocus?: boolean;
}) => {
  const [count, setCount] = useState(value ?? 0);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleIncrementChange = (increment: number) => () => {
    onChangeValue
      ? onChangeValue(count + increment > 0 ? count + increment : count)
      : setCount(prev => {
          return prev + increment ? prev + increment : prev;
        });

    inputRef.current?.focus();
  };

  useEffect(() => {
    if (checks.isNum(value) && value > 0) {
      setCount(value);
    }
  }, [value]);

  return (
    <FlexBox fxDirection={'row'} gap={4} width={width} alignItems={'center'} height={'min-content'}>
      <ButtonIcon variant={'onlyIcon'} size={height} icon={'minus'} onClick={handleIncrementChange(-1)} />

      <StInput
        value={count}
        disabled={disabled}
        className={className}
        ref={inputRef}
        onChange={({ target: { value } }) => {
          if (isNaN(Number(value))) return;
          onChangeValue ? onChangeValue(Number(value)) : setCount(Number(value));
        }}
        onSubmit={e => {
          e.preventDefault();
        }}
        // onKeyDown={event => {
        //   if (event.key === 'Enter') {
        //     event.preventDefault();
        //   }
        // }}
        autoFocus={autoFocus}
      />

      <ButtonIcon variant={'onlyIcon'} size={height} icon={'plus'} onClick={handleIncrementChange(1)} />
    </FlexBox>
  );
};

const StInput = styled(InputText)`
  flex: 1;
  width: 100%;
  height: 100%;

  padding: 0 6px;
  font-size: 16px;
  font-weight: 500;

  text-align: center;

  //border: 0;
  //color: inherit;
  //background: transparent;
  //text-align: center;
  //font-family: inherit;
  //font-size: inherit;
  //font-weight: inherit;
`;
export default CountSelectorBase;
