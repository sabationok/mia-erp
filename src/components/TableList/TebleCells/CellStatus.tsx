import React, { memo, useMemo } from 'react';
import { useRow } from '../TableRows/TableRow';
import { CellTittleProps } from './CellTitle';
import getValueByPath from '../../../utils/getValueByPath';
import Cells, { IDataCellProps } from './Cells';
import { StatusNames } from '../../../data/statuses.data';

export interface CellTextDblProps {
  titleInfo: CellTittleProps;
  idx?: number;
}

const CellStatus: React.FC<CellTextDblProps & React.HTMLAttributes<HTMLDivElement>> = ({
  titleInfo: { top, bottom, width = '100px' },
  idx,
  ...props
}) => {
  const { rowData } = useRow();

  const cellConfig = useMemo(
    (): IDataCellProps => ({
      content: {
        data: getValueByPath<StatusNames>({
          data: rowData,
          ...top,
        }),
      },
      subContent: {
        data: getValueByPath<StatusNames>({
          data: rowData,
          ...bottom,
        }),
      },
    }),
    [bottom, rowData, top]
  );

  return <Cells.DoubleStatus {...cellConfig} width={width} />;
};

export default memo(CellStatus);
