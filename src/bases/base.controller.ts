import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';

import { Base } from './schemas/base.schema';
import { CreateBaseRequestDto } from './dtos/create-base.request';
import { UpdateBaseRequest } from './dtos/update-base.request.dto';
import { ObjectIdDto } from 'src/common/dtos/object-id.dto';
import { BaseService } from './base.service';
import { AuthGuard } from '../auth/auth.guard';
import { PoliciesGuard } from '../casl/policies.guard';
import { CheckPolicies } from 'src/casl/policies.decorator';
import { ActionEnum } from 'src/casl/action.enum';
import { AppAbility } from 'src/casl/casl-ability.factory';
import { DtoInterceptor } from 'src/common/dto-converter.interceptor';
import { BaseResponseDto } from './dtos/base.response.dto';

@UseGuards(AuthGuard, PoliciesGuard)
@UseInterceptors(new DtoInterceptor<BaseResponseDto>(BaseResponseDto))
@ApiTags('bases')
@ApiBearerAuth()
@ApiUnauthorizedResponse()
@ApiForbiddenResponse()
@Controller('bases')
export class BaseController {
  constructor(private readonly baseService: BaseService) {}

  @Get()
  @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Read, Base))
  @ApiOkResponse({ type: [Base] })
  public async getAllBases(): Promise<Base[]> {
    return this.baseService.findAll();
  }

  @Get('me')
  @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Read, Base))
  @ApiOkResponse({ type: [Base] })
  public async getMe(@Req() request: Request): Promise<Base[]> {
    return this.baseService.findAll({ user: request['user']._id.toString() });
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
  public async createBase(
    @Body() createBaseRequestDto: CreateBaseRequestDto,
  ): Promise<Base> {
    if (!createBaseRequestDto) {
      throw new BadRequestException('request invalid');
    }
    return this.baseService.create(createBaseRequestDto);
  }

  @Put(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Update, Base))
  @ApiOkResponse({ type: Base })
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  public async updateBuilding(
    @Param() objectIdDto: ObjectIdDto,
    @Body() updateBaseRequestDto: UpdateBaseRequest,
  ): Promise<Base> {
    if (!updateBaseRequestDto) {
      throw new BadRequestException('request invalid');
    }
    return this.baseService.update(objectIdDto.id, updateBaseRequestDto);
  }

  @Delete(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Delete, Base))
  @ApiOkResponse({ type: Base })
  @ApiInternalServerErrorResponse()
  public async deleteBuilding(
    @Param() objectIdDto: ObjectIdDto,
  ): Promise<Base> {
    return this.baseService.delete(objectIdDto.id);
  }
}
