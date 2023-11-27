import React, { memo, useMemo } from 'react';
import { useRow } from '../TableRows/TableRow';
import { CellTittleProps } from './CellTitle';
import Cell, { IDataCellProps } from './Cells';

export interface CellTextAndAvatarProps {
  titleInfo: Omit<CellTittleProps, 'bottom'>;
  idx?: number;
  imgUrl?: string;
}

const CellTextAndAvatar: React.FC<CellTextAndAvatarProps & React.HTMLAttributes<HTMLDivElement>> = ({
  titleInfo: { top, width, getImgPreview, imgPreviewIcon },
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
      width,
      imgUrl: imgPreview,
      imgPreviewIcon,
    }),
    [imgPreview, imgPreviewIcon, rowData, titleInfo, top, width]
  );

  return <Cell.DataWithAvatar {...cellConfig} />;
};

export default memo(CellTextAndAvatar);
