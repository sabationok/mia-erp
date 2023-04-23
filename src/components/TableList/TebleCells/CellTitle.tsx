import React from 'react';
import styled from 'styled-components';
import { CellActionsName } from '../TebleCells';
import { IconIdType } from '../../../img/sprite/iconId.data';

export type CellTitleContent = {
  name: string;
  action?: string;
  dataKey?: string;
  nestedDataKey?: string;
  def?: string;
  sort?: boolean;
  align?: 'center' | 'start' | 'end';
  uppercase?: boolean;
  icon?: IconIdType;
  path?: string
};
export type CellTittleProps = {
  top: CellTitleContent;
  bottom?: CellTitleContent;
  width: string;
  idx?: number;
  titleInfo?: CellTittleProps;
  action: CellActionsName;
  onClick?: (ev: React.MouseEvent<HTMLDivElement>) => void;
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
        <Top align={top.align}>
          <span className='inner'> {top.name || top.dataKey || 'Title'}</span>
        </Top>

        <Bottom align={bottom?.align}>
          <span className='inner'> {bottom?.name || bottom?.dataKey || ''}</span>
        </Bottom>
      </Wrapper>

      <WidthChanger type='button'></WidthChanger>
    </StCellHead>
  );
};
const StCellHead = styled.div<{ width: string }>`
  display: flex;
  align-items: center;

  width: ${({ width }) => width};
  height: 100%;
  padding-left: 10px;

  /* outline: 1px solid tomato; */
`;
const Wrapper = styled.div`
  flex-grow: 1;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  justify-content: center;

  height: 100%;
`;
const Content = styled.div`
  flex-grow: 1;

  display: flex;
  align-items: center;
  gap: 4px;

  width: 100%;

  & .inner {
    flex-grow: 1;

    display: flex;
    align-items: center;

    width: 100%;
  }
`;

const Top = styled(Content)<Omit<CellTitleContent, 'name'>>`
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;

  & .inner {
    justify-content: ${({ align }) => (align === 'center' ? 'center' : `flex-${align}`)};
  }
`;
const Bottom = styled(Content)<Omit<CellTitleContent, 'name'>>`
  font-size: 11px;
  font-weight: 400;

  & .inner {
    justify-content: ${({ align }) => (align === 'center' ? 'center' : `flex-${align}`)};
  }
`;

const WidthChanger = styled.button`
  position: relative;

  height: 80%;
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
    width: 1px;
    /* border-right: 1px solid #59595a; */
    border-right: 1px solid ${({ theme }) => theme.trBorderClr};
  }
`;

export default CellTitle;
