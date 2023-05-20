import React from 'react';
import { useRow } from '../TableRows/TableRow';
import { CellTittleProps } from './CellTitle';
import getValueByPath from '../../../utils/getValueByPath';
import Cell from './Cells';

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
    path: top.path,
  });
  const contentBottom = getValueByPath({
    data: rowData,
    path: bottom?.path,
  });

  return (
    <Cell.Double
      width={width}
      content={{
        data: contentTop,
        align: top.align,
        uppercase: top.uppercase,
      }}
      subContent={{
        data: contentBottom,
        align: bottom?.align,
        uppercase: bottom?.uppercase,
      }}
    />
  );
};

export default CellValueByPath;
