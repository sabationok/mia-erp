import { OverlayHandler } from 'Providers/Overlay/OverlayStackProvider';
import React from 'react';

export type RenderOverviewCellComponent<Data = any> = React.FC<{
  cell: Omit<OverviewCellProps<Data>, 'CellComponent'>;
  overlayHandler: OverlayHandler;
  data?: Data;
}>;

export interface OverviewCellProps<Data = any, Tab = any> {
  value?: string | number;
  title?: string;
  gridArea?: keyof Data | string;
  CellComponent?: RenderOverviewCellComponent<Data>;
  getValue?: (data: Data) => React.ReactNode;
  tab?: Tab;
}
