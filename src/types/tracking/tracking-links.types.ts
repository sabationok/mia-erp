import { HasAuthor, HasEditor, HasOwnerAsCompany, IBase } from '../utils.types';
import { OfferEntity } from '../offers/offers.types';

export interface TrackingLinkBase {
  destinationUrl?: string;
  imgUrl?: string;
  videoUrl?: string;

  deviceId?: string;

  slashTag?: string;

  isActive?: boolean;

  label?: string;

  description?: string;
  domain?: string;

  qrCode?: string;
}
export interface TrackingLinkEntity extends IBase, HasOwnerAsCompany, HasAuthor, HasEditor, TrackingLinkBase {
  offer?: OfferEntity;

  url?: string;
  code?: string;

  referer?: string;

  cookiesId?: string;
  ip?: string;
  userAgent?: string;

  stats?: {
    clicks?: number;
    errors?: number;
    sales?: number;
    refunds?: number;
  };
}

export type CreateTrackingLinkDto = TrackingLinkBase & {
  offerId?: string;
  customerId?: string;
};
