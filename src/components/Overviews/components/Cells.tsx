import { OfferOverviewDefaultsCell } from './OfferOverviewDefaultsCell';
import { OfferOverviewImagesCell } from './OfferOverviewImagesCell';
import { OfferOverviewCategoriesCell } from './OfferOverviewCategoriesCell';
import { OfferOverviewStatusChangerCell } from './OfferOverviewStatusChangerCell';
import { OfferOverviewVariationsTemplateCell } from './OfferOverviewVariationsTemplateCell';
import { OverviewTextCell } from './OverviewTextCell';
import { OfferOverviewStaticProperties } from './OfferOverviewStaticPropertiesCell';

export const OverviewCells = {
  OfferStatusChanger: OfferOverviewStatusChangerCell,
  OfferDefaults: OfferOverviewDefaultsCell,
  OfferImages: OfferOverviewImagesCell,
  OfferCategories: OfferOverviewCategoriesCell,
  OfferVariationsTemplate: OfferOverviewVariationsTemplateCell,
  OfferStaticProperties: OfferOverviewStaticProperties,
  Text: OverviewTextCell,
};
