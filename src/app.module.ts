import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { AssetsModule } from './assets/assets.module';
import { AssetSnapshotsModule } from './asset-snapshots/asset-snapshots.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1/nest'),
    CategoriesModule,
    AssetsModule,
    AssetSnapshotsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
