import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { AssetsModule } from './assets/assets.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    CategoriesModule,
    AssetsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
