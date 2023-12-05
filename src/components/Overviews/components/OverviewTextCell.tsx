import { RenderOverviewCellComponent } from './overview-types';
import FlexBox from '../../atoms/FlexBox';
import { t } from '../../../lang';
import React from 'react';
import { CellStyledComp } from './CellStyles';

export const OverviewTextCell: RenderOverviewCellComponent = ({ cell, data }) => {
  const value = cell.getValue ? cell.getValue(data) : null;

  return (
    <CellStyledComp.Cell>
      <CellStyledComp.CellText $isTitle $size={12}>
        {cell?.title}
      </CellStyledComp.CellText>

      <FlexBox
        fillWidth
        flex={1}
        fxDirection={'row'}
        justifyContent={'flex-end'}
        alignItems={'flex-end'}
        overflow={'hidden'}
        style={{ minHeight: 24 }}
      >
        <CellStyledComp.CellText $isTitle={!value} $weight={500}>
          {value || t('undefined')}
        </CellStyledComp.CellText>
      </FlexBox>
    </CellStyledComp.Cell>
  );
};
