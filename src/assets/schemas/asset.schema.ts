import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Category } from '@/categories/schemas/category.schema';

export type AssetType = 'image' | 'video' | 'audio';
export type AssetDocument = HydratedDocument<Asset>;

@Schema({
  timestamps: {
    createdAt: 'createTime',
    updatedAt: 'updateTime',
  },
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
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
}

export const AssetSchema = SchemaFactory.createForClass(Asset);
