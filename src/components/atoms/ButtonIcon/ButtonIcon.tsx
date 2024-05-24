import React, { memo } from 'react';
import sprite, { IconIdType } from 'img/sprite';
import styled, { css, DefaultTheme, FlattenInterpolation, ThemeProps } from 'styled-components';
import { Property } from 'csstype';
import { AppLoaderSpiner } from '../AppLoaderSpiner';
import { Keys } from '../../../types/utils.types';

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
  variant: ButtonIconVariant;
  padding?: string;
  icon?: IconIdType;
  iconId?: string;
  iconSize?: string;
  isActive?: boolean;
  iconStyles?: {};
  endIcon?: IconIdType;
  endIconId?: string;
  endIconSize?: string;
  endIconStyles?: {};
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
        ...props,
        disabled: isLoading || props?.disabled,
      }}
    >
      {(iconId || icon) && (
        <SvgIcon className="icon" style={iconStyle}>
          <use href={`${sprite}#icon-${icon || iconId}`} />
        </SvgIcon>
      )}

      {isLoading ? <AppLoaderSpiner strokeWidth={3} size={18} /> : variant && !variant.includes('Icon') && children}

      {(endIconId || endIcon) && (
        <SvgIcon className="endIcon" style={endIconStyle}>
          <use href={`${sprite}#icon-${endIcon || endIconId}`}></use>
        </SvgIcon>
      )}
    </StyledButtonIcon>
  );
};

const StyledButtonIcon = styled.button<ButtonIconProps>`
  flex: ${p => p?.flex};

  display: flex;
  align-items: ${p => p?.alignItems || 'center'};
  justify-content: ${p => p?.justifyContent || 'center'};
  gap: ${p => p?.gap || 0};

  text-align: center;
  font-size: 12px;
  font-weight: ${({ fontWeight = 500 }) => fontWeight};
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

  &[disabled] {
    pointer-events: none;
    cursor: default;
    opacity: 0.75;
    fill: ${({ theme }) => theme.field.backgroundColor};
    color: ${({ theme }) => theme.fontColor};
  }
  padding: ${p => p.padding};

  @media screen and (max-width: 480px) {
    //text-transform: uppercase;
    font-size: 16px;
    //height: max-content;
  }
`;

const SvgIcon = styled.svg`
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
`;
// const pointer = css`
//   background-color: ${({ theme }) => theme.defaultBtnBckgrndColor.def};

//   position: relative;
//   fill: ${({ theme }) => theme.colorLight};

//   border-radius: 0;
//   border-width: 0;
//   transition: all ${({ theme }) => theme.globals.timingFunctionMain};
//   &::before {
//     content: '';
//     position: absolute;
//     top: 50%;
//     left: 0;

//     transform: translateY(-50%);

//     width: 3px;
//     height: 50%;

//     background-color: transparent;
//     transition: height ${({ theme }) => theme.globals.timingFunctionLong};
//   }
//   ${def}
//   &:hover {
//     &::before {
//       height: 100%;
//       background-color: ${({ theme }) => theme.accentColor.base};
//     }
//   }
//   &:active {
//   }
// `;
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
  height: 28px;
`;
const large = css`
  padding: 6px 16px;

  min-width: 100px;
  height: 36px;
`;
const icon = css`
  min-width: 26px;
  height: 26px;
`;
const outlined = css`
  color: ${({ theme }) => theme.accentColor.base};
  fill: ${({ theme }) => theme.accentColor.base};
  border: 1px solid ${({ theme }) => theme.accentColor.base};
  /* background-color: transparent; */

  &:hover {
    border: 1px solid ${({ theme }) => theme.accentColor.hover};
    color: ${({ theme }) => theme.accentColor.hover};
    fill: ${({ theme }) => theme.accentColor.hover};
  }

  &:active {
    color: ${({ theme }) => theme.accentColor.pressed};
    fill: ${({ theme }) => theme.accentColor.pressed};
    border: 1px solid ${({ theme }) => theme.accentColor.pressed};
    background-color: var(--ligthOrange);
    box-shadow: var(--btnShadow_active);
  }

  &[disabled] {
    border-color: ${({ theme }) => theme.field.backgroundColor};
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
const outlinedLarge = css`
  ${outlined};
  ${large};
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
  ${small}
  ${filled}
`;
const filledLarge = css`
  ${large}
  ${filled}
`;
const onlyIconFilled = css`
  ${filled}
  ${icon}
`;
const onlyIconOutlined = css`
  ${outlined}
  ${icon}
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
const textLarge = css`
  ${text};
  ${large};
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
    background-color: var(--ligthOrange);
    box-shadow: var(--btnShadow_active);
  }
`;
const defOutlinedSmall = css`
  ${defOutlined};
  ${small};
`;
const defOutlinedLarge = css`
  ${defOutlined};
  ${large};
`;

const variants = {
  def,
  defNoEffects,
  pointerLeft,
  outlinedLarge,
  filledLarge,
  outlinedSmall,
  outlinedExtraSmall,
  filledSmall,
  underlinedText,
  textExtraSmall,
  textSmall,
  textLarge,

  onlyIcon,
  onlyIconNoEffects,
  onlyIconFilled,
  onlyIconOutlined,

  defOutlinedSmall,
  defOutlinedLarge,
  pointerBottom,
};

export type ButtonIconVariant = Keys<typeof variants>;

function getVariant(variant?: ButtonIconVariant): FlattenInterpolation<ThemeProps<DefaultTheme>> {
  return variant ? variants[variant] : variants.def;
}

export default memo(ButtonIcon);
