import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateAssetSnapshotDto } from './dto/create-asset-snapshot.dto';
import { AssetSnapshot } from './schemas/asset-snapshot.schema';

@Injectable()
export class AssetSnapshotsService {
  constructor(
    @InjectModel(AssetSnapshot.name)
    private readonly assetSnapshotModel: Model<AssetSnapshot>,
  ) {}

  create(createAssetSnapshotDto: CreateAssetSnapshotDto) {
    return this.assetSnapshotModel.create(createAssetSnapshotDto);
  }

  async findByAssetId(assetId: string) {
    if (!Types.ObjectId.isValid(assetId)) {
      throw new Error(`Invalid asset ID: ${assetId}`);
    }
    return await this.assetSnapshotModel
      .find({ 'assetData._id': assetId })
      .populate('assetData.categories')
      .exec();
  }
}
