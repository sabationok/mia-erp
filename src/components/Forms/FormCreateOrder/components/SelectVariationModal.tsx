import ModalForm, { ModalFormProps } from '../../../ModalForm';
import { AppSubmitHandler } from '../../../../hooks/useAppForm.hook';
import { VariationEntity, VariationFormData } from '../../../../types/offers/variations.types';
import { t } from '../../../../i18e';
import { OfferEntity } from '../../../../types/offers/offers.types';

export interface SelectVariationModalProps
  extends Omit<ModalFormProps<any, any, VariationFormData>, 'onSubmit' | 'onSelect'> {
  onSubmit?: AppSubmitHandler<VariationEntity>;
  product?: OfferEntity;
}
const SelectVariationModal = ({ onSubmit, product, defaultState, ...p }: SelectVariationModalProps) => {
  // const currentProduct = useProductsSelector().currentProduct;
  // const service = useAppServiceProvider()[ServiceName.products];
  // const templates = usePropertiesSelector();
  // // const [loading, setLoading] = useState(false);
  // const { setValue, formValues } = useAppForm<IVariationFormData>({
  //   defaultValues: createVariationFormData(
  //     defaultState ? { ...defaultState, product: currentProduct } : { product: currentProduct }
  //   ),
  // });
  // const template = useMemo(() => {
  //   return templates.find(t => t._id === currentProduct?.template?._id);
  // }, [currentProduct, templates]);
  // const selectedIds = useMemo(() => {
  //   return formValues?.propertiesMap ? Object.values(formValues?.propertiesMap) : [];
  //   // eslint-disable-next-line
  // }, [formValues?.propertiesMap, formValues]);

  // const canSubmit = useMemo(() => {
  //   return selectedIds.length > 0;
  // }, [selectedIds.length]);
  // const handleSelect = useCallback(
  //   (parentId: string, id: string) => {
  //     setValue(`propertiesMap.${parentId}`, id);
  //   },
  //   [setValue]
  // );
  // const preparedTemplate = useMemo(
  //   () => template?.childrenList?.filter(el => el?.isSelectable),
  //   [template?.childrenList]
  // );

  return <ModalForm fillHeight title={t('Select variation')} {...p}></ModalForm>;
};
export default SelectVariationModal;
