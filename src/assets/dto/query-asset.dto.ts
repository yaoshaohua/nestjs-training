import { IsNotEmpty, IsOptional } from 'class-validator';
import { AssetType } from '../schemas/asset.schema';

export class QueryAssetDto {
  @IsOptional()
  name: string;

  @IsOptional()
  type: AssetType;

  @IsOptional()
  categories: string[];

  @IsOptional()
  projectIdList: string[];

  @IsOptional()
  creator: string;

  @IsOptional()
  updater: string;

  @IsNotEmpty()
  pageNum: number;

  @IsNotEmpty()
  pageSize: number;
}
