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
  import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'

  import { Planet } from './planet.entity'
  import { NewPlanetDto } from './new-planet.dto'
  
  @ApiTags('planets')
  @Controller('planets')
  export class PlanetController {
    constructor(
      @InjectRepository(Planet)
      private readonly planetRespository: MongoRepository<Planet>,
    ) {}
  
    @Get()
    @ApiOkResponse({ type: [Planet] })
    public async getAllPlanets(): Promise<Planet[]> {
      return this.planetRespository.find();
    }

    @Get(':id')
    @ApiOkResponse({ type: Planet })
    public async getPlanetById(@Param('id') id: string): Promise<Planet> {
        return this.planetRespository.findOneBy({ _id: ObjectId.createFromHexString(id) });
    }
  
    @Post()
    @ApiOkResponse({ type: Planet })
    @ApiBadRequestResponse()
    public async createPlanet(@Body() planet: NewPlanetDto): Promise<Planet> {
      if (!planet) {
        throw new BadRequestException('request invalid');
      }
      return this.planetRespository.save(new Planet(planet));
    }
  }