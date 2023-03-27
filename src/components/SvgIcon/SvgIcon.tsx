import sprite from 'img/sprite';
import styled from 'styled-components';

interface SvgIconProps {
  iconId?: string;
  size?: string;
}

const SvgIcon: React.FC<SvgIconProps & React.SVGAttributes<SVGElement>> = ({ iconId = 'info', size, ...props }) => {
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
  transition: all var(--timing-function__main);
`;
export default SvgIcon;
