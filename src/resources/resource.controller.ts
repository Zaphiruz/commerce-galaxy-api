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

// import { Resource } from './resource.entity'
// import { NewResourceDto } from './new-resource.dto'
// import { UpdateResourceDto } from './update-resource.dto'
// import { ObjectIdDto } from 'src/common/object-id.dto'

// @ApiTags('resources')
// @Controller('resources')
// export class ResourceController{
//     constructor(
//         @InjectRepository(Resource)
//         private readonly resourceRespository: MongoRepository<Resource>,
//     ) { }

//     @Get()
//     @ApiOkResponse({ type: [Resource] })
//     public async getAllResources(): Promise<Resource[]> {
//         return this.resourceRespository.find();
//     }

//     @Get(':id')
//     @ApiOkResponse({ type: Resource })
//     public async getResourceById(@Param() objectIdDto: ObjectIdDto): Promise<Resource> {
//         return this.resourceRespository.findOneBy({ _id: ObjectId.createFromHexString(objectIdDto.id) });
//     }

//     @Post()
//     @ApiOkResponse({ type: Resource })
//     @ApiBadRequestResponse()
//     public async createResource(@Body() newResourceDto: NewResourceDto): Promise<Resource> {
//         if (!newResourceDto) {
//             throw new BadRequestException('request invalid');
//         }
//         return this.resourceRespository.save(new Resource(newResourceDto));
//     }

//     @Put(':id')
//     @ApiOkResponse({ type: Resource })
//     @ApiBadRequestResponse()
//     @ApiInternalServerErrorResponse()
//     public async updateResource(@Param() objectIdDto: ObjectIdDto, @Body() updateResourceDto: UpdateResourceDto): Promise<Resource> {
//         if (!updateResourceDto) {
//             throw new BadRequestException('request invalid');
//         }
//         let doc = await this.resourceRespository.findOneAndUpdate({ _id: ObjectId.createFromHexString(objectIdDto.id) }, { "$set": updateResourceDto }, { returnDocument: 'after' });
//         if (doc.value) {
//             return new Resource(doc.value);
//         } else {
//             throw new InternalServerErrorException('no resource updated')
//         }
//     }

//     @Delete(':id')
//     @ApiOkResponse({ type: Resource })
//     @ApiInternalServerErrorResponse()
//     public async deleteResource(@Param() objectIdDto: ObjectIdDto): Promise<Resource> {
//         let doc = await this.resourceRespository.findOneAndDelete({ _id: ObjectId.createFromHexString(objectIdDto.id) });
//         if (doc.value) {
//             return new Resource(doc.value);
//         } else {
//             throw new InternalServerErrorException('no resrouce deleted')
//         }
//     }
// }