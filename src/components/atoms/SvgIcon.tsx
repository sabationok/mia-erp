import sprite, { IconIdType } from 'img/sprite';
import styled from 'styled-components';
import { Property } from 'csstype';

const getIcon = (icon?: IconIdType) => `${sprite}#icon-${icon}`;
export interface SvgIconProps extends React.SVGAttributes<SVGElement> {
  size?: Property.Width | Property.Height;
  maxSize?: Property.MaxWidth | Property.MaxHeight;
  icon?: IconIdType;

  isError?: boolean;
  isSuccess?: boolean;
  isWarn?: boolean;
}

const SvgIcon: React.FC<SvgIconProps> = ({ icon, ...props }) => {
  return (
    <Svg {...{ ...props }}>
      <use
        // style={{ width: "100%", height: "100%" }}
        width={'100%'}
        height={'100%'}
        href={getIcon(icon || icon)}
      ></use>
    </Svg>
  );
};

const Svg = styled.svg<SvgIconProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: ${({ size }) => size ?? '24px'};
  //height: ${({ size }) => size ?? '24px'};

  min-width: ${({ size }) => size ?? '24px'};
  min-height: ${({ size }) => size ?? '24px'};

  max-width: ${({ maxSize }) => maxSize ?? '100%'};
  max-height: ${({ maxSize }) => maxSize ?? '100%'};

  object-position: center;

  //max-width: 100%;

  object-fit: cover;

  aspect-ratio: 1/1;

  pointer-events: none;

  fill: ${({ isError, isSuccess, isWarn, theme }) =>
    (isError && theme.globals.colors.error) ||
    (isSuccess && theme.globals.colors.success) ||
    (isWarn && theme.globals.colors.warning) ||
    ''};
`;
// transition: all ${({ theme }) => theme.ti};
export default SvgIcon;
