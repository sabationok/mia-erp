import React from 'react';
import styled from 'styled-components';

export interface InputPrimaryProps {
  label?: string;
}
const InputTextPrimary: React.FC<InputPrimaryProps & React.InputHTMLAttributes<HTMLInputElement>> = ({
  label,
  className,
  disabled,
  ...props
}) => {
  return (
    <Label className={className} disabled={disabled}>
      <Wrapper>
        <LabelText className="label">{label}</LabelText>

        <InputText className="input" disabled={disabled} {...props} />
      </Wrapper>
    </Label>
  );
};

const Label = styled.label<{ disabled?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 4px;

  font-weight: 500;
  font-size: 12px;
  line-height: 1.3;

  opacity: ${({ disabled }) => (disabled ? 0.5 : '')};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'all')};
`;
const LabelText = styled.div`
  text-transform: uppercase;
`;
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr;
  align-items: center;
  gap: 4px;
`;

const InputText = styled.input`
  padding: 5px 8px;

  width: 100%;
  height: 26px;

  color: inherit;

  background-color: transparent;
  border-radius: 2px;
  border: 1px solid ${({ theme }) => theme.globals.inputBorder};

  &::placeholder {
    font-family: inherit;
  }
`;

export default InputTextPrimary;
