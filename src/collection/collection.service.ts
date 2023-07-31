/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CollectionEntity } from './collection.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCollectionDto } from './dto/create-collection.dto';

@Injectable()
export class CollectionService {
  constructor(
    @InjectRepository(CollectionEntity)
    private readonly collectionRepository: Repository<CollectionEntity>,
  ) {}

  async create(createCollectionDto: CreateCollectionDto): Promise<CollectionEntity | any> {
    const existingId = await this.findOne(createCollectionDto.reservoirId)
    if (existingId) throw new HttpException('Colection Id already registered', HttpStatus.CONFLICT)
    
    const collectionEntity: CollectionEntity = this.collectionRepository.create({
      reservoirId: createCollectionDto.reservoirId,
    });

    const savedCollection: CollectionEntity = await this.collectionRepository.save(collectionEntity);

    return savedCollection;
  }

  async findAll(): Promise<CollectionEntity[]> {
    const collectionsArray = await this.collectionRepository.find({
      relations: { floorSale: true, floorSaleChange: true },
    });

    if (!collectionsArray) throw new HttpException('No collections registered', HttpStatus.NOT_FOUND)

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
