import React, { CSSProperties, forwardRef } from 'react';
import styled, { css } from 'styled-components';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

export interface InputLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  direction?: 'horizontal' | 'vertical';
  uppercase?: boolean;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  success?: string;
  loading?: boolean;
  helperText?: string;
  align?: CSSProperties['alignItems'];
  disabled?: boolean;
  required?: boolean;
}

const InputLabel: React.ForwardRefRenderFunction<any, InputLabelProps> = (
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
  _ref: React.ForwardedRef<any>
) => {
  return (
    <Label className={className} disabled={disabled} {...props}>
      <Wrapper isLabel={!!label} direction={direction}>
        {label && (
          <LabelText htmlFor={id} uppercase={uppercase} align={align} direction={direction} className="label">
            {`${label}${required ? ' *' : ''}`}
          </LabelText>
        )}
        <InputBox>{children}</InputBox>
      </Wrapper>

      {(helperText || error?.message || success || loading) && (
        <HelperText error={!!error} success={!!success} loading={loading}>
          {(typeof error?.message === 'string' && error?.message) || success || (loading && 'Loading...') || helperText}
        </HelperText>
      )}
    </Label>
  );
};

const Label = styled.div<{
  disabled?: boolean;
  error?: boolean;
  success?: boolean;
}>`
  display: flex;
  flex-direction: column;

  position: relative;

  width: 100%;

  opacity: ${({ disabled }) => (disabled ? 0.5 : '')};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'all')};
`;
const LabelText = styled.label<Pick<InputLabelProps, 'align' | 'direction' | 'uppercase'>>`
  display: flex;
  align-items: ${({ align = 'center' }) => align};

  padding: 8px 8px 4px;

  font-size: 12px;
  line-height: 1.3;
  font-weight: 500;
  text-transform: ${({ uppercase }) => (uppercase ? 'uppercase' : 'none')};

  width: 100%;
  max-width: ${({ direction = 'horizontal' }) => (direction === 'horizontal' ? '100px' : '100%')};
`;

const Wrapper = styled.div<{
  isLabel: boolean;
  direction?: 'horizontal' | 'vertical';
}>`
  display: flex;

  ${({ direction }) =>
    direction === 'vertical' &&
    css`
      flex-direction: column;
      align-items: flex-start;
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
  min-height: 12px;

  font-size: 8px;
  line-height: 1.5;

  color: ${({ error, success, theme }) => (error && 'tomato') || (success && 'lightgreen') || 'inherit'};

  cursor: default;
`;

export default forwardRef(InputLabel);
