import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AssetSnapshotsService } from './asset-snapshots.service';
import { AssetSnapshotsController } from './asset-snapshots.controller';
import {
  AssetSnapshot,
  AssetSnapshotSchema,
} from './schemas/asset-snapshot.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AssetSnapshot.name, schema: AssetSnapshotSchema },
    ]),
  ],
  controllers: [AssetSnapshotsController],
  providers: [AssetSnapshotsService],
  exports: [AssetSnapshotsService],
})
export class AssetSnapshotsModule {}
