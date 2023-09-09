import { usePageCurrentProduct } from '../PageCurrentProductProvider';
import { useMemo, useState } from 'react';
import TableList, { ITableListProps } from '../../TableList/TableList';
import { pricesColumnsForProductReview } from '../../../data/priceManagement.data';
import { enumToFilterOptions } from '../../../utils/fabrics';
import { createTableTitlesFromTemplate } from '../../../utils';
import { useModalProvider } from '../../ModalProvider/ModalProvider';
import { Text } from '../../atoms/Text';
import ModalFilter from '../../ModalForm/ModalFilter';
import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon';
import styled from 'styled-components';
import FlexBox from '../../atoms/FlexBox';
import FormCreateVariation from '../../Forms/FormVariation';
import { IPriceListItem } from 'redux/priceManagement/priceManagement.types';
import { IVariation } from 'redux/products/variations.types';

enum RightSideOptionEnum {
  Variations = 'Variations',
  Prices = 'Prices',
}
const toggleOptions = enumToFilterOptions(RightSideOptionEnum);

export interface PageProductOverviewRightSideProps {
  isVisible?: boolean;
  toggleVisibility?: () => void;
}
interface ITableDataByType {
  [RightSideOptionEnum.Variations]: IVariation;
  [RightSideOptionEnum.Prices]: IPriceListItem;
}
const PageProductOverviewRightSide: React.FC<PageProductOverviewRightSideProps> = ({ isVisible, toggleVisibility }) => {
  const page = usePageCurrentProduct();
  const modalS = useModalProvider();

  const [current, setCurrent] = useState<RightSideOptionEnum>(RightSideOptionEnum.Prices);
  const tableTitles = useMemo(() => {
    return createTableTitlesFromTemplate(page.currentProduct?.template);
  }, [page.currentProduct?.template]);

  const currentTableSettings = useMemo((): ITableListProps | undefined => {
    if (current === RightSideOptionEnum.Variations) {
      return {
        tableTitles: tableTitles,
        tableData: page?.currentProduct?.variations,
        actionsCreator: ctx => {
          return [
            {
              icon: 'delete',
              type: 'onlyIcon',
              onClick: () => {},
            },
            {
              icon: 'edit',
              type: 'onlyIcon',
              onClick: () => {
                const currentId = ctx.selectedRow?._id;
                page.createOverlayComponent({ RenderComponent: FormCreateVariation, props: { update: 'currentId' } });
                toggleVisibility && toggleVisibility();
                if (currentId) {
                }
              },
            },
            {
              icon: 'plus',
              type: 'onlyIconFilled',
              onClick: () => {
                toggleVisibility && toggleVisibility();
                page.createOverlayComponent({ RenderComponent: FormCreateVariation, props: { create: true } });
              },
            },
          ];
        },
      } as ITableListProps<IVariation>;
    }

    if (current === RightSideOptionEnum.Prices) {
      return {
        tableData: page?.currentProduct?.prices,
        tableTitles: pricesColumnsForProductReview,
        actionsCreator: ctx => [{ icon: 'plus' }],
      } as ITableListProps<IPriceListItem>;
    }
  }, [current, page, tableTitles]);

  return (
    <RightSide overflow={'auto'} fillHeight isVisible={isVisible}>
      <Top fillWidth padding={'4px 8px'} gap={4}>
        <Text $weight={600} $size={16}>
          {page?.currentProduct?.label}
        </Text>
        <Text $size={12}>{page?.currentProduct?.sku}</Text>
      </Top>

      <ModalFilter
        filterOptions={toggleOptions}
        onOptSelect={(option, value, index) => {
          setCurrent(value);
        }}
      />

      <TableList isSearch={false} isFilter={false} {...currentTableSettings} />

      <Bottom fillWidth flex={1} fxDirection={'row'} justifyContent={'flex-end'}>
        <ButtonIcon variant={'textExtraSmall'} endIcon={'SmallArrowRight'} onClick={toggleVisibility}>
          {'Згорнути'}
        </ButtonIcon>
      </Bottom>
    </RightSide>
  );
};
const RightSide = styled(FlexBox)<{ isVisible?: boolean }>`
  overflow: auto;

  min-width: 320px;

  transition: ${p => p.theme.globals.timingFunctionMain};
  background-color: ${p => p.theme.backgroundColorLight};

  //border: 1px solid blue;

  @media screen and (max-width: 768px) {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 20;

    transform: translateX(${p => (p.isVisible ? 0 : 100)}%);

    box-shadow: 0 12px 26px rgba(0, 0, 0, 0.25);
  }
`;

const Top = styled(FlexBox)`
  @media screen and (min-width: 768px) {
    display: none;
  }
  border-bottom: 1px solid ${p => p.theme.modalBorderColor};
`;
const Bottom = styled(FlexBox)`
  border-top: 1px solid ${p => p.theme.modalBorderColor};

  @media screen and (min-width: 768px) {
    display: none;
  }
`;
export default PageProductOverviewRightSide;
