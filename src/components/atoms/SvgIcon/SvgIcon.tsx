import sprite from 'img/sprite';
import styled from 'styled-components';

export interface SvgIconProps extends React.SVGAttributes<SVGElement> {
  iconId?: string;
  size?: string;
}

const SvgIcon: React.FC<SvgIconProps> = ({ iconId = 'info', size, ...props }) => {
  return (
    <Svg {...{ size, ...props }}>
      <use href={`${sprite}#icon-${iconId}`}></use>
    </Svg>
  );
};

const Svg = styled.svg<{ size?: string }>`
  width: ${({ size }) => size || '24px'};
  height: ${({ size }) => size || '24px'};
  fill: inherit;
  pointer-events: none;
  transition: all ${({ theme }) => theme.globals.timingFunctionMain};
`;
export default SvgIcon;
