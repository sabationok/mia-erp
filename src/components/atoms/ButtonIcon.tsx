import React, { CSSProperties, forwardRef, memo } from 'react';
import { IconIdType } from 'img/sprite';
import styled, { css, DefaultTheme, FlattenInterpolation, ThemeProps } from 'styled-components';
import { Property } from 'csstype';
import { AppLoaderSpiner } from './AppLoaderSpiner';
import { Keys } from '../../types/utils.types';
import FlexBox, { FlexBoxCss, FlexBoxProps } from './FlexBox';
import SvgIcon from './SvgIcon';

interface ButtonStyleProps extends FlexBoxProps {
  flexDirection?: Property.FlexDirection;

  textTransform?: Property.TextTransform;
  fontWeight?: Property.FontWeight | 400 | 500 | 600 | 700 | 900;
}
export interface ButtonIconsProps {
  iconSize?: string;
  iconStyles?: CSSProperties;
  endIconSize?: string;
  endIconStyles?: CSSProperties;

  icon?: IconIdType;
  iconId?: IconIdType;

  endIcon?: IconIdType;
  endIconId?: IconIdType;
}
interface ButtonProps extends ButtonStyleProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: `${string}px` | `${string}%`;
  sizeType?: ButtonSize;
  variant: ButtonIconVariant;

  isLoading?: boolean;
}

export type ButtonIconProps = ButtonProps & ButtonIconsProps;

const ButtonIcon = (
  {
    children,
    isActive,
    type = 'button',
    size,
    variant = 'def',
    iconId,
    icon,
    iconSize = '18px',
    iconStyles = {},
    endIcon,
    endIconId,
    endIconSize = '18px',
    endIconStyles = {},
    isLoading,
    onClick,
    ...props
  }: ButtonIconProps,
  _ref: React.ForwardedRef<any>
) => {
  let styles = {
    width: size,
    height: size,
    minWidth: size,
    minHeight: size,
  };
  let iconStyle = {
    width: iconSize,
    height: iconSize,
    minWidth: iconSize,
    minHeight: iconSize,
    ...iconStyles,
  };
  let endIconStyle = {
    width: endIconSize,
    height: endIconSize,
    minWidth: endIconSize,
    minHeight: endIconSize,
    ...endIconStyles,
  };

  const _startIcon = iconId || icon;
  const _endIcon = endIconId || endIcon;

  return (
    <StButton
      {...{
        style: styles,
        variant,
        type,
        onClick,
        className: 'buttonIcon',
        isLoading: isLoading,
        ...props,
      }}
    >
      {_startIcon && (
        <SvgIcon className="icon" style={iconStyle} icon={_startIcon}>
          {/*<use href={`${sprite}#icon-${icon || iconId}`} />*/}
        </SvgIcon>
      )}
      {variant && !variant.includes('Icon') && children}
      {/*{children}*/}
      <ButtonLoader isLoading={isLoading} variant={variant} size={size || '20px'} />

      {_endIcon && (
        <SvgIcon className="endIcon" style={endIconStyle} icon={_endIcon}>
          {/*<use href={`${sprite}#icon-${endIcon || endIconId}`}></use>*/}
        </SvgIcon>
      )}
    </StButton>
  );
};

export const BaseButton: React.FC<
  ButtonProps & {
    variant?: Exclude<ButtonProps['variant'], 'onlyIcon' | 'onlyIconNoEffects' | 'onlyIconFilled' | 'onlyIconOutlined'>;
  }
> = ({ children, isActive, type = 'button', size, variant = 'def', isLoading, onClick, ...props }) => {
  let styles = {
    width: size,
    height: size,
    minWidth: size,
    minHeight: size,
  };

  return (
    <StButton
      {...{
        style: styles,
        variant,
        type,
        onClick,
        className: 'button',
        isLoading: isLoading,
        ...props,
      }}
    >
      {children}

      <ButtonLoader isLoading={isLoading} variant={variant} size={size || '20px'} />
    </StButton>
  );
};

const ButtonIsLoadingCss = css`
  pointer-events: none;
  &[disabled] {
    opacity: 1;
  }
`;

const StButton = styled.button<ButtonIconProps>`
  ${FlexBoxCss};

  position: relative;

  flex-direction: ${p => (p.flexDirection ? p.flexDirection : 'row')};

  align-items: ${({ alignItems = 'center' }) => alignItems};
  justify-content: ${({ justifyContent = 'center' }) => justifyContent};

  gap: ${p => `${p.gap ?? 8}px`};

  text-align: center;
  font-size: 13px;
  font-weight: ${({ fontWeight = 600 }) => fontWeight};
  font-family: inherit;
  //letter-spacing: 0.05em;
  color: inherit;
  fill: currentColor;
  text-transform: ${({ textTransform = 'none' }) => textTransform};

  cursor: pointer;

  overflow: hidden;
  border-radius: 4px;
  border: 1px solid transparent;
  background-color: transparent;

  transition: ${({ theme }) => theme.globals.timingFunctionMain};

  ${({ variant = 'def' }) => getVariant(variant)}
  ${({ sizeType }) => getSize(sizeType)}

  &[disabled] {
    pointer-events: none;
    cursor: default;
    opacity: 0.75;
    fill: ${({ theme }) => theme.fontColor};
    color: ${({ theme }) => theme.fontColor};
  }
  padding: ${p => p.padding};

  ${p => (p.isLoading ? ButtonIsLoadingCss : '')};

  @media screen and (max-width: 480px) {
    //text-transform: uppercase;
    font-size: 14px;
    //height: max-content;
  }
`;

// const SvgIcon = styled.svg`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//
//   pointer-events: none;
//   width: 100%;
//   height: 100%;
//
//   aspect-ratio: 1/1;
// `;

const def = css`
  background-color: ${({ theme }) => theme.globals.defaultBtnBckgrndColor.def};
  /* transition: all var(--timing-function__main); */

  &:hover {
    background-color: ${({ theme }) => theme.globals.defaultBtnBckgrndColor.hover};
  }

  &:active {
    background-color: ${({ theme }) => theme.globals.defaultBtnBckgrndColor.pressed};
  }
`;
const defNoEffects = css`
  background-color: ${({ theme }) => theme.globals.defaultBtnBckgrndColor.def};
  &:hover,
  &:active,
  &:focus {
    background: ${({ theme }) => theme.globals.defaultBtnBckgrndColor.def};
  }
`;

const extraSmall = css`
  padding: 2px 8px;
  min-width: 40px;
  min-height: 20px;
  @media screen and (max-width: 480px) {
    min-height: 26px;
  }
`;
const small = css`
  padding: 2px 12px;
  min-width: 50px;
  min-height: 26px;
  @media screen and (max-width: 480px) {
    min-height: 30px;
  }
`;
const middle = css`
  padding: 2px 16px;
  min-width: 80px;
  min-height: 32px;
  @media screen and (max-width: 480px) {
    min-height: 36px;
  }
`;
const large = css`
  padding: 2px 16px;
  min-width: 100px;
  min-height: 42px;
  @media screen and (max-width: 480px) {
    min-height: 56px;
  }
`;

const pointerLeft = css`
  position: relative;

  background-color: ${({ theme }) => theme.defaultBtnBckgrndColor.def};
  border: 0;
  border-radius: 0;
  transition: all ${({ theme }) => theme.globals.timingFunctionMain};
  transition: none;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;

    transform: translateY(-50%);

    width: 3px;
    height: 50%;

    background-color: transparent;
    transition: height ${({ theme }) => theme.globals.timingFunctionLong};
  }

  ${defNoEffects}
  &:hover {
    &::before {
      height: 100%;
      background-color: ${({ theme }) => theme.accentColor.base};
    }
  }

  &:active {
  }
`;
const pointerBottom = css`
  background-color: ${({ theme }) => theme.globals.defaultBtnBckgrndColor.def};

  border: 0;
  transition: all ${({ theme }) => theme.globals.timingFunctionMain};
  position: relative;
  fill: ${({ theme }) => theme.colorLight};
  border-radius: 0;

  transition: none;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;

    transform: translateY(-50%);

    width: 3px;
    height: 50%;

    background-color: transparent;
    transition: height ${({ theme }) => theme.globals.timingFunctionLong};
  }

  ${def}
  &:hover {
    &::before {
      height: 100%;
      background-color: ${({ theme }) => theme.accentColor.base};
    }
  }
`;

const icon = css`
  min-width: 26px;
  min-height: 26px;
  width: fit-content;
  padding: 0;

  aspect-ratio: 1/1;

  @media screen and (max-width: 480px) {
    min-width: 28px;
    min-height: 28px;
  }
`;
const outlined = css`
  color: ${({ theme }) => theme.accentColor.base};
  fill: ${({ theme }) => theme.accentColor.base};
  border: 2px solid ${({ theme }) => theme.accentColor.base};
  /* background-color: transparent; */

  &:hover {
    border: 2px solid ${({ theme }) => theme.accentColor.hover};
    color: ${({ theme }) => theme.accentColor.hover};
    fill: ${({ theme }) => theme.accentColor.hover};
  }

  &:active {
    color: ${({ theme }) => theme.accentColor.pressed};
    fill: ${({ theme }) => theme.accentColor.pressed};
    border: 2px solid ${({ theme }) => theme.accentColor.pressed};
  }

  &[disabled] {
    border-color: ${({ theme }) => theme.field.backgroundColor};
    pointer-events: none;
  }
`;
const outlinedExtraSmall = css`
  ${small};
  ${extraSmall};
`;
const outlinedSmall = css`
  ${small};
  ${outlined};
`;
const outlinedMiddle = css`
  ${outlined};
  ${middle};
`;

const filled = css`
  color: ${({ theme }) => theme.colorLight};
  fill: ${({ theme }) => theme.colorLight};
  background-color: ${({ theme }) => theme.accentColor.base};
  border-width: 2px;
  &:hover {
    color: ${({ theme }) => theme.colorLight};
    fill: ${({ theme }) => theme.colorLight};
    background-color: ${({ theme }) => theme.accentColor.hover};
  }

  &:active {
    background-color: ${({ theme }) => theme.accentColor.pressed};
  }

  &[disabled] {
    color: ${({ theme }) => theme.colorLight};
    fill: ${({ theme }) => theme.colorLight};
    background-color: ${({ theme }) => theme.field.backgroundColor};
  }
`;
const filledSmall = css`
  ${small};
  ${filled};
`;
const filledMiddle = css`
  ${middle};
  ${filled};
`;
const onlyIconFilled = css`
  ${filled};
  ${icon};
`;
const onlyIconOutlined = css`
  ${outlined};
  ${icon};
  //border-width: 2px;
`;
const onlyIcon = css`
  ${def};
  ${icon};
  fill: ${({ theme }) => theme.accentColor.base};

  &:hover {
    fill: ${({ theme }) => theme.accentColor.hover};
  }

  &:active {
    fill: ${({ theme }) => theme.accentColor.pressed};
  }
`;
const onlyIconNoEffects = css`
  ${defNoEffects};
  ${icon};
  fill: ${({ theme }) => theme.accentColor.base};

  &:hover {
    fill: ${({ theme }) => theme.accentColor.hover};
  }

  &:active {
    fill: ${({ theme }) => theme.accentColor.pressed};
  }
`;
const textUnderlined = css`
  text-decoration: underline;
  cursor: pointer;
  color: ${({ theme }) => theme.accentColor.base};

  &:hover {
    color: ${({ theme }) => theme.accentColor.hover};
  }

  &:active {
    color: ${({ theme }) => theme.accentColor.pressed};
  }
`;
const text = css`
  ${def};
  color: ${({ theme }) => theme.accentColor.base};

  &:hover {
    color: ${({ theme }) => theme.accentColor.hover};
  }

  &:active {
    color: ${({ theme }) => theme.accentColor.pressed};
  }
`;
const textExtraSmall = css`
  ${text};
  ${extraSmall};

  height: fit-content;
`;
const textSmall = css`
  ${text};
  ${small};
`;
const textMiddle = css`
  ${text};
  ${middle};
`;
const defOutlined = css`
  ${def};
  color: ${({ theme }) => theme.fontColor};
  fill: ${({ theme }) => theme.fillColor};
  border: 2px solid ${({ theme }) => theme.borderColor};

  &:hover {
    border: 2px solid ${({ theme }) => theme.trBorderClr};
  }

  &:active {
    //background-color: var(--ligthOrange);
    //box-shadow: var(--btnShadow_active);
  }
`;
const defaultSmall = css`
  ${defOutlined};
  ${small};
`;
const defaultMiddle = css`
  ${defOutlined};
  ${middle};
`;
const defaultLarge = css`
  ${defOutlined};
  ${large};
`;

const variants = {
  def,
  defNoEffects,

  defaultSmall,
  defaultMiddle,
  defaultLarge,

  pointerLeft,

  outlinedMiddle,
  outlinedSmall,
  outlinedExtraSmall,

  filledMiddle,
  filledSmall,

  textExtraSmall,
  textSmall,
  textMiddle,
  textUnderlined,

  onlyIcon,
  onlyIconNoEffects,
  onlyIconFilled,
  onlyIconOutlined,

  pointerBottom,
  filled,
  outlined,
  text,
};

const buttonSizeCss = {
  extraSmall,
  small,
  middle,
  large,
};

export type ButtonIconVariant = Keys<typeof variants>;
export type ButtonSize = Keys<typeof buttonSizeCss>;

function getVariant(variant?: ButtonIconVariant): FlattenInterpolation<ThemeProps<DefaultTheme>> {
  return variant ? variants?.[variant] : variants.def;
}

function getSize(size?: ButtonSize | null): FlattenInterpolation<ThemeProps<DefaultTheme>> | undefined {
  return size ? buttonSizeCss?.[size] : undefined;
}

const ButtonLoader = ({
  isLoading,
  size,
}: {
  variant?: ButtonIconProps['variant'];
  isLoading?: ButtonIconProps['isLoading'];
  size?: ButtonIconProps['size'];
}) => {
  const maybeNumber =
    (size?.endsWith('%') && size?.replace('%', '')) || (size?.endsWith('px') && size?.replace('px', '')) || undefined;
  const number = maybeNumber && isNaN(Number(maybeNumber)) ? 18 : Number(maybeNumber);
  const _size = number * 0.75;
  return isLoading ? (
    <LoaderBox fillHeight fillWidth>
      <AppLoaderSpiner strokeWidth={3} size={_size ?? 18} />
    </LoaderBox>
  ) : null;
};
const LoaderBox = styled(FlexBox)`
  align-items: center;
  justify-content: center;

  position: absolute;
  top: 0;
  left: 0;
  background-color: ${p => p.theme.backdropColorDark}; // backdropColorDarkExtraLight
`;

export const Button = {
  Base: memo(BaseButton),
};
export default memo(forwardRef(ButtonIcon));
