import React from 'react';
import InputTextPrimary, { InputPrimaryProps } from 'components/atoms/Inputs/InputTextPrimary';
import { iconId } from 'data';
import styled from 'styled-components';
import SvgIcon from 'components/atoms/SvgIcon/SvgIcon';
import { IconIdType } from 'img/sprite/iconId.data';

export interface AuthFormInputProps {
  icon: IconIdType;
  error?: boolean;
  helperText?: string;
  success?: boolean;
}

const AuthFormInput: React.FC<AuthFormInputProps & InputPrimaryProps> = ({ icon, error, success, ...props }) => {


  return (
    <InputBox>
      <SvgIcon size='26px' iconId={icon} />

      <InputTextPrimary
        placeholder="Ім'я"
        name='name'
        helperText={(error && 'error') || (success && 'success') || ''}
        error={error}
        success={success}
        {...props}
      />

      <StSvgIcon size='26px' iconId={error ? iconId.error : iconId.success} error={error} success={success} />
    </InputBox>
  );
};
const InputBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 4px;
`;
const StSvgIcon = styled(SvgIcon)<{ error?: boolean; success?: boolean }>`
  fill: transparent;
  fill: ${({ error, theme }) => (error ? 'tomato' : '')};
  fill: ${({ success, theme }) => (success ? 'green' : '')};
`;
export default AuthFormInput;
