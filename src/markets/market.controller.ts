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

import { Market } from './schemas/market.schema';
import { NewMarketDto } from './dtos/create-market.dto';
import { MarketService } from './market.service';
import { UpdateMarketDto } from './dtos/update-market.dto';
import { MarketResponseDto } from './dtos/market.response.dto';

import { ObjectIdDto } from 'src/common/dtos/object-id.dto';
import { AuthGuard } from '../auth/auth.guard';
import { PoliciesGuard } from '../casl/policies.guard';
import { CheckPolicies } from 'src/casl/policies.decorator';
import { ActionEnum } from 'src/casl/action.enum';
import { AppAbility } from 'src/casl/casl-ability.factory';
import { DtoInterceptor } from '../common/interceptors/dto-converter.interceptor';

@ApiTags('markets')
@Controller('markets')
@UseGuards(AuthGuard, PoliciesGuard)
@UseInterceptors(new DtoInterceptor<MarketResponseDto>(MarketResponseDto))
@ApiBearerAuth()
@ApiUnauthorizedResponse()
@ApiForbiddenResponse()
export class MarketController {
  constructor(private readonly marketService: MarketService) {}

  @Get()
  @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Read, Market))
  @ApiOkResponse({ type: [Market] })
  public async getAllMarkets(): Promise<Market[]> {
    return this.marketService.findAll();
  }

  @Get(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Read, Market))
  @ApiOkResponse({ type: Market })
  public async getMarketById(
    @Param() objectIdDto: ObjectIdDto,
  ): Promise<Market> {
    return this.marketService.findOne(objectIdDto.id);
  }

  @Post()
  @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Read, Market))
  @ApiOkResponse({ type: Market })
  @ApiBadRequestResponse()
  public async createMarket(
    @Body() newMarketDto: NewMarketDto,
  ): Promise<Market> {
    if (!newMarketDto) {
      throw new BadRequestException('request invalid');
    }
    return this.marketService.create(newMarketDto);
  }

  @Put(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Read, Market))
  @ApiOkResponse({ type: Market })
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  public async updateMarket(
    @Param() objectIdDto: ObjectIdDto,
    @Body() updateMarketDto: UpdateMarketDto,
  ): Promise<Market> {
    if (!updateMarketDto) {
      throw new BadRequestException('request invalid');
    }
    return this.marketService.update(objectIdDto.id, updateMarketDto);
  }

  @Delete(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Read, Market))
  @ApiOkResponse({ type: Market })
  @ApiInternalServerErrorResponse()
  public async deleteMarket(
    @Param() objectIdDto: ObjectIdDto,
  ): Promise<Market> {
    return this.marketService.delete(objectIdDto.id);
  }
}
