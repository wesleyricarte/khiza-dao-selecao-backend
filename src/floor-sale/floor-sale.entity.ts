/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FloorSaleEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: number;

  @Column({ type: 'float', nullable: true })
  '1day': number;

  @Column({ type: 'float', nullable: true })
  '7day': number;

  @Column({ type: 'float', nullable: true })
  '30day': number;
}
