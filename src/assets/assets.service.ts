import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { QueryAssetDto } from './dto/query-asset.dto';
import { Asset } from './schemas/asset.schema';

@Injectable()
export class AssetsService {
  constructor(
    @InjectModel(Asset.name) private readonly assetModel: Model<Asset>,
  ) {}

  async create(createAssetDto: CreateAssetDto) {
    const existingAsset = await this.assetModel
      .findOne({
        name: createAssetDto.name,
      })
      .exec();
    if (existingAsset) {
      throw new Error(`${createAssetDto.name} already exists`);
    }
    return await this.assetModel.create(createAssetDto);
  }

  findAll(queryAssetDto: QueryAssetDto) {
    const { pageNum, pageSize, ...rest } = queryAssetDto;
    return this.assetModel
      .find(rest)
      .sort({ updateTime: -1 })
      .skip((pageNum - 1) * pageSize)
      .limit(pageSize);
  }

  async update(updateAssetDto: UpdateAssetDto) {
    const { id, ...rest } = updateAssetDto;
    const _id = new Types.ObjectId(id);
    const existingAsset = await this.assetModel.findOne({ _id }).exec();
    if (!existingAsset) {
      throw new Error(`Asset not found`);
    }
    return await this.assetModel.findByIdAndUpdate(
      { _id },
      { $set: rest },
      { new: true },
    );
  }
}
