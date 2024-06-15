import { usePageCurrentOffer } from './PageOfferProvider';
import { useMemo, useState } from 'react';
import { enumToFilterOptions } from '../../../utils';
import { Text } from '../../atoms/Text';
import TabSelector, { FilterSelectHandler } from '../../atoms/TabSelector';
import styled from 'styled-components';
import FlexBox from '../../atoms/FlexBox';
import VariationsTab from './tabs/VariationsTab';
import PricesTab from './tabs/PricesTab';
import WarehousingTab from './tabs/WarehousingTab';
import { SalesTab } from './tabs/SalesTab';
import { useLoaders } from '../../../Providers/Loaders/useLoaders.hook';
import { OfferOverlayLoaderKey } from '../../Overlays/FormOfferDefaultsOverlay';
import { LoadersProvider } from '../../../Providers/Loaders/LoaderProvider';
import { DrawerHeader } from '../../Overlays';

enum RightSideOptionEnum {
  Prices = 'Prices',
  Variations = 'Variations',
  Warehousing = 'Warehousing',
  Sales = 'Sales',
}
const TabsList = enumToFilterOptions(RightSideOptionEnum);

export interface OfferOverviewPageRightSideProps {
  isVisible?: boolean;
  toggleVisibility?: () => void;
}

const OfferOverviewPageRightSide: React.FC<OfferOverviewPageRightSideProps> = ({ isVisible, toggleVisibility }) => {
  const page = usePageCurrentOffer();
  const loaders = useLoaders<OfferOverlayLoaderKey>();

  const [currentTab, setCurrentTab] = useState<RightSideOptionEnum>(TabsList[0].value);

  const renderTab = useMemo(() => {
    if (!page.currentOffer) {
      return null;
    }
    const tabs: Record<RightSideOptionEnum, React.ReactNode> = {
      [RightSideOptionEnum.Variations]: <VariationsTab withActions />,
      [RightSideOptionEnum.Warehousing]: <WarehousingTab withActions />,
      [RightSideOptionEnum.Prices]: <PricesTab withActions />,
      [RightSideOptionEnum.Sales]: <SalesTab withActions />,
    };
    return currentTab ? tabs?.[currentTab] ?? null : null;
  }, [currentTab, page.currentOffer]);

  const filterHandler: FilterSelectHandler<RightSideOptionEnum> = (_, value, index) => {
    value && setCurrentTab(value);
  };

  return (
    <LoadersProvider value={loaders}>
      <RightSide overflow={'hidden'} fillHeight isVisible={isVisible}>
        {isVisible && (
          <DrawerHeader
            onBackPress={toggleVisibility}
            renderTitle={
              <FlexBox padding={'0 8px'} fxDirection={'row'} alignItems={'center'} justifyContent={'center'} gap={8}>
                <Text $weight={600} $size={14}>
                  {page?.currentOffer?.label}
                </Text>

                <Text $size={14} $weight={400}>
                  {page?.currentOffer?.sku}
                </Text>
              </FlexBox>
            }
          />
        )}

        <TabSelector options={TabsList} onOptSelect={filterHandler} preventDefault />

        <TabBox overflow={'hidden'} fillWidth flex={1}>
          {renderTab}
        </TabBox>
      </RightSide>
    </LoadersProvider>
  );
};
const RightSide = styled(FlexBox)<{ isVisible?: boolean }>`
  overflow: auto;

  padding: 0 8px;

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

    box-shadow: ${p => (p.isVisible ? '0 12px 26px rgba(0, 0, 0, 0.25)' : '')};
  }
`;

const TabBox = styled(FlexBox)`
  //border-top: 1px solid ${p => p.theme.modalBorderColor};
  //border-bottom: 1px solid ${p => p.theme.modalBorderColor};
`;

export default OfferOverviewPageRightSide;
