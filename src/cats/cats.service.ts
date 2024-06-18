import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Breed } from 'src/breeds/entities/breed.entity';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat) private catRepository: Repository<Cat>,
    @InjectRepository(Breed) private breedRepository: Repository<Breed>,
  ) {}

  async create(createCatDto: CreateCatDto) {
    const breed = await this.breedRepository.findOneBy({
      id: createCatDto.breedId,
    });

    if (!breed) {
      throw new BadRequestException('Breed not found');
    }
    
    return await this.catRepository.save({ ...createCatDto, breed });

  }

  async findAll() {
    return await this.catRepository.find();
  }

  async findOne(id: number) {
    //return await this.catRepository.findOne({ where: { id: id } });
    return await this.catRepository.findOneBy({ id });
  }

  async update(id: number, updateCatDto: UpdateCatDto) {

    const breed = await this.breedRepository.findOneBy({
      id: updateCatDto.breedId,
    });

    const cat = await this.catRepository.findOneBy({
      id:id
    })
    if (!breed) {
      throw new BadRequestException('Breed not found');
    }

    if (!cat) {
      throw new BadRequestException('Cat not found');
    }
    console.log(cat)
    const updateCat = Object.assign(cat, updateCatDto); 
    return this.catRepository.update(id,{ ...updateCat, breed })
   
  }

  async remove(id: number) {
    return await this.catRepository.softDelete({ id }); //se le pasa el id
    //return await this.catRepository.softRemove({id}); //se le pasa la instancia
  }
}
