import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ type: Types.ObjectId })
  _id: Types.ObjectId;
  
  @Prop({ required: true })
  googleId: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  displayName: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
