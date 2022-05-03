import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './modules/book/book.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    UserModule, 
    BookModule,
    ConfigModule.forRoot({
      envFilePath: ['.env/production.env'],
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
