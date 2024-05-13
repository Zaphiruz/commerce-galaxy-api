// import {
//     BadRequestException,
//     Body,
//     Controller,
//     Delete,
//     Get,
//     InternalServerErrorException,
//     Param,
//     Post,
//     Put,
// } from '@nestjs/common'
// import { InjectRepository } from '@nestjs/typeorm'
// import { MongoRepository } from 'typeorm'
// import { ObjectId } from 'mongodb'
// import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'

// import { Base } from './base.entity'
// import { NewBaseDto } from './new-base.dto'
// import { UpdateBaseDto } from './update-base.dto'
// import { ObjectIdDto } from 'src/common/object-id.dto'

// @ApiTags('bases')
// @Controller('bases')
// export class BaseController{
//     constructor(
//         @InjectRepository(Base)
//         private readonly baseRespository: MongoRepository<Base>,
//     ) { }

//     @Get()
//     @ApiOkResponse({ type: [Base] })
//     public async getAllBases(): Promise<Base[]> {
//         return this.baseRespository.find({
//             relations: {
//                 planet: true,
//                 owner: true
//             }
//         });
//     }

//     @Get(':id')
//     @ApiOkResponse({ type: Base })
//     public async getBaseById(@Param() objectIdDto: ObjectIdDto): Promise<Base> {
//         return this.baseRespository.findOneBy({ 
//             _id: ObjectId.createFromHexString(objectIdDto.id),
//             relations: {
//                 planet: true,
//                 owner: true
//             }
//         });
//     }

//     @Post()
//     @ApiOkResponse({ type: Base })
//     @ApiBadRequestResponse()
//     public async createBase(@Body() newBaseDto: NewBaseDto): Promise<Base> {
//         if (!newBaseDto) {
//             throw new BadRequestException('request invalid');
//         }
//         return this.baseRespository.save(new Base(newBaseDto));
//     }

//     @Put(':id')
//     @ApiOkResponse({ type: Base })
//     @ApiBadRequestResponse()
//     @ApiInternalServerErrorResponse()
//     public async updateBase(@Param() objectIdDto: ObjectIdDto, @Body() updateBaseDto: UpdateBaseDto): Promise<Base> {
//         if (!updateBaseDto) {
//             throw new BadRequestException('request invalid');
//         }
//         let doc = await this.baseRespository.findOneAndUpdate({ _id: ObjectId.createFromHexString(objectIdDto.id) }, { "$set": updateBaseDto }, { returnDocument: 'after' });
//         if (doc.value) {
//             return new Base(doc.value);
//         } else {
//             throw new InternalServerErrorException('no base updated')
//         }
//     }

//     @Delete(':id')
//     @ApiOkResponse({ type: Base })
//     @ApiInternalServerErrorResponse()
//     public async deleteBase(@Param() objectIdDto: ObjectIdDto): Promise<Base> {
//         let doc = await this.baseRespository.findOneAndDelete({ _id: ObjectId.createFromHexString(objectIdDto.id) });
//         if (doc.value) {
//             return new Base(doc.value);
//         } else {
//             throw new InternalServerErrorException('no resrouce deleted')
//         }
//     }
// }