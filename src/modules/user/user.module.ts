import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { CreateUserController } from './services/create-user/create-user.controller';
import CreateUserService from './services/create-user/create-user.service';
import { userProviders } from './user.providers';

@Module({
  imports:[
    DatabaseModule
  ],
  controllers: [
    CreateUserController
  ],
  providers: [
    ...userProviders,
    CreateUserService,
  ]
})
export class UserModule {}
