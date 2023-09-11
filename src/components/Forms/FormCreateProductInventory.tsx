import ModalForm, { ModalFormProps } from '../ModalForm';
import FlexBox from '../atoms/FlexBox';
import FormCreateInner from './components/FormCreateInner';
import { useModalProvider } from '../ModalProvider/ModalProvider';
import { Modals } from '../ModalProvider/Modals';
import { useState } from 'react';
import { IProduct } from '../../redux/products/products.types';
import ProductCardSimpleOverview from '../Overviews/ProductCardSimpleOverview';
import CustomSelect from '../atoms/Inputs/CustomSelect/CustomSelect';
import translate from '../../lang';
import TableList from '../TableList/TableList';
import { pricesColumnsForProductReview } from '../../data/priceManagement.data';

export interface FormCreateProductInventoryProps extends Omit<ModalFormProps, 'onSubmit'> {}
const FormCreateProductInventory: React.FC<FormCreateProductInventoryProps> = ({ ...props }) => {
  const modalS = useModalProvider();
  const [selectedProduct, setSelectedProduct] = useState<IProduct | undefined>();
  // const [selectedPrice, setSelectedPrice] = useState<IPriceListItem | undefined>();

  const onProductSelect = () => {
    modalS.create<Modals.SelectProductModal>(m => ({
      Modal: Modals.SelectProductModal,
      props: {
        onSelect: product => {
          setSelectedProduct(product);

          m.onClose();
        },
        selected: selectedProduct,
      },
    }));
  };

  return (
    <ModalForm
      fillHeight
      fillWidth
      title={'Add new product inventory'}
      {...props}
      extraFooter={
        <FormCreateInner buttonText={selectedProduct ? 'Change product' : 'Select product'} onClick={onProductSelect} />
      }
    >
      <FlexBox fillWidth>{selectedProduct && <ProductCardSimpleOverview product={selectedProduct} disabled />}</FlexBox>

      <FlexBox padding={'8px'}>
        <FlexBox style={{ minHeight: 250 }}>
          {selectedProduct && (
            <TableList
              tableTitles={pricesColumnsForProductReview}
              tableData={selectedProduct.prices}
              isSearch={false}
            />
          )}
        </FlexBox>

        {selectedProduct && (
          <CustomSelect
            label={translate('variation')}
            placeholder={'Оберіть варіацію'}
            onSelect={() => {}}
            onCreatePress={() => {}}
          />
        )}
      </FlexBox>
    </ModalForm>
  );
};

export default FormCreateProductInventory;
