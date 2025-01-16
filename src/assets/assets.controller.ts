import {
  Controller,
  Get,
  Post,
  Body,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { AssetsService } from './assets.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { QueryAssetDto } from './dto/query-asset.dto';

@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Post('create')
  async create(@Body() createAssetDto: CreateAssetDto) {
    try {
      return await this.assetsService.create(createAssetDto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('list')
  findAll(@Body() queryAssetDto: QueryAssetDto) {
    return this.assetsService.findAll(queryAssetDto);
  }

  @Post('update')
  async update(@Body() updateAssetDto: UpdateAssetDto) {
    try {
      return await this.assetsService.update(updateAssetDto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
