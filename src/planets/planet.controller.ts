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

import { Planet } from './schemas/planet.schema';
import { CreatePlanetRequestDto } from './dtos/create-planet.request.dto';
import { UpdatePlanetRequestDto } from './dtos/update-planet.request.dto';
import { ObjectIdDto } from 'src/common/dtos/object-id.dto';
import { PlanetService } from './planet.service';
import { AuthGuard } from '../auth/auth.guard';
import { PoliciesGuard } from '../casl/policies.guard';
import { CheckPolicies } from 'src/casl/policies.decorator';
import { ActionEnum } from 'src/casl/action.enum';
import { AppAbility } from 'src/casl/casl-ability.factory';
import { DtoInterceptor } from 'src/common/interceptors/dto-converter.interceptor';
import { PlanetResponseDto } from './dtos/planet.response.dto';

@UseGuards(AuthGuard, PoliciesGuard)
@UseInterceptors(new DtoInterceptor<PlanetResponseDto>(PlanetResponseDto))
@ApiTags('planets')
@ApiBearerAuth()
@ApiUnauthorizedResponse()
@ApiForbiddenResponse()
@Controller('planets')
export class PlanetController {
  constructor(private readonly planetService: PlanetService) {}

  @Get()
  @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Read, Planet))
  @ApiOkResponse({ type: [Planet] })
  public async getAllPlanets(): Promise<Planet[]> {
    return this.planetService.findAll();
  }

  @Get(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Read, Planet))
  @ApiOkResponse({ type: Planet })
  public async getPlanetById(
    @Param() objectIdDto: ObjectIdDto,
  ): Promise<Planet> {
    return this.planetService.findOne(objectIdDto.id);
  }

  @Post()
  @CheckPolicies((ability: AppAbility) =>
    ability.can(ActionEnum.Create, Planet),
  )
  @ApiOkResponse({ type: Planet })
  @ApiBadRequestResponse()
  public async createPlanet(
    @Body() createPlanetRequestDto: CreatePlanetRequestDto,
  ): Promise<Planet> {
    if (!createPlanetRequestDto) {
      throw new BadRequestException('request invalid');
    }
    return this.planetService.create(createPlanetRequestDto);
  }

  @Put(':id')
  @CheckPolicies((ability: AppAbility) =>
    ability.can(ActionEnum.Update, Planet),
  )
  @ApiOkResponse({ type: Planet })
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  public async updatePlanet(
    @Param() objectIdDto: ObjectIdDto,
    @Body() updatePlanetRequestDto: UpdatePlanetRequestDto,
  ): Promise<Planet> {
    if (!updatePlanetRequestDto) {
      throw new BadRequestException('request invalid');
    }
    return this.planetService.update(objectIdDto.id, updatePlanetRequestDto);
  }

  @Delete(':id')
  @CheckPolicies((ability: AppAbility) =>
    ability.can(ActionEnum.Delete, Planet),
  )
  @ApiOkResponse({ type: Planet })
  @ApiInternalServerErrorResponse()
  public async deletePlanet(
    @Param() objectIdDto: ObjectIdDto,
  ): Promise<Planet> {
    return this.planetService.delete(objectIdDto.id);
  }
}
