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
    Request,
    Req,
    Logger,
} from '@nestjs/common'
import { ApiTags, ApiOkResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiBearerAuth, ApiUnauthorizedResponse, ApiForbiddenResponse } from '@nestjs/swagger'

import { User } from './schemas/user.schema'
import { CreateUserDto } from './dtos/create-user.request.dto'
import { UpdateUserDto } from './dtos/update-user.request.dto'
import { ObjectIdDto } from '../common/dtos/object-id.dto'
import { UserService } from './user.service'
import { AuthGuard } from '../auth/auth.guard'
import { PoliciesGuard } from '../casl/policies.guard'
import { CheckPolicies } from 'src/casl/policies.decorator'
import { ActionEnum } from 'src/casl/action.enum'
import { AppAbility } from 'src/casl/casl-ability.factory'
import { UserResponseDto } from './dtos/user.response.dto';
import { DtoInterceptor } from '../common/dto-converter.interceptor'

@UseGuards(AuthGuard, PoliciesGuard)
@UseInterceptors(new DtoInterceptor<UserResponseDto>(UserResponseDto))
@ApiTags('users')
@ApiBearerAuth()
@ApiUnauthorizedResponse()
@ApiForbiddenResponse()
@Controller('users')
export class UserController {
    logger = new Logger(UserController.name);

    constructor(
        private readonly userService: UserService,
    ) { }

    @Get()
    @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Read, User))
    @ApiOkResponse({ type: [User] })
    public async getAllUsers(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get('me')
    @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Read, User))
    @ApiOkResponse({ type: User })
    public async getMe(@Req() request: Request): Promise<User> {
        return request['user'];
    }

    @Get(':id')
    @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Read, User))
    @ApiOkResponse({ type: User })
    public async getUserById(@Param() objectIdDto: ObjectIdDto): Promise<User> {
        return this.userService.findOne(objectIdDto.id);
    }

    @Post()
    @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Create, User))
    @ApiOkResponse({ type: UserResponseDto })
    @ApiBadRequestResponse()
    public async createUser(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
        if (!createUserDto) {
            throw new BadRequestException('request invalid');
        }
        if (await this.userService.findByUsername(createUserDto.username)) {
            throw new BadRequestException('username in use');
        }
        return this.userService.create(createUserDto);
    }

    @Put(':id')
    @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Update, User))
    @ApiOkResponse({ type: UserResponseDto })
    @ApiBadRequestResponse()
    @ApiInternalServerErrorResponse()
    public async updateUser(@Param() objectIdDto: ObjectIdDto, @Body() updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
        if (!updateUserDto) {
            throw new BadRequestException('request invalid');
        }
        return this.userService.update(objectIdDto.id, updateUserDto);
    }

    @Delete(':id')
    @CheckPolicies((ability: AppAbility) => ability.can(ActionEnum.Delete, User))
    @ApiOkResponse({ type: UserResponseDto })
    @ApiInternalServerErrorResponse()
    public async deleteUser(@Param() objectIdDto: ObjectIdDto): Promise<UserResponseDto> {
        return this.userService.delete(objectIdDto.id);
    }
}