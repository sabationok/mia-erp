import React from 'react';
import { statusDataMap } from 'data';

import styled, { css } from 'styled-components';
import { StatusNames } from 'data/statuses.data';

export type StatusCompVariants = 'outlined' | 'filled' | 'text';

export interface StatusCompProps {
  status: StatusNames;
  variant?: StatusCompVariants;
  fontSize?: string;
}

const StatusComp: React.FC<StatusCompProps> = ({
  status = 'noStatus',
  variant = 'text',
  fontSize,
}) => {
  // let statusData = statusDataMap[status];
  //
  // const style = {
  //   color: statusData?.color,
  //   fill: statusData?.color,
  //   borderColor: variant === 'outlined' ? statusData?.color : 'transparent',
  // };

  return (
    <StStatusComp
      variant={variant}
      title={statusDataMap[status]?.descr}
      fontSize={fontSize}
      color={statusDataMap[status]?.color}
    >
      {/* {statusData?.iconId && <SvgIcon iconId={statusData?.iconId} size="20px" />} */}

      <Label className="inner">{statusDataMap[status]?.label}</Label>
    </StStatusComp>
  );
};
type VariansMapType = {
  [variant in StatusCompVariants]?: any;
};
const variantsMap: VariansMapType = {
  outlined: css<{ color?: string }>`
    padding: 0 4px;
    color: ${({ color }) => (color ? color : '')};
    fill: ${({ color }) => (color ? color : '')};
    border: 2px solid
      ${({ color, theme }) => (color ? color : theme.borderColor)};
  `,
  filled: css<{ color?: string }>`
    padding: 0 4px;
    color: #fff;
    fill: #fff;
    background-color: ${({ color }) => (color ? color : '')};
  `,
  text: css<{ color?: string }>`
    color: ${({ color }) => (color ? color : '')};
  `,
};

const StStatusComp = styled.div<{
  variant: StatusCompVariants;
  color?: string;
  fill?: string;
  borderColor?: string;
  fontSize?: string;
}>`
  display: flex;
  align-items: center;

  gap: 8px;
  font-size: ${({ fontSize = '14px' }) => fontSize};

  width: 100%;
  max-width: 100%;
  height: 100%;

  overflow: hidden;

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
export default StatusComp;
