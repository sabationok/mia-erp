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

  const cellConfig = useMemo((): IDataCellProps => {
    const props: IDataCellProps = {
      content: {},
      subContent: {},
      width,
    };
    for (const [key, val] of [
      ['content', top],
      ['subContent', bottom],
    ] as const) {
      props[key] = {
        ...val,
        data:
          val && val.getData
            ? val.getData(rowData, titleInfo)
            : getValueByPath({
                data: rowData,
                ...val,
              }),
      };
    }

    return props;
  }, [bottom, rowData, titleInfo, top, width]);

  return <Cell.Double {...cellConfig} {...props} />;
};

export default memo(CellValueByPath);
