import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

import CreateUserService from './create-user.service';

@Controller('create-user')
export class CreateUserController {
  constructor(
    private createUserService: CreateUserService
  ){}
  
  @Post()
  async handle(
    @Req() request: Request,
    @Res() response: Response
  ) {
    try {
      const { name, email, phone, photo } = request.body;
  
      const createdUser = await this.createUserService.execute({
        name, email, phone, photo
      })
  
      return response.status(201).json(createdUser);
    } catch (e) { 
      console.log(e.message)
      return response.status(400).json({error: e.message})
    }
  }
}
