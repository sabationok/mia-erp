import { OnlyUUID } from '../../../../redux/global.types';

export interface OfferOverviewAddsTabProps {
  onSelect?: (item: OnlyUUID) => void;
  selected?: OnlyUUID;
  withActions?: boolean;
}
