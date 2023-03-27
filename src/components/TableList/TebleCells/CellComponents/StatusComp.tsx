import React from 'react';
import { statusDataMap } from 'data';

import styled, { css } from 'styled-components';
import { StatusNames } from 'data/statuses.data';

export type StatusCompVariants = 'outlined' | 'filled' | 'text';
export interface StatusCompProps {
  status: StatusNames;
  variant?: StatusCompVariants;
}
const StatusComp: React.FC<StatusCompProps> = ({ status = 'noStatus', variant = 'text' }) => {
  let statusData = statusDataMap[status];

  const style = {
    color: statusData?.color,
    fill: statusData?.color,
    borderColor: variant === 'outlined' ? statusData?.color : 'transparent',
  };

  return (
    <StStatusComp variant={variant} style={style} title={statusData?.descr}>
      {/* {statusData?.iconId && <SvgIcon iconId={statusData?.iconId} size="20px" />} */}

      <Label>{statusData?.label}</Label>
    </StStatusComp>
  );
};
type VariansMapType = {
  [variant in StatusCompVariants]?: any;
};
const variantsMap: VariansMapType = {
  outlined: css`
    border: 2px solid;
  `,
  filled: css``,
  text: css``,
};

const StStatusComp = styled.div<{ variant: StatusCompVariants; color?: string; fill?: string; borderColor?: string }>`
  display: flex;
  align-items: center;

  gap: 8px;
  font-size: 14px;

  min-width: 100%;
  height: 100%;

  overflow: hidden;

  cursor: default;
  color: ${({ color, theme }) => (color ? color : '')};
  fill: ${({ fill, theme }) => (fill ? fill : '')};
  border-color: ${({ borderColor, theme }) => (borderColor ? borderColor : theme.borderColor)};

  ${({ variant }) => (variant ? variantsMap[variant] : variantsMap['text'])};
`;
const Label = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export default StatusComp;
