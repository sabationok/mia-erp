import { usePageCurrentProduct } from './PageCurrentProductProvider';
import { useMemo, useState } from 'react';
import { enumToFilterOptions } from '../../../utils/fabrics';
import { Text } from '../../atoms/Text';
import ModalFilter, { FilterSelectHandler } from '../../ModalForm/ModalFilter';
import styled from 'styled-components';
import FlexBox from '../../atoms/FlexBox';
import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon';
import VariationsTab from './tabs/VariationsTab';
import PricesTab from './tabs/PricesTab';
import WarehousingTab from './tabs/WarehousingTab';

// const openLoader = (current: RightSideOptionEnum) =>
//   ToastService.createLoader('Loading data...').open({
//     afterClose: [`${current} data loaded`, { type: 'success' }],
//   });
enum RightSideOptionEnum {
  Variations = 'Variations',
  Prices = 'Prices',
  Warehousing = 'Warehousing',
}
const toggleOptions = enumToFilterOptions(RightSideOptionEnum);

export interface PageProductOverviewRightSideProps {
  isVisible?: boolean;
  toggleVisibility?: () => void;
}
// interface ITableDataByType {
//   [RightSideOptionEnum.Variations]: IVariation;
//   [RightSideOptionEnum.Prices]: IPriceListItem;
// }
const PageProductOverviewRightSide: React.FC<PageProductOverviewRightSideProps> = ({ isVisible, toggleVisibility }) => {
  const page = usePageCurrentProduct();
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
            {page?.currentProduct?.label}
          </Text>

          <Text $size={10}>{page?.currentProduct?.sku}</Text>
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
export default PageProductOverviewRightSide;
