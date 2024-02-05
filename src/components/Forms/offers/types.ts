import { MaybeNull } from '../../../types/utils.types';
import { AppSubmitHandler } from '../../../hooks/useAppForm.hook';

export interface OfferFormSectionProps<DefaultValues = any> {
  _id?: string;
  disabled?: boolean;
  defaultValues?: MaybeNull<DefaultValues>;
  title?: string;
  onSubmit?: AppSubmitHandler<DefaultValues>;
}
