import { Controller, Get, Param } from '@nestjs/common';
import { AssetSnapshotsService } from './asset-snapshots.service';

@Controller('asset-snapshots')
export class AssetSnapshotsController {
  constructor(private readonly assetSnapshotsService: AssetSnapshotsService) {}

  @Get(':assetId')
  async findByAssetId(@Param('assetId') assetId: string) {
    const assetSnapshots =
      await this.assetSnapshotsService.findByAssetId(assetId);
    return assetSnapshots.map((v) => v.assetData);
  }
}
