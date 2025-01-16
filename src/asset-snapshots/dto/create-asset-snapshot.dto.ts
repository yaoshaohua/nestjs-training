import { IsNotEmpty } from 'class-validator';

export class CreateAssetSnapshotDto {
  @IsNotEmpty()
  assetId: string;

  @IsNotEmpty()
  assetData: any;
}
