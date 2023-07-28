import ModalForm, { ModalFormProps } from '../ModalForm';
import FlexBox from '../atoms/FlexBox';
import { IProduct } from '../../redux/products/products.types';
import ProductCardSimpleReview from '../Products/ProductCardSimpleReview';

export interface ProductReviewModalProps extends Omit<ModalFormProps, 'onSelect' | 'onSubmit'> {
  product?: IProduct;
}

const ProductReviewModal: React.FC<ProductReviewModalProps> = ({ product, ...props }) => {
  return (
    <ModalForm {...props}>
      <FlexBox padding={'16px 8px'} fillWidth overflow={'hidden'}>
        {product && <ProductCardSimpleReview product={product} disabled />}
      </FlexBox>
    </ModalForm>
  );
};
export default ProductReviewModal;
