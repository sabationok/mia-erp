import { DiscountsApi } from './Discounts.api';
import { PriceListsApi } from './PricesLists.api';
import { PricesApi } from './Prices.api';

export class PriceManagementApi {
  public static readonly prices = PricesApi;
  public static readonly lists = PriceListsApi;
  public static readonly discounts = DiscountsApi;
}
