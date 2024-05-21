import React, { memo, useMemo } from 'react';
import { useRow } from '../TableRows/TableRow';
import { CellTittleProps } from './CellTitle';
import getValueByPath from '../../../utils/getValueByPath';
import Cell, { IDataCellProps } from './Cells';
import { toPrice } from '../../../utils/numbers';

export interface CellPricesProps {
  titleInfo: CellTittleProps;
  idx?: number;
}

const CellPrices: React.FC<CellPricesProps & React.HTMLAttributes<HTMLDivElement>> = ({
  titleInfo: { top, bottom, width = '100px' },
  titleInfo,
  idx,
  ...props
}) => {
  const { rowData } = useRow();

  const cellConfig = useMemo(
    (): IDataCellProps => ({
      content: {
        data: top?.getData
          ? top?.getData(rowData, titleInfo)
          : toPrice(
              getValueByPath({
                data: rowData,
                ...top,
              })
            ),
        align: top.align,
        uppercase: top.uppercase,
      },
      subContent: {
        data: bottom?.getData
          ? bottom?.getData(rowData, titleInfo)
          : toPrice(
              getValueByPath({
                data: rowData,
                ...bottom,
              })
            ),
        align: bottom?.align,
        uppercase: bottom?.uppercase,
      },
      width,
    }),
    [bottom, rowData, titleInfo, top, width]
  );

  return <Cell.Double {...cellConfig} {...props} />;
};

export default memo(CellPrices);
