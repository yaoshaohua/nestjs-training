import { IsNotEmpty } from 'class-validator';

export class UpdateCategoryDto {
  @IsNotEmpty({ message: '标签id不能为空' })
  id: string;

  @IsNotEmpty({ message: '标签名称不能为空' })
  name: string;
}
