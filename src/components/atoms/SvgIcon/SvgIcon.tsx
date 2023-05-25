import sprite, { IconIdType } from 'img/sprite';
import styled from 'styled-components';

export interface SvgIconProps extends React.SVGAttributes<SVGElement> {
  iconId?: string;
  size?: string;
  icon?: IconIdType;
}

const SvgIcon: React.FC<SvgIconProps> = ({
  iconId = 'info',
  size,
  icon,
  ...props
}) => {
  return (
    <Svg {...{ size, ...props }}>
      <use
        style={{ width: '100%', height: '100%' }}
        href={`${sprite}#icon-${icon || iconId}`}
      ></use>
    </Svg>
  );
};

const Svg = styled.svg<{ size?: string }>`
  width: ${({ size }) => size || '24px'};
  height: ${({ size }) => size || '24px'};

  pointer-events: none;
  transition: all ${({ theme }) => theme.globals.timingFunctionMain};
`;
export default SvgIcon;
