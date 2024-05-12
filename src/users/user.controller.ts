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
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { MongoRepository } from 'typeorm'
import { ObjectId } from 'mongodb'
import { ApiTags, ApiOkResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse } from '@nestjs/swagger'

import { User } from './user.entity'
import { NewUserDto } from './new-user.dto'
import { UpdaetUserDto } from './update-user.dto'

@ApiTags('users')
@Controller('users')
export class UserController {
    constructor(
        @InjectRepository(User)
        private readonly UserRespository: MongoRepository<User>,
    ) { }

    @Get()
    @ApiOkResponse({ type: [User] })
    public async getAllUsers(): Promise<User[]> {
        return this.UserRespository.find();
    }

    @Get(':id')
    @ApiOkResponse({ type: User })
    public async getUserById(@Param('id') id: string): Promise<User> {
        return this.UserRespository.findOneBy({ _id: ObjectId.createFromHexString(id) });
    }

    @Post()
    @ApiOkResponse({ type: User })
    @ApiBadRequestResponse()
    public async createUser(@Body() newUserDto: NewUserDto): Promise<User> {
        if (!newUserDto) {
            throw new BadRequestException('request invalid');
        }
        return this.UserRespository.save(new User(newUserDto));
    }

    @Put(':id')
    @ApiOkResponse({ type: User })
    @ApiBadRequestResponse()
    @ApiInternalServerErrorResponse()
    public async updatePlanet(@Param('id') id: string, @Body() updateUserDto: UpdaetUserDto): Promise<User> {
        if (!updateUserDto) {
            throw new BadRequestException('request invalid');
        }
        let doc = await this.UserRespository.findOneAndUpdate({ _id: ObjectId.createFromHexString(id) }, { "$set": updateUserDto }, { returnDocument: 'after' });
        if (doc.value) {
            return new User(doc.value);
        } else {
            throw new InternalServerErrorException('no user updated')
        }
    }

    @Delete(':id')
    @ApiOkResponse({ type: User })
    @ApiInternalServerErrorResponse()
    public async deletePlanet(@Param('id') id: string): Promise<User> {
        let doc = await this.UserRespository.findOneAndDelete({ _id: ObjectId.createFromHexString(id) });
        if (doc.value) {
            return new User(doc.value);
        } else {
            throw new InternalServerErrorException('no users deleted')
        }
    }
}