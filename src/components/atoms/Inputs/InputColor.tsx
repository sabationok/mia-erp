import React, { useEffect, useRef } from 'react';
import { LangTextKey } from '../../../lang';
import { Text } from '../Text';
import styled from 'styled-components';
import FlexBox, { FlexLabel } from '../FlexBox';
import InputText from './InputText';

export const InputColor = React.forwardRef(
  (
    {
      label,
      disabled,
      ...props
    }: { disabled?: boolean; name?: string; label?: LangTextKey } & React.HTMLAttributes<HTMLInputElement>,
    ref?: React.ForwardedRef<HTMLInputElement>
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (ref) {
        if (typeof ref === 'function') {
          ref(inputRef.current);
        } else {
          ref.current = inputRef.current;
        }
      }
    }, [ref]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      if (inputRef.current) inputRef.current.value = value;
      // if (inputRef.current) {
      // }

      props.onChange && props.onChange(e);
    };
    return (
      <CompLabel style={{ position: 'relative' }} fillWidth flex={1} fxDirection={'row'} gap={4} alignItems={'center'}>
        <InputBox
          style={{
            borderColor: inputRef.current?.value,
            backgroundColor: inputRef.current?.value,
          }}
        >
          <StInputColor
            {...props}
            style={{ visibility: 'hidden', border: 0, opacity: 0, outline: 0 }}
            disabled={disabled}
            type={'color'}
            ref={inputRef}
            onChange={handleChange}
          />
        </InputBox>

        <FlexBox
          flex={1}
          style={{ cursor: 'inherit' }}
          alignItems={'center'}
          justifyContent={'center'}
          padding={'2px 8px'}
        >
          <Text $weight={500} $size={15} $ellipsisMode={true}>
            {inputRef.current?.value || 'unset'}
          </Text>
        </FlexBox>
      </CompLabel>
    );
  }
);

const CompLabel = styled(FlexLabel)`
  padding: 4px;

  height: 40px;
  @media screen and (min-width: 480px) {
    height: 28px;
  }

  border-radius: 4px;

  cursor: pointer;

  border: 1px solid ${p => p.theme.globals.inputBorder};

  //border-color: ${p => p.theme.accentColor.hover};
  // &:focus-within {
  //   outline: 1px solid ${p => p.theme.accentColor.hover};
  // }

  &:hover {
    border-color: ${({ theme }) => theme.accentColor.base};
    box-shadow: 0 0 3px ${({ theme }) => theme.accentColor.base};
    outline: 1px solid ${({ theme }) => theme.accentColor.base};
  }

  &:focus,
  &:focus-within,
  &:focus-visible {
    border-color: ${({ theme }) => theme.accentColor.base};
    box-shadow: 0 0 5px ${({ theme }) => theme.accentColor.base};
    outline: 1px solid ${({ theme }) => theme.accentColor.base};
  }

  &::placeholder {
    font-size: inherit;
    color: ${({ theme }) => theme.globals.inputPlaceholderColor};
  }

  transition: all ${({ theme }) => theme.globals.timingFunctionMain};

  &[disabled] {
    pointer-events: none;
    opacity: 70%;
  }
`;
const InputBox = styled(FlexBox)`
  height: 100%;

  aspect-ratio: 1/1;

  cursor: pointer;

  border: 1px solid #cbcbcb;
  border-radius: 2px;
`;
const StInputColor = styled(InputText)`
  //position: absolute;
  //top: 0;
  //left: 4px;
  //z-index: 2;

  background-color: inherit;
  padding: 0;
  margin: 0;

  border: 0;

  outline: none;
`;
