import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectionEntity } from 'src/collection/collection.entity';
import { SyncController } from './sync.controller';
import { SyncService } from './sync.service';
import { ReservoirService } from 'src/reservoir.service';
import { CollectionModule } from 'src/collection/collection.module';
import { CollectionService } from 'src/collection/collection.service';

@Module({
  imports: [TypeOrmModule.forFeature([CollectionEntity]), CollectionModule],
  controllers: [SyncController],
  providers: [SyncService, ReservoirService, CollectionService],
})
export class SyncModule {}
