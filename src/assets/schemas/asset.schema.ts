import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { format } from 'date-fns';
import { Category } from '@/categories/schemas/category.schema';

export type AssetType = 'image' | 'video' | 'audio';
export type AssetDocument = HydratedDocument<Asset>;

const DATE_TIME_FORMAT = 'yyyy-MM-dd HH:mm:ss';

@Schema({
  timestamps: true,
  toJSON: {
    transform: (doc: AssetDocument, ret) => {
      ret.id = doc._id;
      ret.createdTime = format(doc.createdAt, DATE_TIME_FORMAT);
      ret.updatedTime = format(doc.updatedAt, DATE_TIME_FORMAT);
      delete ret._id;
      delete ret.__v;
      delete ret.createdAt;
      delete ret.updatedAt;
      return ret;
    },
  },
})
export class Asset {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, type: String })
  type: AssetType;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Category' })
  categories: Category;

  @Prop()
  projectIdList: string[];

  @Prop({ required: true })
  creator: string;

  @Prop({ required: true })
  updater: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const AssetSchema = SchemaFactory.createForClass(Asset);
