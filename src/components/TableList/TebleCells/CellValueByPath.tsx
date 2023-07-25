import React, { memo, useMemo } from 'react';
import { useRow } from '../TableRows/TableRow';
import { CellTittleProps } from './CellTitle';
import getValueByPath from '../../../utils/getValueByPath';
import Cell, { IDataCellProps } from './Cells';

export interface CellValueByPathProps {
  titleInfo: CellTittleProps;
  idx?: number;
}

const CellValueByPath: React.FC<CellValueByPathProps & React.HTMLAttributes<HTMLDivElement>> = ({
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
      subContent: {
        data:
          bottom && bottom.getData
            ? bottom.getData(rowData, titleInfo)
            : getValueByPath({
                data: rowData,
                ...bottom,
              }),
        align: bottom?.align,
        uppercase: bottom?.uppercase,
      },
      width,
    }),
    [bottom, rowData, titleInfo, top, width]
  );

  return <Cell.Double {...cellConfig} {...props} />;
};

export default memo(CellValueByPath);
