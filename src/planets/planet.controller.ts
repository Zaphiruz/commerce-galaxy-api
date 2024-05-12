import {
    BadRequestException,
    Body,
    Controller,
    Get,
    InternalServerErrorException,
    Param,
    Post,
    Put,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { MongoRepository } from 'typeorm'
import { ObjectId } from 'mongodb'
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'

import { Planet } from './planet.entity'
import { NewPlanetDto } from './new-planet.dto'
import { UpdatePlanetDto } from './update-planet.dto'

@ApiTags('planets')
@Controller('planets')
export class PlanetController {
    constructor(
        @InjectRepository(Planet)
        private readonly planetRespository: MongoRepository<Planet>,
    ) { }

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
    public async createPlanet(@Body() newPlanetDto: NewPlanetDto): Promise<Planet> {
        if (!newPlanetDto) {
            throw new BadRequestException('request invalid');
        }
        return this.planetRespository.save(new Planet(newPlanetDto));
    }

    @Put(':id')
    @ApiOkResponse({ type: Planet })
    @ApiBadRequestResponse()
    @ApiInternalServerErrorResponse()
    public async updatePlanet(@Param('id') id: string, @Body() updatePlanetDto: UpdatePlanetDto): Promise<Planet> {
        if (!updatePlanetDto) {
            throw new BadRequestException('request invalid');
        }
        let doc = await this.planetRespository.findOneAndUpdate({ _id: ObjectId.createFromHexString(id) }, { "$set": updatePlanetDto }, { returnDocument: 'after' });
        if (doc.value) {
            return new Planet(doc.value);
        } else {
            throw new InternalServerErrorException('no planet updated')
        }
    }
}