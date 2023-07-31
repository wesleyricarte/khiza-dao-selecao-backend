import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectionEntity } from './collection.entity';
import { CollectionController } from './collection.controller';
import { CollectionService } from './collection.service';

@Module({
  imports: [TypeOrmModule.forFeature([CollectionEntity])],
  controllers: [CollectionController],
  providers: [CollectionService],
})
export class CollectionModule {}
