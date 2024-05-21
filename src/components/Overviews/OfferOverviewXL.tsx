import { OfferEntity } from '../../types/offers/offers.types';
import FlexBox from '../atoms/FlexBox';
import React, { useMemo, useState } from 'react';
import ButtonIcon from '../atoms/ButtonIcon/ButtonIcon';
import styled from 'styled-components';
import { t } from '../../lang';
import { usePageCurrentOffer } from '../AppPages/offers/PageOfferProvider';
import { OverlayHeader } from '../Overlays';
import TabSelector from '../atoms/TabSelector';

import { useOverlayService } from '../../Providers/Overlay/OverlayStackProvider';
import { useAppRouter } from '../../hooks';
import { offerOverviewCellsMap, ProductOverviewTabsEnum, ProductOverviewTabsList } from './offerOverviewCellsMap';
import { OverviewCells } from './components';

export interface ProductOverviewXLProps {
  product?: OfferEntity;
  onEdit?: () => void;
  onDelete?: () => void;
  onArchive?: () => void;
  onHide?: () => void;
  onRefresh?: () => void;
  onCreateVariation?: (data: Record<string, string>, onSuccess?: () => void) => void;
  onOpenRightSide?: () => void;
  className?: string;
}

const OfferOverviewXL: React.FC<ProductOverviewXLProps> = ({ className, ...p }) => {
  const router = useAppRouter();
  const page = usePageCurrentOffer();
  const offer = page.currentOffer;
  const overlaySrv = useOverlayService();

  const [currentTab, setCurrentTab] = useState<ProductOverviewTabsEnum>(ProductOverviewTabsEnum.General);

  const renderCells = useMemo(
    () =>
      offerOverviewCellsMap[currentTab]?.map(({ CellComponent, ...cell }) => {
        if (CellComponent) {
          return <CellComponent key={cell.title} overlayHandler={overlaySrv.open} cell={cell} data={offer} />;
        }
        return <OverviewCells.Text key={cell.title} overlayHandler={overlaySrv.open} cell={cell} data={offer} />;
      }),
    [currentTab, overlaySrv.open, offer]
  );

  return (
    <Container fillWidth flex={1} className={className} padding={'0 8px'}>
      <OverlayHeader title={t('Offer overview')} onBackPress={router.goBack} />

      <TabSelector
        optionProps={{ fitContentH: true }}
        filterOptions={ProductOverviewTabsList}
        onOptSelect={option => {
          router.replace({ hash: option?.value });
          setCurrentTab(option?.value);
        }}
      />

      <Content fillWidth flex={1} overflow={'auto'}>
        {renderCells}
      </Content>

      <Footer fillWidth fxDirection={'row'} gap={6} padding={'6px 0'}>
        <ButtonIcon
          size={'36px'}
          variant={'onlyIcon'}
          iconSize={'85%'}
          icon={'edit'}
          disabled={!p?.onEdit}
          onClick={p?.onEdit}
        />

        <ButtonIcon
          variant={'onlyIcon'}
          size={'36px'}
          iconSize={'85%'}
          icon={p?.product?.visible ? 'visibilityOn' : 'visibilityOff'}
          disabled={!p?.onHide}
          onClick={p?.onHide}
        />

        <DeleteBtn
          variant={'onlyIcon'}
          size={'36px'}
          iconSize={'85%'}
          icon={'delete'}
          disabled={!p?.onDelete}
          onClick={p?.onDelete}
        />

        <FlexBox fxDirection={'row'} gap={6} margin={'0 0 0 auto'}>
          <ButtonIcon
            size={'36px'}
            variant={'onlyIcon'}
            iconSize={'85%'}
            icon={'refresh'}
            disabled={!p?.onRefresh}
            onClick={p?.onRefresh}
          />

          <OpenBtn
            size={'36px'}
            variant={'onlyIcon'}
            iconSize={'85%'}
            icon={'SmallArrowLeft'}
            disabled={!p?.onOpenRightSide}
            onClick={p?.onOpenRightSide}
          />
        </FlexBox>
      </Footer>
    </Container>
  );
};

const Container = styled(FlexBox)`
  position: relative;
  overflow: hidden;

  background-color: ${p => p.theme.sideBarBackgroundColor};
`;

const Content = styled(FlexBox)`
  border-top: 1px solid ${p => p.theme.sideBarBorderColor};
  border-bottom: 1px solid ${p => p.theme.sideBarBorderColor};
`;
const Footer = styled(FlexBox)``;
const DeleteBtn = styled(ButtonIcon)`
  fill: ${p => p.theme.globals.colors.error};
`;
const OpenBtn = styled(ButtonIcon)`
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

export default OfferOverviewXL;
