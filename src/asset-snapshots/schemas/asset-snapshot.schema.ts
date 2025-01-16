import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Asset, AssetSchema } from '@/assets/schemas/asset.schema';

export type AssetSnapshotDocument = AssetSnapshot & Document;

@Schema({
  toJSON: {
    transform: (doc, ret) => {
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },
})
export class AssetSnapshot {
  @Prop({ type: AssetSchema })
  assetData: Asset;
}

export const AssetSnapshotSchema = SchemaFactory.createForClass(AssetSnapshot);
