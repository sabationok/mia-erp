import { OfferOverviewDefaultsCell } from './OfferOverviewDefaultsCell';
import { OfferOverviewImagesCell } from './OfferOverviewImagesCell';
import { OfferOverviewCategoriesCell } from './OfferOverviewCategoriesCell';
import { OfferOverviewStatusChangerCell } from './OfferOverviewStatusChangerCell';
import { OfferOverviewVariationsTemplateCell } from './OfferOverviewVariationsTemplateCell';
import { OverviewTextCell } from './OverviewTextCell';
import { OfferOverviewStaticProperties } from './OfferOverviewStaticPropertiesCell';
import { OrderOverviewGroupInfo } from './OrderOverviewGroupInfo';
import { OrderOverviewInvoicing } from './OrderOverviewInvoicing';
import { OrderOverviewDelivery } from './OrderOverviewDelivery';
import { OrderOverviewCustomerInfo } from './OrderOverviewCustomerInfo';

export const OverviewCells = {
  Text: OverviewTextCell,
  OfferStatusChanger: OfferOverviewStatusChangerCell,
  OfferDefaults: OfferOverviewDefaultsCell,
  OfferImages: OfferOverviewImagesCell,
  OfferCategories: OfferOverviewCategoriesCell,
  OfferVariationsTemplate: OfferOverviewVariationsTemplateCell,
  OfferStaticProperties: OfferOverviewStaticProperties,
  OrderGroupInfo: OrderOverviewGroupInfo,
  OrderCustomerInfo: OrderOverviewCustomerInfo,
  OrderInvoicing: OrderOverviewInvoicing,
  OrderDelivery: OrderOverviewDelivery,
};
