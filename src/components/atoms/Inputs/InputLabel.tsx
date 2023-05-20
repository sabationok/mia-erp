import React, { CSSProperties } from 'react';
import styled, { css } from 'styled-components';
import { FieldError } from 'react-hook-form';

export interface InputLabelProps
  extends React.InputHTMLAttributes<HTMLLabelElement> {
  label?: string;
  direction?: 'horizontal' | 'vertical';
  uppercase?: boolean;
  error?: FieldError;
  success?: string;
  loading?: boolean;
  helperText?: string;
  align?: CSSProperties['alignItems'];
}

const InputLabel: React.FC<InputLabelProps> = ({
  label,
  className,
  disabled,
  direction,
  uppercase,
  helperText,
  error,
  success,
  children,
  loading,
  align,
  ...props
}) => {
  return (
    <Label className={className} disabled={disabled} {...props}>
      <Wrapper isLabel={!!label} direction={direction}>
        {label && (
          <LabelText
            uppercase={uppercase}
            align={align}
            direction={direction}
            className="label"
          >
            {label}
          </LabelText>
        )}

        {children}
      </Wrapper>

      {helperText && (
        <HelperText error={!!error} success={!!success} loading={loading}>
          {error?.message || success || (loading && 'Loading...') || helperText}
        </HelperText>
      )}
    </Label>
  );
};

const Label = styled.label<{
  disabled?: boolean;
  error?: boolean;
  success?: boolean;
}>`
  display: flex;
  flex-direction: column;

  font-weight: 500;
  font-size: 12px;
  line-height: 1.3;

  width: 100%;

  opacity: ${({ disabled }) => (disabled ? 0.5 : '')};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'all')};
`;
const LabelText = styled.div<{
  uppercase?: boolean;
  align?: CSSProperties['alignItems'];
  direction?: 'horizontal' | 'vertical';
}>`
  display: flex;
  align-items: ${({ align = 'center' }) => align};

  padding: 5px;

  font-weight: 500;
  text-transform: ${({ uppercase }) => (uppercase ? 'uppercase' : 'none')};

  width: 100%;
  max-width: ${({ direction = 'horizontal' }) =>
    direction === 'horizontal' ? '100px' : '100%'};
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

const HelperText = styled.div<{
  error?: boolean;
  success?: boolean;
  loading?: boolean;
}>`
  min-height: 12px;

  font-size: 8px;
  line-height: 1.5;

  color: ${({ error, success, theme }) =>
    (error && 'tomato') || (success && 'lightgreen') || 'inherit'};

  cursor: default;
`;

export default InputLabel;
