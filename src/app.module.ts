import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import config from './config/keys'
import { BookModule } from './modules/book/book.module';
import { AuthorModule } from './modules/author/author.module';


@Module({
  imports: [MongooseModule.forRoot(config.mongoURI), BookModule, AuthorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
