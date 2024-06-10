import React from 'react';
import styled from 'styled-components';
import SvgIcon from 'components/atoms/SvgIcon';
import { IconIdType } from 'img/sprite/iconId.data';
import { InputLabelProps } from './InputLabel';
import { FlexBox, FlexLabel } from '../FlexBox';
import { Text } from '../Text';

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
    <FlexLabel fillWidth gap={8} alignItems={'center'}>
      <FlexBox gap={4} fillWidth alignItems={'center'} fxDirection={'row'}>
        <SvgIcon size="30px" icon={icon} />

        {children}

        <SvgIcon
          size={'30px'}
          icon={!error ? (success ? 'success' : undefined) : 'error'}
          isError={!!error}
          isSuccess={!!success}
        />
      </FlexBox>

      {(error?.message || success?.message || helperText) && (
        <HelperText isError={!!error} isSuccess={!!success}>
          {(typeof error?.message === 'string' && error?.message) || success?.message || helperText}
        </HelperText>
      )}
    </FlexLabel>
  );
};

const HelperText = styled(Text)<{ isError?: boolean; isSuccess?: boolean }>`
  font-size: 12px;
  line-height: 1.5;

  //width: 100%;

  font-weight: 500;

  //text-overflow: ellipsis;
  //white-space: nowrap;
  //overflow: hidden;

  color: ${({ isError, isSuccess, theme }) =>
    (isError && theme.globals.colors.error) || (isSuccess && theme.globals.colors.success) || ''};
  cursor: default;
`;
// const StIcon = styled(SvgIcon)<{ isError?: boolean; isSuccess?: boolean }>`
//   fill: ${({ isError, isSuccess, theme }) =>
//     (isError && theme.globals.colors.error) || (isSuccess && theme.globals.colors.success) || 'transparent'};
// `;
export default AuthInputLabel;
