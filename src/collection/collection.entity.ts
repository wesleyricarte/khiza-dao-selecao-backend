/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { FloorSaleEntity } from 'src/floor-sale/floor-sale.entity';
import { FloorSaleChangeEntity } from 'src/floor-sale-change/floor-sale-change.entity';

@Entity({ name: 'collection' })
export class CollectionEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ unique: true, type: 'varchar', nullable: false })
  reservoirId: string

  @Column({ type: 'varchar', nullable: true })
  slug: string;

  @Column({ type: 'varchar', nullable: true })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @CreateDateColumn({
    type: 'timestamp',
    precision: 3,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @OneToOne(() => FloorSaleEntity, { cascade: true, nullable: true })
  @JoinColumn()
  floorSale: FloorSaleEntity;

  @OneToOne(() => FloorSaleChangeEntity, { cascade: true, nullable: true })
  @JoinColumn()
  floorSaleChange: FloorSaleChangeEntity;
}
