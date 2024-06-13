import { RenderOverviewCellComponent } from './overview-types';
import FlexBox from '../../atoms/FlexBox';
import { t } from '../../../lang';
import React, { useMemo } from 'react';
import { CellStyledComp } from './CellStyles';

export const OverviewTextCell: RenderOverviewCellComponent = ({ cell, data }) => {
  const value = useMemo(() => (cell.getValue ? cell.getValue(data) : null), [cell, data]);

  return (
    <CellStyledComp.Cell>
      <CellStyledComp.CellText $isTitle $size={13} $padding={'6px 8px'}>
        {cell?.title}
      </CellStyledComp.CellText>

      <FlexBox
        fillWidth
        flex={1}
        fxDirection={'column'}
        gap={8}
        justifyContent={'flex-end'}
        alignItems={'flex-end'}
        overflow={'hidden'}
        style={{ minHeight: 32 }}
      >
        {!value || ['string', 'number'].includes(typeof value) ? (
          <CellStyledComp.CellText $isTitle={!value} $weight={500}>
            {value || t('undefined')}
          </CellStyledComp.CellText>
        ) : (
          value
        )}
      </FlexBox>
    </CellStyledComp.Cell>
  );
};
