import ModalForm, { ModalFormProps } from '../ModalForm';
import FlexBox from '../atoms/FlexBox';
import { IProduct } from '../../redux/products/products.types';
import ProductCardSimpleReview from '../Products/ProductCardSimpleReview';
import TableList from '../TableList/TableList';
import styled from 'styled-components';
import { pricesColumnsForProductReview } from '../../data/priceManagement.data';
import { useAppServiceProvider } from '../../hooks/useAppServices';
import { useEffect, useState } from 'react';
import { IPriceListItem } from '../../redux/priceManagement/priceManagement.types';
import { ExtractId } from '../../utils/dataTransform';

export interface ProductReviewModalProps extends Omit<ModalFormProps, 'onSelect' | 'onSubmit'> {
  product?: IProduct;
}

const ProductOverviewModal: React.FC<ProductReviewModalProps> = ({ product, ...props }) => {
  const { priceManagement } = useAppServiceProvider();
  const [priceList, setPriceList] = useState<IPriceListItem[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (product?._id) {
      priceManagement
        .getAllPricesByProductId({
          data: { productId: ExtractId(product) },
          onSuccess: setPriceList,
          onLoading: setLoading,
        })
        .then();
    }
  }, [priceManagement, product]);

  return (
    <StModal {...props}>
      <FlexBox gap={0}>
        <FlexBox padding={'16px 8px'} fillWidth overflow={'hidden'}>
          {product && <ProductCardSimpleReview product={product} disabled />}
        </FlexBox>

        <PricesBox>
          <TableList
            tableTitles={pricesColumnsForProductReview}
            tableData={priceList}
            isSearch={false}
            isFilter={false}
            isLoading={loading}
          />
        </PricesBox>
      </FlexBox>
    </StModal>
  );
};
const StModal = styled(ModalForm)`
  max-width: 700px;
`;

const PricesBox = styled(FlexBox)`
  max-width: 100%;
  min-height: 150px;
`;
export default ProductOverviewModal;
