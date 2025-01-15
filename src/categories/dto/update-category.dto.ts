import { IsNotEmpty } from 'class-validator';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends CreateCategoryDto {
  @IsNotEmpty({ message: '标签id不能为空' })
  id: string;
}
