import { IsString, IsNumberString } from 'class-validator';

export class CreateCatDto {
  @IsString()
  name: string;

  @IsNumberString()
  age: number;
  
  @IsString()
  breed: string;
}
