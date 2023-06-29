import React, { memo } from 'react';
import styled from 'styled-components';
import { CellActionsName } from '../TebleCells';
import { IconIdType } from '../../../img/sprite/iconId.data';

export type CellTitleContent<DataPath extends string = any> = {
  name: string;
  action?: string;
  dataKey?: string;
  nestedDataKey?: string;
  def?: string;
  sort?: boolean;
  align?: 'center' | 'start' | 'end';
  uppercase?: boolean;
  icon?: IconIdType;
  path?: DataPath;
  description?: string;
};
export type CellTittleProps<DPath extends string = any> = {
  top: CellTitleContent<DPath>;
  bottom?: CellTitleContent<DPath>;
  width: string;
  idx?: number;
  titleInfo?: CellTittleProps;
  action: CellActionsName;
  onClick?: (ev: React.MouseEvent<HTMLDivElement>) => void;
  visibility?: boolean;
};

const CellTitle: React.FC<CellTittleProps & React.HTMLAttributes<HTMLDivElement>> = ({
  width,
  idx,
  onClick,
  top,
  bottom,
  ...props
}) => {
  return (
    <StCellHead width={width} onClick={onClick} {...props}>
      <Wrapper>
        <Top align={top.align} title={top?.description || top.name}>
          <span className="inner">{top.name || top.dataKey}</span>
        </Top>

        <Bottom align={bottom?.align} title={bottom?.description || bottom?.name}>
          {(bottom?.name || bottom?.dataKey) && <span className="inner">{bottom?.name || bottom?.dataKey}</span>}
        </Bottom>
      </Wrapper>

      <WidthChanger type="button" />
    </StCellHead>
  );
};
const StCellHead = styled.div<{ width: string }>`
  display: flex;
  align-items: center;

  width: ${({ width }) => width};
  height: 100%;
  padding: 4px 0 4px 10px;
  gap: 6px;
`;
const Wrapper = styled.div`
  flex-grow: 1;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  justify-content: center;

  height: 100%;
`;
const Content = styled.div<Omit<CellTitleContent, 'name'>>`
  flex-grow: 1;

  display: flex;
  align-items: center;
  gap: 4px;

  overflow: hidden;

  line-height: 1;

  width: 100%;

  justify-content: ${({ align }) => (align === 'center' ? 'center' : `flex-${align}`)};

  & .inner {
    max-width: 100%;
    /* display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1; */
    //word-break: break-word;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const Top = styled(Content)<Omit<CellTitleContent, 'name'>>`
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
`;
const Bottom = styled(Content)<Omit<CellTitleContent, 'name'>>`
  font-size: 11px;
  font-weight: 400;
`;

const WidthChanger = styled.button`
  position: relative;

  height: 100%;
  width: 4px;
  border-style: none;
  background-color: transparent;
  padding: 0;

  cursor: col-resize;

  &::before {
    position: absolute;
    top: 0;
    right: 0;
    display: block;
    content: '';
    height: 100%;
    width: 2px;
    /* border-right: 1px solid #59595a; */
    background-color: ${({ theme }) => theme.tableHeaderStroke};
    transition: ${({ theme }) => theme.globals.timingFnMui};
  }

  &:hover {
    &::before {
      background-color: ${({ theme }) => theme.accentColor.base};
    }
  }

  &[disabled] {
    &:hover {
      cursor: default;

      &::before {
        background-color: ${({ theme }) => theme.tableHeaderStroke};
      }
    }
  }
`;

export default memo(CellTitle);
