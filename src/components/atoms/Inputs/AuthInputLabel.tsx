import React from 'react';
import styled from 'styled-components';
import SvgIcon from 'components/atoms/SvgIcon/SvgIcon';
import { IconIdType } from 'img/sprite/iconId.data';
import { InputLabelProps } from './InputLabel';

export interface AuthInputLabelProps {
  icon: IconIdType;
  success?: {
    message?: string;
  };
}

const AuthInputLabel: React.FC<AuthInputLabelProps & Omit<InputLabelProps, 'success'>> = ({
  icon,
  error,
  success,
  helperText,
  children,
  ...props
}) => {
  return (
    <InputBox>
      <Wrapper>
        <SvgIcon size="30px" iconId={icon} />

        {children}

        <StIcon size="26px" iconId={!error ? 'success' : 'error'} isError={!!error} isSuccess={!!success} />
      </Wrapper>

      {(error?.message || success?.message || helperText) && (
        <HelperText isError={!!error} isSuccess={!!success}>
          {(typeof error?.message === 'string' && error?.message) || success?.message || helperText}
        </HelperText>
      )}
    </InputBox>
  );
};
const InputBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;
const HelperText = styled.span<{ isError?: boolean; isSuccess?: boolean }>`
  font-size: 12px;
  line-height: 1.5;

  width: 100%;

  font-weight: 500;

  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  color: ${({ isError, isSuccess, theme }) =>
    (isError && theme.globals.colors.error) || (isSuccess && theme.globals.colors.success) || ''};
  cursor: default;
`;
const StIcon = styled(SvgIcon)<{ isError?: boolean; isSuccess?: boolean }>`
  fill: ${({ isError, isSuccess, theme }) =>
    (isError && theme.globals.colors.error) || (isSuccess && theme.globals.colors.success) || 'transparent'};
`;
export default AuthInputLabel;
