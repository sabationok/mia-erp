import React, { memo, useMemo } from 'react';
import { useRow } from '../TableRows/TableRow';
import { CellTittleProps } from './CellTitle';
import Cell, { IDataCellProps } from './Cells';

export interface CellTextDblAndAvatarProps {
  titleInfo: CellTittleProps;
  idx?: number;
  imgUrl?: string;
}

const CellTextDblAndAvatar: React.FC<CellTextDblAndAvatarProps & React.HTMLAttributes<HTMLDivElement>> = ({
  titleInfo: { top, bottom, width, getImgPreview, imgPreviewIcon },
  titleInfo,
}) => {
  const { rowData } = useRow();

  const cellConfig = useMemo(
    (): IDataCellProps => ({
      content: {
        ...top,
        data: top.getData ? top.getData(rowData, titleInfo) : null,
      },
      subContent: !bottom
        ? undefined
        : {
            ...bottom,
            data: bottom && bottom.getData ? bottom.getData(rowData, titleInfo) : null,
          },
      width,
      imgUrl: getImgPreview ? getImgPreview(rowData, titleInfo) : null,
      imgPreviewIcon,
    }),
    [bottom, getImgPreview, imgPreviewIcon, rowData, titleInfo, top, width]
  );

  return <Cell.DoubleWithAvatar {...cellConfig} />;
};

export default memo(CellTextDblAndAvatar);
