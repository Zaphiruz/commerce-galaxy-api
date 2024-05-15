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

import { System } from './schemas/system.schema';
import { NewSystemDto } from './dtos/create-system.dto';
import { UpdateSystemDto } from './dtos/update-system.dto';
import { SystemService } from './system.service';
import { SystemResponseDto } from './dtos/system.response.dto';

import { ObjectIdDto } from 'src/common/dtos/object-id.dto';
import { AuthGuard } from '../auth/auth.guard';
import { PoliciesGuard } from '../casl/policies.guard';
import { CheckPolicies } from 'src/casl/policies.decorator';
import { ActionEnum } from 'src/casl/action.enum';
import { AppAbility } from 'src/casl/casl-ability.factory';
import { DtoInterceptor } from '../common/dto-converter.interceptor';

@ApiTags('systems')
@Controller('systems')
@UseGuards(AuthGuard, PoliciesGuard)
@UseInterceptors(new DtoInterceptor<SystemResponseDto>(SystemResponseDto))
@ApiBearerAuth()
@ApiUnauthorizedResponse()
@ApiForbiddenResponse()
export class SystemController {
  constructor(private readonly systemService: SystemService) {}

  @Get()
  @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Read, System))
  @ApiOkResponse({ type: [System] })
  public async getAllSystems(): Promise<System[]> {
    return this.systemService.findAll();
  }

  @Get(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Read, System))
  @ApiOkResponse({ type: System })
  public async getSystemById(
    @Param() objectIdDto: ObjectIdDto,
  ): Promise<System> {
    return this.systemService.findOne(objectIdDto.id);
  }

  @Post()
  @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Read, System))
  @ApiOkResponse({ type: System })
  @ApiBadRequestResponse()
  public async createSystem(
    @Body() newSystemDto: NewSystemDto,
  ): Promise<System> {
    if (!newSystemDto) {
      throw new BadRequestException('request invalid');
    }
    return this.systemService.create(newSystemDto);
  }

  @Put(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Read, System))
  @ApiOkResponse({ type: System })
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  public async updateSystem(
    @Param() objectIdDto: ObjectIdDto,
    @Body() updateSystemDto: UpdateSystemDto,
  ): Promise<System> {
    if (!updateSystemDto) {
      throw new BadRequestException('request invalid');
    }
    return this.systemService.update(objectIdDto.id, updateSystemDto);
  }

  @Delete(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Read, System))
  @ApiOkResponse({ type: System })
  @ApiInternalServerErrorResponse()
  public async deleteSystem(
    @Param() objectIdDto: ObjectIdDto,
  ): Promise<System> {
    return this.systemService.delete(objectIdDto.id);
  }
}
