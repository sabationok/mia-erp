import { usePageCurrentProduct } from '../PageCurrentProductProvider';
import { useMemo, useState } from 'react';
import TableList from '../../TableList/TableList';
import { pricesColumnsForProductReview } from '../../../data/priceManagement.data';
import { Modals } from '../../ModalProvider/Modals';
import { enumToFilterOptions } from '../../../utils/fabrics';
import { createTableTitlesFromTemplate } from '../../../utils';
import { useModalProvider } from '../../ModalProvider/ModalProvider';
import { Text } from '../../atoms/Text';
import ModalFilter from '../../ModalForm/ModalFilter';
import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon';
import styled from 'styled-components';
import FlexBox from '../../atoms/FlexBox';

enum RightSideOptionEnum {
  Variations = 'Variations',
  Prices = 'Prices',
}
const toggleOptions = enumToFilterOptions(RightSideOptionEnum);

export interface PageProductOverviewRightSideProps {
  isVisible?: boolean;
  toggleVisibility?: () => void;
}
const PageProductOverviewRightSide: React.FC<PageProductOverviewRightSideProps> = ({ isVisible, toggleVisibility }) => {
  const page = usePageCurrentProduct();
  const modalS = useModalProvider();

  const [current, setCurrent] = useState<RightSideOptionEnum>(RightSideOptionEnum.Prices);
  const tableTitles = useMemo(() => {
    return createTableTitlesFromTemplate(page.currentProduct?.template);
  }, [page.currentProduct?.template]);

  const renderRightSideContent = useMemo(() => {
    if (current === RightSideOptionEnum.Prices) {
      return (
        <TableList
          tableTitles={pricesColumnsForProductReview}
          tableData={page?.currentProduct?.prices}
          actionsCreator={ctx => {
            return [
              {
                icon: 'plus',
                type: 'onlyIconFilled',

                onClick: () => {
                  modalS.handleOpenModal({
                    Modal: Modals.FormCreatePrice,
                    props: { onSubmit: () => {}, product: page?.currentProduct },
                  });
                },
              },
            ];
          }}
          isSearch={false}
          isFilter={false}
        />
      );
    }
    if (current === RightSideOptionEnum.Variations) {
      return (
        <TableList
          tableData={page?.currentProduct?.variations}
          isSearch={false}
          tableTitles={tableTitles}
          actionsCreator={ctx => {
            return [
              {
                icon: 'plus',
                type: 'onlyIconFilled',
                onClick: () => {
                  modalS.handleOpenModal({
                    Modal: Modals.FormCreateVariation,
                    props: { title: 'Створити варіацію' },
                  });
                },
              },
            ];
          }}
        />
      );
    }
    return null;
  }, [current, modalS, page?.currentProduct, tableTitles]);

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

      {renderRightSideContent}

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
