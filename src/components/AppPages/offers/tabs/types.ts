import { OnlyUUID } from '../../../../redux/app-redux.types';

export interface OfferOverviewAddsTabProps {
  onSelect?: (item: OnlyUUID) => void;
  selected?: OnlyUUID;
  withActions?: boolean;
}
