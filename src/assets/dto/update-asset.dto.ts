import { IsNotEmpty } from 'class-validator';
import { CreateAssetDto } from './create-asset.dto';

export class UpdateAssetDto extends CreateAssetDto {
  @IsNotEmpty({ message: 'id不能为空' })
  id: string;
}
