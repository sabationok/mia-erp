import React, { memo, useMemo } from 'react';

import styled, { css } from 'styled-components';
import { getStatusData, StatusData, StatusNames } from 'data/statuses.data';
import { Property } from 'csstype';

export type StatusCompVariants = 'outlined' | 'filled' | 'text';

export interface StatusCompProps {
  status?: StatusNames;
  variant?: StatusCompVariants;
  fontSize?: Property.FontSize;
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
  const statusData = useMemo((): StatusData | undefined => getStatusData(status), [status]);

  return (
    <StStatusComp
      variant={variant}
      title={statusData?.description}
      color={statusData?.color}
      backgroundColor={statusData?.colorSecondary}
      fillWidth={fillWidth}
    >
      {/*{statusData?.iconId && <SvgIcon icon={statusData?.iconId} size="20px" />}*/}

      <Label className={'inner'} fontSize={fontSize} fontWeight={statusData?.label || fontWeight ? fontWeight : 400}>
        {statusData?.label || status}
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
    border-radius: 4px;
    font-weight: 600;
    color: ${({ color }) => (color ? color : 'inherit')};
    fill: ${({ color }) => (color ? color : 'inherit')};
    border: 1px solid ${({ color, theme }) => (color ? color : theme.borderColor)};
    background-color: ${({ backgroundColor }) => (backgroundColor ? backgroundColor : '')};
  `,
  filled: css<VariantProps>`
    height: 100%;

    border-radius: 4px;
    color: ${({ color }) => (color ? color : 'inherit')};
    fill: ${({ color }) => (color ? color : 'inherit')};
    background-color: ${({ backgroundColor }) => (backgroundColor ? backgroundColor : '')};
  `,
  text: css<VariantProps>`
    padding: 2px 0;
    color: ${({ color }) => (color ? color : 'inherit')};
    fill: ${({ color }) => (color ? color : 'inherit')};
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

  padding: 4px 6px;

  overflow: hidden;

  color: ${({ color }) => (color ? color : 'inherit')};
  fill: ${({ fill }) => (fill ? fill : 'inherit')};

  cursor: default;
  border-radius: 2px;

  ${({ variant }) => (variant ? variantsMap[variant] : variantsMap['text'])};
`;
const Label = styled.span<StatusCompProps>`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  //font-size: ${({ fontSize = '14px' }) => fontSize};
  //font-weight: ${({ fontWeight = 600 }) => fontWeight};
`;
export default memo(StatusComp);
