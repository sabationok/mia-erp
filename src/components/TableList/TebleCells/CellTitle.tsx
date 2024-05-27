import React, { memo } from 'react';
import styled from 'styled-components';
import { CellActionsName } from '../TebleCells';
import { IconIdType } from '../../../img/sprite/iconId.data';
import { IBase } from '../../../redux/app-redux.types';
import { MaybeNull } from '../../../types/utils.types';

export type CellTitleContent<DataType = any, DataPath extends string = any> = {
  _id?: string;
  name: string;
  action?: string;
  dataKey?: keyof DataType | string;
  nestedDataKey?: string;
  def?: string;
  sort?: boolean;
  align?: 'center' | 'start' | 'end';
  uppercase?: boolean;
  icon?: IconIdType;
  path?: DataPath;
  description?: string;
  getData?: (
    rowData: DataType,
    titleProps: CellTittleProps<DataType, DataPath>
  ) => MaybeNull<string | string[] | number | number[] | Date | undefined>;
};

export type CellTittleProps<DataType = any, DataPath extends string = any> = {
  top: CellTitleContent<DataType, DataPath>;
  bottom?: CellTitleContent<DataType, DataPath>;
  cells?: CellTitleContent<DataType, DataPath>[];
  imgPreviewPath?: DataType;
  getImgPreview?: (rowData: DataType, titleProps: CellTittleProps<DataType, DataPath>) => string | null | undefined;
  imgPreviewIcon?: IconIdType;
  width: string;
  idx?: number;
  titleInfo?: CellTittleProps;
  action?: CellActionsName;
  onClick?: (ev: React.MouseEvent<HTMLDivElement>) => void;
  visibility?: boolean;
};

export interface CellDataType<DataType extends IBase = any, DataPath extends string = any>
  extends CellTittleProps<DataType, DataPath> {}

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
          <span className="inner">{top.name}</span>
        </Top>

        <Bottom align={bottom?.align} title={bottom?.description || bottom?.name}>
          {(bottom?.name || bottom?.dataKey) && <span className="inner">{bottom?.name}</span>}
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
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;

  color: ${({ theme }) => theme.accentColor.base};
`;
const Bottom = styled(Content)<Omit<CellTitleContent, 'name'>>`
  font-size: 10px;

  color: ${({ theme }) => theme.accentColor.base};
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
