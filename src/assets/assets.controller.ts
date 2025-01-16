import {
  Controller,
  Get,
  Post,
  Body,
  HttpStatus,
  HttpException,
  Param,
} from '@nestjs/common';
import { format } from 'date-fns';
import { AssetsService } from './assets.service';
import { AssetSnapshotsService } from '@/asset-snapshots/asset-snapshots.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { QueryAssetDto } from './dto/query-asset.dto';

export const DATE_TIME_FORMAT = 'yyyy-MM-dd HH:mm:ss';

@Controller('assets')
export class AssetsController {
  constructor(
    private readonly assetsService: AssetsService,
    private readonly assetSnapshotsService: AssetSnapshotsService,
  ) {}

  private formatAssetSnapshotDto(asset: any) {
    return {
      assetData: asset,
    };
    const {
      id,
      name,
      type,
      content,
      categories,
      projectIdList,
      creator,
      updater,
      createdAt,
      updatedAt,
    } = asset;
    return {
      assetId: id,
      name,
      type,
      content,
      categories,
      projectIdList,
      creator,
      updater,
      createdTime: format(createdAt, DATE_TIME_FORMAT),
      updatedTime: format(updatedAt, DATE_TIME_FORMAT),
    };
  }

  @Post('create')
  async create(@Body() createAssetDto: CreateAssetDto) {
    try {
      const createdAsset = await this.assetsService.create(createAssetDto);
      const createAssetSnapshotDto: any =
        this.formatAssetSnapshotDto(createdAsset);
      await this.assetSnapshotsService.create(createAssetSnapshotDto);
      return createdAsset;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('list')
  findAll(@Body() queryAssetDto: QueryAssetDto) {
    return this.assetsService.findAll(queryAssetDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.assetsService.findOne(id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('update')
  async update(@Body() updateAssetDto: UpdateAssetDto) {
    try {
      const updatedAsset = await this.assetsService.update(updateAssetDto);
      const createAssetSnapshotDto: any =
        this.formatAssetSnapshotDto(updatedAsset);
      await this.assetSnapshotsService.create(createAssetSnapshotDto);
      return updatedAsset;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
