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

import { Fabricator } from './schemas/fabricator.schema';
import { NewFabricatorDto } from './dtos/create-fabricator.dto';
import { UpdateFabricatorDto } from './dtos/update-fabricator.dto';
import { FabricatorService } from './fabricator.service';
import { FabricatorResponseDto } from './dtos/fabricator.response.dto';

import { ObjectIdDto } from 'src/common/dtos/object-id.dto';
import { AuthGuard } from '../auth/auth.guard';
import { PoliciesGuard } from '../casl/policies.guard';
import { CheckPolicies } from 'src/casl/policies.decorator';
import { ActionEnum } from 'src/casl/action.enum';
import { AppAbility } from 'src/casl/casl-ability.factory';
import { DtoInterceptor } from '../common/dto-converter.interceptor';

@ApiTags('fabricators')
@Controller('fabricators')
@UseGuards(AuthGuard, PoliciesGuard)
@UseInterceptors(
  new DtoInterceptor<FabricatorResponseDto>(FabricatorResponseDto),
)
@ApiBearerAuth()
@ApiUnauthorizedResponse()
@ApiForbiddenResponse()
export class FabricatorController {
  constructor(private readonly fabricatorService: FabricatorService) {}

  @Get()
  @CheckPolicies((ability: AppAbility) =>
    ability.can(ActionEnum.Read, Fabricator),
  )
  @ApiOkResponse({ type: [Fabricator] })
  public async getAllFabricators(): Promise<Fabricator[]> {
    return this.fabricatorService.findAll();
  }

  @Get(':id')
  @CheckPolicies((ability: AppAbility) =>
    ability.can(ActionEnum.Read, Fabricator),
  )
  @ApiOkResponse({ type: Fabricator })
  public async getFabricatorById(
    @Param() objectIdDto: ObjectIdDto,
  ): Promise<Fabricator> {
    return this.fabricatorService.findOne(objectIdDto.id);
  }

  @Post()
  @CheckPolicies((ability: AppAbility) =>
    ability.can(ActionEnum.Read, Fabricator),
  )
  @ApiOkResponse({ type: Fabricator })
  @ApiBadRequestResponse()
  public async createFabricator(
    @Body() newFabricatorDto: NewFabricatorDto,
  ): Promise<Fabricator> {
    if (!newFabricatorDto) {
      throw new BadRequestException('request invalid');
    }
    return this.fabricatorService.create(newFabricatorDto);
  }

  @Put(':id')
  @CheckPolicies((ability: AppAbility) =>
    ability.can(ActionEnum.Read, Fabricator),
  )
  @ApiOkResponse({ type: Fabricator })
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  public async updateFabricator(
    @Param() objectIdDto: ObjectIdDto,
    @Body() updateFabricatorDto: UpdateFabricatorDto,
  ): Promise<Fabricator> {
    if (!updateFabricatorDto) {
      throw new BadRequestException('request invalid');
    }
    return this.fabricatorService.update(objectIdDto.id, updateFabricatorDto);
  }

  @Delete(':id')
  @CheckPolicies((ability: AppAbility) =>
    ability.can(ActionEnum.Read, Fabricator),
  )
  @ApiOkResponse({ type: Fabricator })
  @ApiInternalServerErrorResponse()
  public async deleteFabricator(
    @Param() objectIdDto: ObjectIdDto,
  ): Promise<Fabricator> {
    return this.fabricatorService.delete(objectIdDto.id);
  }
}
