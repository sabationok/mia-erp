import { IBase } from '../global.types';

export enum ImageSetSrcType {
  img_preview = 'img_preview',
  img_1x = 'img_1x',
  img_2x = 'img_2x',
  webp = 'webp',
}

export interface OfferImageSlotEntity extends Partial<IBase> {
  img_preview?: string;
  img_1x?: string;
  img_2x?: string;
  webp?: string;
  order: number;

  mimeType?: string;
}
