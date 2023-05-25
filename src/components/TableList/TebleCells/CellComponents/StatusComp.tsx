import React, { CSSProperties, memo } from 'react';
import { statusDataMap } from 'data';

import styled, { css } from 'styled-components';
import { StatusNames } from 'data/statuses.data';

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
  return (
    <StStatusComp
      variant={variant}
      title={statusDataMap[status]?.description}
      fontSize={fontSize}
      fontWeight={fontWeight}
      color={statusDataMap[status]?.color}
      backgroundColor={statusDataMap[status]?.backgroundColor}
      fillWidth={fillWidth}
    >
      {/* {statusData?.iconId && <SvgIcon iconId={statusData?.iconId} size="20px" />} */}

      <Label className="inner">{statusDataMap[status]?.label}</Label>
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
  font-size: ${({ fontSize = '14px' }) => fontSize};

  width: ${({ fillWidth = false }) => (fillWidth ? '100%' : '')};
  max-width: 100%;
  height: 100%;

  overflow: hidden;

  font-weight: ${({ fontWeight = 600 }) => fontWeight};
  cursor: default;
  color: ${({ color, theme }) => (color ? color : '')};
  fill: ${({ fill, theme }) => (fill ? fill : '')};
  border-radius: 2px;

  ${({ variant }) => (variant ? variantsMap[variant] : variantsMap['text'])};
`;
const Label = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export default memo(StatusComp);
