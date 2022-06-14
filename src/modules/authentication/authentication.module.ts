import { Module } from '@nestjs/common';
import { LoginController } from './services/login/login/login.controller';

@Module({
  controllers: [LoginController]
})
export class AuthenticationModule {}
