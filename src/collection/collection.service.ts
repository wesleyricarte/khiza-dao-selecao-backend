/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CollectionEntity } from './collection.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { tSyncResponse } from './collection.types';

@Injectable()
export class CollectionService {
  constructor(
    @InjectRepository(CollectionEntity)
    private readonly collectionRepository: Repository<CollectionEntity>,
  ) {}

  async create(createCollectionDto: CreateCollectionDto): Promise<CollectionEntity | any> {
    const existingId = await this.collectionRepository.findOne({
      where: { reservoirId: createCollectionDto.reservoirId },
    });
    if (existingId) throw new HttpException('Colection Id already registered', HttpStatus.CONFLICT)
    
    const collectionEntity: CollectionEntity = this.collectionRepository.create({
      reservoirId: createCollectionDto.reservoirId,
    });

    const savedCollection: CollectionEntity = await this.collectionRepository.save(collectionEntity);

    return savedCollection;
  }

  async findAll(): Promise<tSyncResponse> {
    const collectionsSearch = await this.collectionRepository.find({
      relations: { floorSale: true, floorSaleChange: true },
    });

    if (!collectionsSearch) throw new HttpException('No collections registered', HttpStatus.NOT_FOUND)

    const biggestFloorSaleChange30Day = collectionsSearch.reduce((max, item) => {
      const floorSaleChange30Day = item.floorSaleChange['30day'];
      return floorSaleChange30Day > max ? floorSaleChange30Day : max;
    }, Number.MIN_VALUE);
    
    const smallestFloorSaleChange30Day = collectionsSearch.reduce((min, item) => {
      const floorSaleChange30Day = item.floorSaleChange['30day'];
      return floorSaleChange30Day < min ? floorSaleChange30Day : min;
    }, Number.MAX_VALUE);

    const totalFloorSaleChange30Day = collectionsSearch.reduce((acc, item) => acc + item.floorSaleChange['30day'], 0);
    const averageFloorSaleChange30Day = totalFloorSaleChange30Day / collectionsSearch.length;

    const collectionsArray = [
      {
        avarageFloorSaleChange30Day: averageFloorSaleChange30Day,
        biggestFloorSaleChange30Day: biggestFloorSaleChange30Day,
        smallestFloorSaleChange30Day: smallestFloorSaleChange30Day,
      },
      ...collectionsSearch
    ]
    
    return collectionsArray
  }

  async findOne(id: string): Promise<CollectionEntity> {
    const collecFound = await this.collectionRepository.findOne({
      where: { reservoirId: id },
      relations: { floorSale: true, floorSaleChange: true },
    });

    if (!collecFound) throw new HttpException('Collection not found', HttpStatus.NOT_FOUND)

    return collecFound
  }
}
