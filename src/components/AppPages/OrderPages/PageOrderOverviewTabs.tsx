import styled from 'styled-components';
import FlexBox from '../../atoms/FlexBox';
import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon';
import { Text } from '../../atoms/Text';
import ModalFilter, { FilterSelectHandler } from '../../ModalForm/ModalFilter';
import { useMemo, useState } from 'react';
import VariationsTab from '../PageProductOverview/tabs/VariationsTab';
import PricesTab from '../PageProductOverview/tabs/PricesTab';
import WarehousingTab from '../PageProductOverview/tabs/WarehousingTab';
import { enumToFilterOptions } from '../../../utils/fabrics';
import { useOrdersSelector } from '../../../redux/selectors.store';
import { ServiceName, useAppServiceProvider } from '../../../hooks/useAppServices.hook';
import { useAppParams } from '../../../hooks';

export interface PageOrderOverviewTabsProps {
  isVisible?: boolean;
  toggleVisibility?: () => void;
}
enum RightSideOptionEnum {
  Variations = 'Variations',
  Prices = 'Prices',
  Warehousing = 'Warehousing',
}
const toggleOptions = enumToFilterOptions(RightSideOptionEnum);
const PageOrderOverviewTabs = ({ toggleVisibility, isVisible }: PageOrderOverviewTabsProps) => {
  const orderId = useAppParams()?.orderId;

  const { currentOrder } = useOrdersSelector();
  const service = useAppServiceProvider()[ServiceName.orders];
  const [current, setCurrent] = useState<RightSideOptionEnum>(RightSideOptionEnum.Variations);

  const renderTab = useMemo(() => {
    if (current === RightSideOptionEnum.Variations) {
      return <VariationsTab />;
    }

    if (current === RightSideOptionEnum.Prices) {
      return <PricesTab />;
    }
    if (current === RightSideOptionEnum.Warehousing) {
      return <WarehousingTab />;
    }
  }, [current]);

  const filterHandler: FilterSelectHandler<RightSideOptionEnum> = (_, value, index) => {
    setCurrent(value);
  };

  return (
    <RightSide overflow={'hidden'} fillHeight isVisible={isVisible}>
      <Top fillWidth gap={4} isVisible={isVisible} fxDirection={'row'} justifyContent={'space-between'}>
        <ButtonIcon
          variant={'textExtraSmall'}
          icon={'SmallArrowLeft'}
          style={{ padding: 6 }}
          onClick={toggleVisibility}
        >
          {'Back'}
        </ButtonIcon>

        <FlexBox padding={'0 8px'}>
          <Text $weight={600} $size={14}>
            {currentOrder?.code}
          </Text>

          <Text $size={10}>{orderId}</Text>
        </FlexBox>
      </Top>

      <ModalFilter filterOptions={toggleOptions} defaultValue={current} onOptSelect={filterHandler} preventFilter />

      {renderTab}
    </RightSide>
  );
};
const RightSide = styled(FlexBox)<{ isVisible?: boolean }>`
  overflow: auto;

  max-width: 100%;

  transition: ${p => p.theme.globals.timingFunctionMain};
  background-color: ${p => p.theme.backgroundColorLight};

  @media screen and (min-width: 768px) {
    min-width: 320px;
  }

  @media screen and (max-width: 768px) {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 20;

    transform: translateX(${p => (p.isVisible ? 0 : 100)}%);

    box-shadow: 0 12px 26px rgba(0, 0, 0, 0.25);
  }
`;

const Top = styled(FlexBox)<{ isVisible?: boolean }>`
  @media screen and (min-width: 768px) {
    display: none;
  }
  border-bottom: 1px solid ${p => p.theme.modalBorderColor};
`;
export default PageOrderOverviewTabs;
