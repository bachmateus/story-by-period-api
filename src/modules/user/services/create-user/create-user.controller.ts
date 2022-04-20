import { Body, Controller, Post } from '@nestjs/common';
import User from '../../model/user.entity';
import CreateUserService from './create-user.service';
// import { CreateUserService } from './_old_create-user.service';

interface IRequest {
  name: string
  email:string
}

@Controller('create-user')
export class CreateUserController {
  constructor(
    private createUserService: CreateUserService
  ){}
  
  @Post()
  async handle(@Body() { name, email }: IRequest) {
    return await this.createUserService.execute()
    // try {
      
    //   const user = new User();
  
    //   Object.assign(user, {
    //     name, email
    //   });
  
    //   const createdUser = await this.createUserService.execute(user);

    //   return createdUser;
    // } catch (e) {
    //   throw e;
    // }
  }
}
