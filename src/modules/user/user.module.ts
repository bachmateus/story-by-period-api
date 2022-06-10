import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { CreateUserController } from './services/create-user/create-user.controller';
import CreateUserService from './services/create-user/create-user.service';
import { ListAllUsersController } from './services/list-all-users/list-all-users.controller';
import ListAllUsersService from './services/list-all-users/list-all-users.service';
import { userProviders } from './user.providers';

@Module({
  imports:[
    DatabaseModule
  ],
  controllers: [
    CreateUserController,
    ListAllUsersController
  ],
  providers: [
    ...userProviders,
    CreateUserService,
    ListAllUsersService
  ]
})
export class UserModule {}
