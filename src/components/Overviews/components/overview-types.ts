import React from 'react';
import { OverlayHandler } from '../../AppPages/PageProductOverview/PageCurrentProductProvider';

export type RenderOverviewCellComponent<Data = any> = React.FC<{
  cell: OverviewCellProps<Data>;
  setOverlayContent: OverlayHandler;
  data?: Data;
}>;

export interface OverviewCellProps<Data = any, Tab = any> {
  value?: string | number;
  title?: string;
  gridArea?: keyof Data | string;
  CellComponent?: RenderOverviewCellComponent<Data>;
  getValue?: (data: Data) => React.ReactNode | undefined | null;
  tab?: Tab;
}
