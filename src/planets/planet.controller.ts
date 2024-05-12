import {
    BadRequestException,
    Body,
    Controller,
    Get,
    Param,
    Post,
  } from '@nestjs/common'
  import { InjectRepository } from '@nestjs/typeorm'
  import { MongoRepository } from 'typeorm'
  import { ObjectId } from 'mongodb'

  import { Planet } from './planet.entity'
  
  @Controller('planets')
  export class PlanetController {
    constructor(
      @InjectRepository(Planet)
      private readonly planetRespository: MongoRepository<Planet>,
    ) {}
  
    @Get()
    public async getAllPlanets(): Promise<Planet[]> {
      return this.planetRespository.find();
    }

    @Get(':id')
    public async getPlanetById(@Param('id') id: string): Promise<Planet> {
        return this.planetRespository.findOneBy({ _id: ObjectId.createFromHexString(id) });
    }
  
    @Post()
    public async createPlanet(@Body() planet: Partial<Planet>): Promise<Planet> {
      if (!planet) {
        throw new BadRequestException('request invalid');
      }
      return this.planetRespository.save(new Planet(planet));
    }
  }