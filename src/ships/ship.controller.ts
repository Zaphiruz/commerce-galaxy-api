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

import { Ship } from './schemas/ship.schema';
import { NewShipDto } from './dtos/create-ship.dto';
import { UpdateShipDto } from './dtos/update-ship.dto';
import { ShipService } from './ship.service';
import { ShipResponseDto } from './dtos/ship.response.dto';

import { ObjectIdDto } from 'src/common/dtos/object-id.dto';
import { AuthGuard } from '../auth/auth.guard';
import { PoliciesGuard } from '../casl/policies.guard';
import { CheckPolicies } from 'src/casl/policies.decorator';
import { ActionEnum } from 'src/casl/action.enum';
import { AppAbility } from 'src/casl/casl-ability.factory';
import { DtoInterceptor } from '../common/dto-converter.interceptor';

@ApiTags('ships')
@Controller('ships')
@UseGuards(AuthGuard, PoliciesGuard)
@UseInterceptors(new DtoInterceptor<ShipResponseDto>(ShipResponseDto))
@ApiBearerAuth()
@ApiUnauthorizedResponse()
@ApiForbiddenResponse()
export class ShipController {
  constructor(private readonly shipService: ShipService) {}

  @Get()
  @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Read, Ship))
  @ApiOkResponse({ type: [Ship] })
  public async getAllShips(): Promise<Ship[]> {
    return this.shipService.findAll();
  }

  @Get(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Read, Ship))
  @ApiOkResponse({ type: Ship })
  public async getShipById(@Param() objectIdDto: ObjectIdDto): Promise<Ship> {
    return this.shipService.findOne(objectIdDto.id);
  }

  @Post()
  @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Read, Ship))
  @ApiOkResponse({ type: Ship })
  @ApiBadRequestResponse()
  public async createShip(@Body() newShipDto: NewShipDto): Promise<Ship> {
    if (!newShipDto) {
      throw new BadRequestException('request invalid');
    }
    return this.shipService.create(newShipDto);
  }

  @Put(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Read, Ship))
  @ApiOkResponse({ type: Ship })
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  public async updateShip(
    @Param() objectIdDto: ObjectIdDto,
    @Body() updateShipDto: UpdateShipDto,
  ): Promise<Ship> {
    if (!updateShipDto) {
      throw new BadRequestException('request invalid');
    }
    return this.shipService.update(objectIdDto.id, updateShipDto);
  }

  @Delete(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Read, Ship))
  @ApiOkResponse({ type: Ship })
  @ApiInternalServerErrorResponse()
  public async deleteShip(@Param() objectIdDto: ObjectIdDto): Promise<Ship> {
    return this.shipService.delete(objectIdDto.id);
  }
}
