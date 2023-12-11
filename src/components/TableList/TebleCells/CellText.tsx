import React, { memo, useMemo } from 'react';
import { useRow } from '../TableRows/TableRow';
import { CellTittleProps } from './CellTitle';
import getValueByPath from '../../../utils/getValueByPath';
import Cell, { IDataCellProps } from './Cells';

export interface CellTextProps {
  titleInfo: CellTittleProps;
  idx?: number;
}

const CellText: React.FC<CellTextProps & React.HTMLAttributes<HTMLDivElement>> = ({
  titleInfo,
  titleInfo: { top, bottom, width = '100px' },
  idx,
  ...props
}) => {
  const { rowData } = useRow();

  const cellConfig = useMemo(
    (): IDataCellProps => ({
      content: {
        data: top.getData
          ? top.getData(rowData, titleInfo)
          : getValueByPath({
              data: rowData,
              ...top,
            }),
        align: top.align,
        uppercase: top.uppercase,
      },
      width,
    }),
    [rowData, titleInfo, top, width]
  );

  return <Cell.Simple {...cellConfig} {...props} />;
};

export default memo(CellText);
