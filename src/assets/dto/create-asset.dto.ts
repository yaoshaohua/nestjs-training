import { IsNotEmpty, IsOptional } from 'class-validator';
import { AssetType } from '../schemas/asset.schema';

export class CreateAssetDto {
  @IsNotEmpty({ message: '素材名称不能为空' })
  name: string;

  @IsNotEmpty({ message: '素材类型不能为空' })
  type: AssetType;

  @IsNotEmpty({ message: '素材内容不能为空' })
  content: string;

  @IsNotEmpty({ message: '素材标签不能为空' })
  categories: string[];

  @IsOptional()
  projectIdList: string[];

  @IsNotEmpty({ message: '创建人不能为空' })
  creator: string;

  @IsNotEmpty({ message: '更新人不能为空' })
  updater: string;
}
