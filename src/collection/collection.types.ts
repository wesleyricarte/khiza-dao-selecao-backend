/* eslint-disable prettier/prettier */
import { CollectionEntity } from './collection.entity';

export interface iFloorSaleChangeResponse {
  avarageFloorSaleChange30Day: number;
  biggestFloorSaleChange30Day: number;
  smallestFloorSaleChange30Day: number;
}
export type tSyncResponse = (CollectionEntity | iFloorSaleChangeResponse)[];
