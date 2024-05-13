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

import { Resource } from './schemas/resource.schema'
import { NewResourceDto } from './dtos/new-resource.dto'
import { UpdateResourceDto } from './dtos/update-resource.dto'
import { ObjectIdDto } from 'src/common/object-id.dto'
import { ResourceService } from './resource.service'
import { AuthGuard } from '../auth/auth.guard'
import { PoliciesGuard } from 'src/casl/policies.guard'
import { CheckPolicies } from 'src/casl/policies.decorator'
import { ActionEnum } from 'src/casl/action.enum'
import { AppAbility } from 'src/casl/casl-ability.factory'

@UseGuards(AuthGuard, PoliciesGuard)
@ApiTags('resources')
@Controller('resources')
export class ResourceController {
    constructor(
        private readonly resourceService: ResourceService,
    ) { }

    @Get()
    @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Read, Resource))
    @ApiOkResponse({ type: [Resource] })
    public async getAllResources(): Promise<Resource[]> {
        return this.resourceService.findAll();
    }

    @Get(':id')
    @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Read, Resource))
    @ApiOkResponse({ type: Resource })
    public async getResourceById(@Param() objectIdDto: ObjectIdDto): Promise<Resource> {
        return this.resourceService.findOne(objectIdDto.id);
    }

    @Post()
    @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Create, Resource))
    @ApiOkResponse({ type: Resource })
    @ApiBadRequestResponse()
    public async createResource(@Body() newResourceDto: NewResourceDto): Promise<Resource> {
        if (!newResourceDto) {
            throw new BadRequestException('request invalid');
        }
        return this.resourceService.create(newResourceDto);
    }

    @Put(':id')
    @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Update, Resource))
    @ApiOkResponse({ type: Resource })
    @ApiBadRequestResponse()
    @ApiInternalServerErrorResponse()
    public async updatePlanet(@Param() objectIdDto: ObjectIdDto, @Body() updateResourceDto: UpdateResourceDto): Promise<Resource> {
        if (!updateResourceDto) {
            throw new BadRequestException('request invalid');
        }
        return this.resourceService.update(objectIdDto.id, updateResourceDto);
    }

    @Delete(':id')
    @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Delete, Resource))
    @ApiOkResponse({ type: Resource })
    @ApiInternalServerErrorResponse()
    public async deletePlanet(@Param() objectIdDto: ObjectIdDto): Promise<Resource> {
        return this.resourceService.delete(objectIdDto.id);
    }
}