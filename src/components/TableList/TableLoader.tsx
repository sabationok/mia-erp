import { t } from '../../lang';
import styled, { useTheme } from 'styled-components';
import { Oval } from 'react-loader-spinner';
import { Text } from '../atoms/Text';
import FlexBox from '../atoms/FlexBox';
import React from 'react';

const TableLoader = ({ isLoading, text = t('Loading content...') }: { isLoading?: boolean; text?: string }) => {
  const theme = useTheme();
  return (
    <TableLoaderBox isLoading={isLoading}>
      <Loader gap={16} fxDirection={'row'} alignItems={'center'} padding={'8px'}>
        <Oval
          height="28"
          width="28"
          color={theme.accentColor.base}
          ariaLabel="tail-spin-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          secondaryColor={theme.accentColor.light}
          strokeWidth={3}
          strokeWidthSecondary={3}
        />

        <Text $weight={500} $size={12}>
          {text}
        </Text>
      </Loader>
    </TableLoaderBox>
  );
};
const TableLoaderBox = styled(FlexBox)<{ isLoading?: boolean }>`
  position: absolute;
  top: 100%;
  left: 50%;
  z-index: 70;

  padding: 8px 8px 24px;

  transform: ${p => (p.isLoading ? 'translate(-50%, -100%)' : 'translate(-50%, 0)')};

  max-width: 90%;
  transition: ${p => p.theme.globals.timingFnMui};
`;
const Loader = styled(FlexBox)`
  min-height: 70px;
  width: 320px;
  max-width: 80%;
  border-radius: 4px;

  background-color: ${p => p.theme.modalBackgroundColor};
  box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1), 0 2px 15px 0 rgba(0, 0, 0, 0.05);
`;
export default TableLoader;
