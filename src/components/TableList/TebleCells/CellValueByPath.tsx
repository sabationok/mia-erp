import React, { memo, useMemo } from 'react';
import { useRow } from '../TableRows/TableRow';
import { CellTittleProps } from './CellTitle';
import getValueByPath from '../../../utils/getValueByPath';
import Cell, { IDataCellProps } from './Cells';

export interface CellValueByPathProps {
  titleInfo: CellTittleProps;
  idx?: number;
}

const CellValueByPath: React.FC<
  CellValueByPathProps & React.HTMLAttributes<HTMLDivElement>
> = ({ titleInfo: { top, bottom, width = '100px' }, idx, ...props }) => {
  const { rowData } = useRow();

  const contentTop = getValueByPath({
    data: rowData,
    ...top,
  });
  const contentBottom = getValueByPath({
    data: rowData,
    ...bottom,
  });

  const cellConfig = useMemo(
    (): IDataCellProps => ({
      content: {
        data: contentTop,
        align: top.align,
        uppercase: top.uppercase,
      },
      subContent: {
        data: contentBottom,
        align: bottom?.align,
        uppercase: bottom?.uppercase,
      },
      width,
    }),
    [
      bottom?.align,
      bottom?.uppercase,
      contentBottom,
      contentTop,
      top.align,
      top.uppercase,
      width,
    ]
  );

  return <Cell.Double {...cellConfig} />;
};

export default memo(CellValueByPath);
