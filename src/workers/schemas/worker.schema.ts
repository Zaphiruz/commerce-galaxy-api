import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type WorkerDocument = HydratedDocument<Worker>;

@Schema()
export class Worker {
  @ApiProperty({ type: String })
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  name: string;

  constructor(worker?: Partial<Worker>) {
    Object.assign(this, worker);
  }
}

export const WorkerSchema = SchemaFactory.createForClass(Worker);
