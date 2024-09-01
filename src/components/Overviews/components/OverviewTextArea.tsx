import { RenderOverviewAreaComponent } from './overview-types';
import FlexBox from '../../atoms/FlexBox';
import { t } from '../../../i18e';
import React, { useMemo } from 'react';
import { AreaStyledComp } from './CellStyles';

export const OverviewTextArea: RenderOverviewAreaComponent = ({ cell, data }) => {
  const value = useMemo(() => (cell.getValue ? cell.getValue(data) : null), [cell, data]);

  return (
    <AreaStyledComp.Cell>
      <AreaStyledComp.CellText $isTitle $size={13} $padding={'6px 8px'}>
        {cell?.title}
      </AreaStyledComp.CellText>

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
          <AreaStyledComp.CellText $isTitle={!value} $weight={500}>
            {value || t('undefined')}
          </AreaStyledComp.CellText>
        ) : (
          value
        )}
      </FlexBox>
    </AreaStyledComp.Cell>
  );
};
