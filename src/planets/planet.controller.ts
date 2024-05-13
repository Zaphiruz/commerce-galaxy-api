import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    InternalServerErrorException,
    Param,
    Post,
    Put,
} from '@nestjs/common'
import { ApiTags, ApiOkResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse } from '@nestjs/swagger'

import { Planet } from './planet.entity'
import { NewPlanetDto } from './new-planet.dto'
import { UpdatePlanetDto } from './update-planet.dto'
import { ObjectIdDto } from 'src/common/object-id.dto'
import { PlanetService } from './planet.service'

@ApiTags('planets')
@Controller('planets')
export class PlanetController {
    constructor(
        private readonly planetService: PlanetService,
    ) { }

    @Get()
    @ApiOkResponse({ type: [Planet] })
    public async getAllPlanets(): Promise<Planet[]> {
        return this.planetService.findAll();
    }

    @Get(':id')
    @ApiOkResponse({ type: Planet })
    public async getPlanetById(@Param() objectIdDto: ObjectIdDto): Promise<Planet> {
        return this.planetService.findOne(objectIdDto.id);
    }

    @Post()
    @ApiOkResponse({ type: Planet })
    @ApiBadRequestResponse()
    public async createPlanet(@Body() newPlanetDto: NewPlanetDto): Promise<Planet> {
        if (!newPlanetDto) {
            throw new BadRequestException('request invalid');
        }
        return this.planetService.create(newPlanetDto);
    }

    @Put(':id')
    @ApiOkResponse({ type: Planet })
    @ApiBadRequestResponse()
    @ApiInternalServerErrorResponse()
    public async updatePlanet(@Param() objectIdDto: ObjectIdDto, @Body() updatePlanetDto: UpdatePlanetDto): Promise<Planet> {
        if (!updatePlanetDto) {
            throw new BadRequestException('request invalid');
        }
        return this.planetService.update(objectIdDto.id, updatePlanetDto);
    }

    @Delete(':id')
    @ApiOkResponse({ type: Planet })
    @ApiInternalServerErrorResponse()
    public async deletePlanet(@Param() objectIdDto: ObjectIdDto): Promise<Planet> {
        return this.planetService.delete(objectIdDto.id);
    }
}