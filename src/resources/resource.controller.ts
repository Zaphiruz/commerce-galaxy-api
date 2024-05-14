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
    UseInterceptors,
} from '@nestjs/common'
import { ApiTags, ApiOkResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiBearerAuth, ApiUnauthorizedResponse, ApiForbiddenResponse } from '@nestjs/swagger'

import { Resource } from './schemas/resource.schema'
import { NewResourceDto } from './dtos/create-resource.dto'
import { UpdateResourceDto } from './dtos/update-resource.dto'
import { ResourceService } from './resource.service'
import { ResourceResponseDto } from './dtos/resource.response.dto'

import { ObjectIdDto } from 'src/common/dtos/object-id.dto'
import { AuthGuard } from '../auth/auth.guard'
import { PoliciesGuard } from '../casl/policies.guard'
import { CheckPolicies } from 'src/casl/policies.decorator'
import { ActionEnum } from 'src/casl/action.enum'
import { AppAbility } from 'src/casl/casl-ability.factory'
import { plainToInstance } from 'class-transformer'
import { DtoInterceptor } from '../common/dto-converter.interceptor'

@ApiTags('resources')
@Controller('resources')
@UseGuards(AuthGuard, PoliciesGuard)
@UseInterceptors(new DtoInterceptor<ResourceResponseDto>(ResourceResponseDto))
@ApiBearerAuth()
@ApiUnauthorizedResponse()
@ApiForbiddenResponse()
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