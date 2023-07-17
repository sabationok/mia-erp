import React, { CSSProperties, memo, useMemo } from 'react';
import { statusDataMap } from 'data';

import styled, { css } from 'styled-components';
import { StatusNames } from 'data/statuses.data';
import SvgIcon from '../../../atoms/SvgIcon/SvgIcon';

export type StatusCompVariants = 'outlined' | 'filled' | 'text';

export interface StatusCompProps {
  status?: StatusNames;
  variant?: StatusCompVariants;
  fontSize?: CSSProperties['fontSize'];
  fontWeight?: 300 | 400 | 500 | 600 | 700 | 800 | 900;
  fillWidth?: boolean;
}

const StatusComp: React.FC<StatusCompProps> = ({
  status = 'noStatus',
  variant = 'text',
  fontSize,
  fontWeight,
  fillWidth = false,
}) => {
  const { label, color, iconId, backgroundColor, description } = useMemo(() => statusDataMap[status] || {}, [status]);

  console.log(label);
  return (
    <StStatusComp
      variant={variant}
      title={description}
      color={color}
      backgroundColor={backgroundColor}
      fillWidth={fillWidth}
    >
      {iconId && <SvgIcon iconId={iconId} size="20px" />}

      <Label className={'inner'} fontSize={fontSize} fontWeight={label || fontWeight ? fontWeight : 400}>
        {label || status}
      </Label>
    </StStatusComp>
  );
};
type VariansMapType = {
  [variant in StatusCompVariants]?: any;
};
type VariantProps = {
  color?: string;
  backgroundColor?: string;
  fill?: string;
  borderColor?: string;
  fontSize?: string;
};
const variantsMap: VariansMapType = {
  outlined: css<VariantProps>`
    padding: 0 4px;
    color: ${({ color }) => (color ? color : '')};
    fill: ${({ color }) => (color ? color : '')};
    border: 2px solid ${({ color, theme }) => (color ? color : theme.borderColor)};
  `,
  filled: css<VariantProps>`
    padding: 0 4px;
    color: ${({ color }) => (color ? color : '')};
    fill: #fff;
    background-color: ${({ backgroundColor }) => (backgroundColor ? backgroundColor : '')};
  `,
  text: css<VariantProps>`
    color: ${({ color }) => (color ? color : '')};
  `,
};

const StStatusComp = styled.div<
  {
    color?: string;
    fill?: string;
    borderColor?: string;
    backgroundColor?: string;
  } & Omit<StatusCompProps, 'status'>
>`
  display: flex;
  align-items: center;

  gap: 8px;

  width: ${({ fillWidth = false }) => (fillWidth ? '100%' : '')};
  max-width: 100%;
  height: 100%;

  overflow: hidden;

  cursor: default;
  color: ${({ color, theme }) => (color ? color : '')};
  fill: ${({ fill, theme }) => (fill ? fill : '')};
  border-radius: 2px;

  ${({ variant }) => (variant ? variantsMap[variant] : variantsMap['text'])};
`;
const Label = styled.span<StatusCompProps>`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  font-size: ${({ fontSize = '14px' }) => fontSize};
  font-weight: ${({ fontWeight = 600 }) => fontWeight};
`;
export default memo(StatusComp);
