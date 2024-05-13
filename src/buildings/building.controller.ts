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
import { ApiTags, ApiOkResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiBearerAuth, ApiUnauthorizedResponse, ApiForbiddenResponse } from '@nestjs/swagger'

import { Building } from './schemas/building.entity'
import { NewBuildingDto } from './dtos/new-building.dto'
import { UpdateBuildingDto } from './dtos/update-building.dto'
import { ObjectIdDto } from '../common/dtos/object-id.dto'
import { BuildingService } from './building.service'
import { AuthGuard } from '../auth/auth.guard'
import { PoliciesGuard } from '../casl/policies.guard'
import { CheckPolicies } from 'src/casl/policies.decorator'
import { ActionEnum } from 'src/casl/action.enum'
import { AppAbility } from 'src/casl/casl-ability.factory'

@UseGuards(AuthGuard, PoliciesGuard)
@ApiTags('buildings')
@ApiBearerAuth()
@ApiUnauthorizedResponse()
@ApiForbiddenResponse()
@Controller('buildings')
export class BuildingController {
    constructor(
        private readonly buildingService: BuildingService,
    ) { }

    @Get()
    @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Read, Building))
    @ApiOkResponse({ type: [Building] })
    public async getAllBuildings(): Promise<Building[]> {
        return this.buildingService.findAll();
    }

    @Get(':id')
    @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Read, Building))
    @ApiOkResponse({ type: Building })
    public async getBuildingById(@Param() objectIdDto: ObjectIdDto): Promise<Building> {
        return this.buildingService.findOne(objectIdDto.id);
    }

    @Post()
    @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Create, Building))
    @ApiOkResponse({ type: Building })
    @ApiBadRequestResponse()
    public async createBuilding(@Body() newBuildingDto: NewBuildingDto): Promise<Building> {
        if (!newBuildingDto) {
            throw new BadRequestException('request invalid');
        }
        return this.buildingService.create(newBuildingDto);
    }

    @Put(':id')
    @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Update, Building))
    @ApiOkResponse({ type: Building })
    @ApiBadRequestResponse()
    @ApiInternalServerErrorResponse()
    public async updatePlanet(@Param() objectIdDto: ObjectIdDto, @Body() updateBuildingDto: UpdateBuildingDto): Promise<Building> {
        if (!updateBuildingDto) {
            throw new BadRequestException('request invalid');
        }
        return this.buildingService.update(objectIdDto.id, updateBuildingDto);
    }

    @Delete(':id')
    @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Delete, Building))
    @ApiOkResponse({ type: Building })
    @ApiInternalServerErrorResponse()
    public async deletePlanet(@Param() objectIdDto: ObjectIdDto): Promise<Building> {
        return this.buildingService.delete(objectIdDto.id);
    }
}