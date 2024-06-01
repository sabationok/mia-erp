import React, { CSSProperties, memo } from 'react';
import sprite, { IconIdType } from 'img/sprite';
import styled, { css, DefaultTheme, FlattenInterpolation, ThemeProps } from 'styled-components';
import { Property } from 'csstype';
import { AppLoaderSpiner } from '../AppLoaderSpiner';
import { Keys } from '../../../types/utils.types';
import FlexBox from '../FlexBox';

type TextTransform = 'uppercase' | 'lowercase' | 'capitalize' | 'none';

interface ButtonIconStyleProps {
  flex?: Property.Flex;
  alignItems?: Property.AlignItems;
  justifyContent?: Property.JustifyContent;
  gap?: Property.Gap;
  padding?: Property.Padding;
  margin?: Property.Margin;
  // maxWidth?: string;
  // maxHeight?: string;
  // width?: Property.Width;
  // height?: Property.Height;
  // border?: Property.Border;
}
interface ButtonProps extends ButtonIconStyleProps {
  size?: string;
  sizeType?: ButtonSize;
  variant: ButtonIconVariant;
  padding?: string;
  icon?: IconIdType;
  iconId?: string;
  iconSize?: string;
  isActive?: boolean;
  iconStyles?: CSSProperties;
  endIcon?: IconIdType;
  endIconId?: string;
  endIconSize?: string;
  endIconStyles?: CSSProperties;
  textTransform?: TextTransform;
  fontWeight?: 400 | 500 | 600 | 700 | 900;
  isLoading?: boolean;
}

export type ButtonIconProps = ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>;

const ButtonIcon: React.FC<ButtonIconProps> = ({
  children,
  isActive,
  type = 'button',
  size = '',
  variant = 'def',
  iconId,
  icon,
  iconSize = '18px',
  iconStyles = {},
  endIcon,
  endIconId = '',
  endIconSize = '18px',
  endIconStyles = {},
  isLoading,
  onClick = () => {
    console.log('ButtonIcon click');
  },
  ...props
}) => {
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

  return (
    <StyledButtonIcon
      {...{
        style: styles,
        variant,
        type,
        onClick,
        className: 'buttonIcon',
        isLoading: isLoading,
        ...props,
        disabled: props?.disabled,
      }}
    >
      {(iconId || icon) && (
        <SvgIcon className="icon" style={iconStyle}>
          <use href={`${sprite}#icon-${icon || iconId}`} />
        </SvgIcon>
      )}
      {variant && !variant.includes('Icon') && children}
      {/*{children}*/}
      <ButtonLoader isLoading={isLoading} variant={variant} size={size || '20px'} />

      {(endIconId || endIcon) && (
        <SvgIcon className="endIcon" style={endIconStyle}>
          <use href={`${sprite}#icon-${endIcon || endIconId}`}></use>
        </SvgIcon>
      )}
    </StyledButtonIcon>
  );
};

const ButtonIsLoadingCss = css`
  pointer-events: none;
  &[disabled] {
    opacity: 1;
  }
`;

const StyledButtonIcon = styled.button<ButtonIconProps>`
  flex: ${p => p?.flex};

  display: flex;
  position: relative;
  align-items: ${p => p?.alignItems || 'center'};
  justify-content: ${p => p?.justifyContent || 'center'};
  gap: ${p => p?.gap || 0};

  text-align: center;
  font-size: 13px;
  font-weight: ${({ fontWeight = 600 }) => fontWeight};
  font-family: inherit;
  letter-spacing: 0.05em;
  color: inherit;
  fill: currentColor;
  text-transform: ${({ textTransform = 'none' }) => textTransform};

  cursor: pointer;

  overflow: hidden;
  border-radius: 2px;
  border: 1px solid transparent;
  background-color: transparent;

  transition: ${({ theme }) => theme.globals.timingFunctionMain};

  padding: ${p => p?.padding || 0};
  margin: ${p => p?.margin || 0};

  ${({ variant = 'def' }) => getVariant(variant)}
  ${({ sizeType }) => getSize(sizeType)}

  &[disabled] {
    pointer-events: none;
    cursor: default;
    opacity: 0.75;
    fill: ${({ theme }) => theme.field.backgroundColor};
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

const SvgIcon = styled.svg`
  display: flex;
  align-items: center;
  justify-content: center;

  pointer-events: none;
  width: 100%;
  height: 100%;
`;

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

  &:active {
  }
`;
const extraSmall = css`
  padding: 4px 8px;
  min-width: 40px;
  height: 20px;
`;
const small = css`
  padding: 6px 12px;
  min-width: 50px;
  height: 26px;
`;
const middle = css`
  padding: 6px 16px;
  min-width: 80px;
  height: 32px;
`;
const large = css`
  padding: 6px 16px;
  min-width: 100px;
  height: 42px;
`;
const icon = css`
  min-width: 26px;
  min-height: 26px;
  width: fit-content;
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
    //background-color: var(--ligthOrange);
    //box-shadow: var(--btnShadow_active);
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

  &:hover {
    color: ${({ theme }) => theme.colorLight};
    fill: ${({ theme }) => theme.colorLight};
    background-color: ${({ theme }) => theme.accentColor.hover};
  }

  &:active {
    background-color: ${({ theme }) => theme.accentColor.pressed};
  }

  &[disabled] {
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
const underlinedText = css`
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
  border: 1px solid ${({ theme }) => theme.borderColor};

  &:hover {
    border: 1px solid ${({ theme }) => theme.trBorderClr};
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

  defaultSmall: defaultSmall,
  defaultMiddle: defaultMiddle,
  defaultLarge,

  pointerLeft,

  outlinedMiddle,
  outlinedSmall,
  outlinedExtraSmall,

  filledMiddle,
  filledSmall,
  underlinedText,

  textExtraSmall,
  textSmall,
  textMiddle: textMiddle,

  onlyIcon,
  onlyIconNoEffects,
  onlyIconFilled,
  onlyIconOutlined,

  pointerBottom,
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
  const _size = isNaN(Number(size?.replace('px', ''))) ? 18 : Number(size?.replace('px', '')) * 0.6;
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
  background-color: ${p => p.theme.backdropColor}; // backdropColorDarkExtraLight
`;

export default memo(ButtonIcon);
