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
  titleInfo: { top, bottom, width, imgPreviewPath, getImgPreview },
  titleInfo,
  idx,
}) => {
  const { rowData } = useRow();

  // const cellConfig = useMemo(
  //   (): IDataCellProps => ({
  //     content: {
  //       data: getValueByPath({
  //         data: rowData,
  //         ...top,
  //       }),
  //     },
  //     subContent: {
  //       data: getValueByPath({
  //         data: rowData,
  //         ...bottom,
  //       }),
  //     },
  //     width,
  //     imgUrl,
  //   }),
  //   [bottom, imgUrl, rowData, top, width]
  // );

  const imgPreview = useMemo(() => {
    return getImgPreview
      ? getImgPreview(rowData, titleInfo)
      : getValueByPath({
          data: rowData,
          path: imgPreviewPath,
        });
  }, [getImgPreview, imgPreviewPath, rowData, titleInfo]);

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
      imgUrl: imgPreview,
    }),
    [bottom, imgPreview, rowData, titleInfo, top, width]
  );

  return <Cell.DoubleWithAvatar {...cellConfig} />;
};

export default memo(CellTextDblAndAvatar);
