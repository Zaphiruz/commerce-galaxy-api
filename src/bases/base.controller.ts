import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common'
import { ApiTags, ApiOkResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiBearerAuth, ApiUnauthorizedResponse, ApiForbiddenResponse } from '@nestjs/swagger'

import { Base } from './schemas/base.schema'
import { NewBaseDto } from './dtos/new-base.dto'
import { UpdateBaseDto } from './dtos/update-base.dto'
import { ObjectIdDto } from 'src/common/dtos/object-id.dto'
import { BaseService } from './base.service'
import { AuthGuard } from '../auth/auth.guard'
import { PoliciesGuard } from '../casl/policies.guard'
import { CheckPolicies } from 'src/casl/policies.decorator'
import { ActionEnum } from 'src/casl/action.enum'
import { AppAbility } from 'src/casl/casl-ability.factory'

@UseGuards(AuthGuard, PoliciesGuard)
@ApiTags('bases')
@ApiBearerAuth()
@ApiUnauthorizedResponse()
@ApiForbiddenResponse()
@Controller('bases')
export class BaseController {
    constructor(
        private readonly baseService: BaseService,
    ) { }

    @Get()
    @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Read, Base))
    @ApiOkResponse({ type: [Base] })
    public async getAllBases(): Promise<Base[]> {
        return this.baseService.findAll();
    }

    @Get(':id')
    @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Read, Base))
    @ApiOkResponse({ type: Base })
    public async getBaseById(@Param() objectIdDto: ObjectIdDto): Promise<Base> {
        return this.baseService.findOne(objectIdDto.id);
    }

    @Post()
    @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Create, Base))
    @ApiOkResponse({ type: Base })
    @ApiBadRequestResponse()
    public async createBase(@Body() newBaseDto: NewBaseDto): Promise<Base> {
        if (!newBaseDto) {
            throw new BadRequestException('request invalid');
        }
        return this.baseService.create(newBaseDto);
    }

    @Put(':id')
    @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Update, Base))
    @ApiOkResponse({ type: Base })
    @ApiBadRequestResponse()
    @ApiInternalServerErrorResponse()
    public async updatePlanet(@Param() objectIdDto: ObjectIdDto, @Body() updateBaseDto: UpdateBaseDto): Promise<Base> {
        if (!updateBaseDto) {
            throw new BadRequestException('request invalid');
        }
        return this.baseService.update(objectIdDto.id, updateBaseDto);
    }

    @Delete(':id')
    @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Delete, Base))
    @ApiOkResponse({ type: Base })
    @ApiInternalServerErrorResponse()
    public async deletePlanet(@Param() objectIdDto: ObjectIdDto): Promise<Base> {
        return this.baseService.delete(objectIdDto.id);
    }
}