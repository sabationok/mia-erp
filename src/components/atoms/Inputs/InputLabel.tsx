import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';
import FlexBox, { FlexBoxProps, FlexFieldSet, FlexLabel } from '../FlexBox';
import { Property } from 'csstype';
import { Text } from '../Text';
import { LangTextKey, t } from '../../../lang';

export interface InputLabelProps extends Omit<React.HTMLAttributes<HTMLFieldSetElement>, 'onSelect'>, FlexBoxProps {
  label?: LangTextKey;
  direction?: 'horizontal' | 'vertical' | 'row' | 'column';
  uppercase?: boolean;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  success?: string;
  loading?: boolean;
  helperText?: string;
  align?: Property.AlignItems;
  disabled?: boolean;
  required?: boolean;
}

const InputLabel: React.ForwardRefRenderFunction<HTMLFieldSetElement, InputLabelProps> = (
  {
    label,
    className,
    disabled,
    direction = 'vertical',
    uppercase,
    helperText,
    error,
    success,
    children,
    loading,
    align,
    id,
    required,
    ...props
  },
  ref
) => {
  return (
    <Box className={className} disabled={disabled} {...props} ref={ref}>
      <Wrapper isLabel={!!label} direction={direction}>
        {label && (
          <Label htmlFor={id} uppercase={uppercase} align={align} direction={direction} className="label">
            {t(label)}
            {required && <Text color={'tomato'}>{' *'}</Text>}
          </Label>
        )}

        <InputBox>{children}</InputBox>
      </Wrapper>

      {(helperText || error?.message || success || loading) && (
        <HelperText error={!!error} success={!!success} loading={loading}>
          {(typeof error?.message === 'string' && error?.message) || success || (loading && 'Loading...') || helperText}
        </HelperText>
      )}
    </Box>
  );
};

const Box = styled(FlexFieldSet)<{
  disabled?: boolean;
  error?: boolean;
  success?: boolean;
}>`
  display: flex;
  flex-direction: column;

  position: relative;

  width: ${p => (p.width ? p.width : '100%')};

  opacity: ${({ disabled }) => (disabled ? 0.75 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'all')};
`;
const Label = styled(FlexLabel)<Pick<InputLabelProps, 'align' | 'direction' | 'uppercase'>>`
  //display: flex;

  align-items: ${({ align = 'center' }) => align};

  padding: 8px 8px 4px;

  font-size: 13px;
  line-height: 1.3;
  font-weight: 500;
  text-transform: ${({ uppercase }) => (uppercase ? 'uppercase' : 'none')};

  width: 100%;
  max-width: ${({ direction = 'horizontal' }) => (direction === 'horizontal' ? '100px' : '100%')};
`;

const Wrapper = styled(FlexBox)<
  Pick<InputLabelProps, 'direction'> & {
    isLabel: boolean;
  }
>`
  ${({ direction }) =>
    direction === 'vertical' || direction === 'column'
      ? css`
          flex-direction: column;
        `
      : css`
          flex-direction: row;
          align-items: center;
        `};
  width: 100%;
`;

const InputBox = styled.div`
  display: flex;
  width: 100%;

  position: relative;
`;

const HelperText = styled.div<{
  error?: boolean;
  success?: boolean;
  loading?: boolean;
}>`
  padding: 2px 4px;
  min-height: 13px;

  font-size: 12px;
  line-height: 1.5;

  color: ${({ error, success }) => (error && 'tomato') || (success && 'lightgreen') || 'inherit'};

  cursor: default;
`;

export default forwardRef(InputLabel);
