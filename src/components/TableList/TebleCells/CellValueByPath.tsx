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
        ...top,
        data: top.getData
          ? top.getData(rowData, titleInfo)
          : getValueByPath({
              data: rowData,
              ...top,
            }),
      },
      subContent: {
        ...bottom,
        data:
          bottom && bottom.getData
            ? bottom.getData(rowData, titleInfo)
            : getValueByPath({
                data: rowData,
                ...bottom,
              }),
      },
      width,
    }),
    [bottom, rowData, titleInfo, top, width]
  );

  return <Cell.Double {...cellConfig} {...props} />;
};

export default memo(CellValueByPath);
