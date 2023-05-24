import React from 'react';
import FlexBox from '../../atoms/FlexBox';

export type RowActionsProps = {};
const RowActions: React.FC<RowActionsProps> = () => {
  return (
    <FlexBox
      width={'45px'}
      overflow={'hidden'}
      style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
    >
      RowActions
    </FlexBox>
  );
};

export default RowActions;
