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
    UseGuards,
} from '@nestjs/common'
import { ApiTags, ApiOkResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse } from '@nestjs/swagger'

import { Planet } from './schemas/planet.schema'
import { NewPlanetDto } from './dtos/new-planet.dto'
import { UpdatePlanetDto } from './dtos/update-planet.dto'
import { ObjectIdDto } from 'src/common/object-id.dto'
import { PlanetService } from './planet.service'
import { AuthGuard } from '../auth/auth.guard'
import { PoliciesGuard } from '../casl/policies.guard'
import { CheckPolicies } from 'src/casl/policies.decorator'
import { ActionEnum } from 'src/casl/action.enum'
import { AppAbility } from 'src/casl/casl-ability.factory'

@UseGuards(AuthGuard, PoliciesGuard)
@ApiTags('planets')
@Controller('planets')
export class PlanetController {
    constructor(
        private readonly planetService: PlanetService,
    ) { }

    @Get()
    @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Read, Planet))
    @ApiOkResponse({ type: [Planet] })
    public async getAllPlanets(): Promise<Planet[]> {
        return this.planetService.findAll();
    }

    @Get(':id')
    @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Read, Planet))
    @ApiOkResponse({ type: Planet })
    public async getPlanetById(@Param() objectIdDto: ObjectIdDto): Promise<Planet> {
        return this.planetService.findOne(objectIdDto.id);
    }

    @Post()
    @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Create, Planet))
    @ApiOkResponse({ type: Planet })
    @ApiBadRequestResponse()
    public async createPlanet(@Body() newPlanetDto: NewPlanetDto): Promise<Planet> {
        if (!newPlanetDto) {
            throw new BadRequestException('request invalid');
        }
        return this.planetService.create(newPlanetDto);
    }

    @Put(':id')
    @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Update, Planet))
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
    @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Delete, Planet))
    @ApiOkResponse({ type: Planet })
    @ApiInternalServerErrorResponse()
    public async deletePlanet(@Param() objectIdDto: ObjectIdDto): Promise<Planet> {
        return this.planetService.delete(objectIdDto.id);
    }
}