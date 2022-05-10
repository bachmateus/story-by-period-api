import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

import CreateUserService from './create-user.service';

@Controller('users')
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
      return response.status(400).json({error: e.message})
    }
  }
}
