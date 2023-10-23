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
  idx,
}) => {
  const { rowData } = useRow();

  const imgPreview = useMemo(() => {
    return getImgPreview ? getImgPreview(rowData, titleInfo) : null;
  }, [getImgPreview, rowData, titleInfo]);

  const cellConfig = useMemo(
    (): IDataCellProps => ({
      content: {
        data: top.getData ? top.getData(rowData, titleInfo) : null,
        align: top.align,
        uppercase: top.uppercase,
      },
      subContent: {
        data: bottom && bottom.getData ? bottom.getData(rowData, titleInfo) : null,
        align: bottom?.align,
        uppercase: bottom?.uppercase,
      },
      width,
      imgUrl: imgPreview,
      imgPreviewIcon,
    }),
    [bottom, imgPreview, rowData, titleInfo, top, width]
  );

  return <Cell.DoubleWithAvatar {...cellConfig} />;
};

export default memo(CellTextDblAndAvatar);
