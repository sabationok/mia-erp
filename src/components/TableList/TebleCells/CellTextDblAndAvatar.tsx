import React, { memo, useMemo } from 'react';
import { useRow } from '../TableRows/TableRow';
import { CellTittleProps } from './CellTitle';
import getValueByPath from '../../../utils/getValueByPath';
import Cell, { IDataCellProps } from './Cells';

export interface CellTextDblAndAvatarProps {
  titleInfo: CellTittleProps;
  idx?: number;
  imgUrl?: string;
}

const CellTextDblAndAvatar: React.FC<CellTextDblAndAvatarProps & React.HTMLAttributes<HTMLDivElement>> = ({
  titleInfo: { top, bottom, width },
  idx,
  imgUrl,
  ...props
}) => {
  const { rowData } = useRow();

  const cellConfig = useMemo(
    (): IDataCellProps => ({
      content: {
        data: getValueByPath({
          data: rowData,
          ...top,
        }),
      },
      subContent: {
        data: getValueByPath({
          data: rowData,
          ...bottom,
        }),
      },
      width,
      imgUrl,
    }),
    [bottom, imgUrl, rowData, top, width]
  );

  return <Cell.DoubleWithAvatar {...cellConfig} />;
};

export default memo(CellTextDblAndAvatar);
