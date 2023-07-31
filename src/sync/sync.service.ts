/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CollectionEntity } from 'src/collection/collection.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReservoirService } from 'src/reservoir.service';
import { CollectionService } from 'src/collection/collection.service';

@Injectable()
export class SyncService {
  constructor(
    @InjectRepository(CollectionEntity)
    private readonly collectionRepository: Repository<CollectionEntity>,
    private readonly reservoirService: ReservoirService,
    private readonly collectionService: CollectionService,
  ) {}

  async synchronize(): Promise<any> {
    const reservoirCollection = await this.reservoirService.getCollections();
    if (!reservoirCollection.collections) throw new HttpException('Failed to get collection from Reservoir API', HttpStatus.NOT_FOUND);

    for (const eachNFT of reservoirCollection.collections) {
      if (eachNFT) {

        const {
          id: reservoirId,
          slug,
          name,
          description,
          floorSale,
          floorSaleChange,
        } = eachNFT;
        
        const existingCollection = await this.collectionRepository.findOne({
          where: { reservoirId: reservoirId },
        });
        
        if (existingCollection) {
          existingCollection.slug = slug;
          existingCollection.name = name;
          existingCollection.description = description;
          existingCollection.floorSale = floorSale;
          existingCollection.floorSaleChange = floorSaleChange;
          
          await this.collectionRepository.save(existingCollection);
        }
      }
    }
    
    return this.collectionService.findAll();
  }
}
