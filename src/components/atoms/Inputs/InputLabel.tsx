import React, { forwardRef } from 'react';
import { css, styled } from 'styled-components';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';
import FlexBox, { FlexBoxProps, FlexFieldSet } from '../FlexBox';
import { Property } from 'csstype';
import { Text } from '../Text';
import { LangTextKey, t } from '../../../lang';
import { PartialRecord, PrefixKeys } from '../../../types/utils.types';

export type InputStateIs = PrefixKeys<PartialRecord<'error' | 'success' | 'loading', boolean>>;

export interface InputLabelCustomProps {
  label?: LangTextKey;

  direction?: 'horizontal' | 'vertical' | 'row' | 'column';

  uppercase?: boolean;
  textTransform?: Property.TextTransform;
  align?: Property.AlignItems;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;

  success?: string;
  loading?: boolean;
  stateIs?: InputStateIs;

  helperText?: string;
}

type PrefixedCustomProps = PrefixKeys<InputLabelCustomProps>;
export interface InputLabelProps
  extends Omit<React.HTMLAttributes<HTMLFieldSetElement>, 'onSelect'>,
    FlexBoxProps,
    InputLabelCustomProps,
    PrefixKeys<InputLabelCustomProps> {
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
    textTransform,
    ...props
  },
  ref
) => {
  return (
    <Box className={className} disabled={disabled} {...props} ref={ref} gap={8}>
      <Wrapper $isLabel={!!label} $direction={direction}>
        {label && (
          <Label
            htmlFor={id}
            $textTransform={textTransform}
            $uppercase={uppercase}
            $align={align}
            $direction={direction}
            className="label"
          >
            {t(label)}
            {required && <Text color={'tomato'}>{` *`}</Text>}
          </Label>
        )}

        <InputBox>{children}</InputBox>
      </Wrapper>

      {(helperText || error?.message || success || loading) && (
        <HelperText $error={!!error} $success={!!success} $loading={loading}>
          {(typeof error?.message === 'string' && error?.message) || success || (loading && 'Loading...') || helperText}
        </HelperText>
      )}
    </Box>
  );
};

const Box = styled(FlexFieldSet)<PrefixedCustomProps>`
  display: flex;
  flex-direction: column;

  position: relative;

  width: ${p => (p.width ? p.width : '100%')};

  &[disabled] {
    opacity: 0.75;
    pointer-events: none;
  }
`;
const Label = styled.label<PrefixedCustomProps>`
  //display: flex;

  align-items: ${({ $align = 'center' }) => $align};

  padding: 8px 8px 4px;

  font-size: 13px;
  line-height: 1.3;
  font-weight: 500;
  text-transform: ${({ $uppercase, $textTransform }) => $textTransform || ($uppercase ? 'uppercase' : 'none')};

  width: 100%;
  max-width: ${({ $direction = 'horizontal' }) => ($direction === 'horizontal' ? '100px' : '100%')};
`;

const Wrapper = styled(FlexBox)<
  PrefixKeys<
    Pick<InputLabelProps, 'direction'> & {
      isLabel: boolean;
    }
  >
>`
  width: 100%;
  ${({ $direction }) =>
    $direction === 'vertical' || $direction === 'column'
      ? css`
          flex-direction: column;
        `
      : css`
          flex-direction: row;
          align-items: center;
        `};
`;

const InputBox = styled.div`
  display: flex;
  width: 100%;

  position: relative;
`;

const HelperText = styled.div<InputStateIs>`
  padding: 2px 6px;
  min-height: 13px;

  font-size: 11px;
  line-height: 1.5;
  margin: 0 0 6px;
  border-radius: 4px;

  border: 1px solid
    ${({ theme, $error, $success }) =>
      ($error && theme.globals.colors.error) ||
      ($success && theme.globals.colors.success) ||
      theme.globals.colors.default};

  color: ${({ theme, $error, $success }) =>
    ($error && theme.globals.colors.error) ||
    ($success && theme.globals.colors.success) ||
    theme.globals.colors.default};

  background-color: ${({ theme, $error, $success }) =>
    ($error && theme.globals.colors.errorLight) ||
    ($success && theme.globals.colors.successLight) ||
    theme.globals.colors.defaultLight};

  cursor: default;
`;

export default forwardRef(InputLabel);
