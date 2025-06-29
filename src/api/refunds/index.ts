import { RefundRequestsApi } from './RefundRequests.api';
import { ReturnsApi } from './Returns.api';
import { RefundsApi } from './Refunds.api';
import { ExchangesApi } from './Exchanges.api';

export class RefundsManagementApi {
  static requests = RefundRequestsApi;
  static returns = ReturnsApi;
  static refunds = RefundsApi;
  static exchanges = ExchangesApi;
}
