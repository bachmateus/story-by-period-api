import { Controller, Get, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";

import ListAllUsersService from "./list-all-users.service";

@Controller('users')
export class ListAllUsersController {
  constructor(
    private listAllUsersService: ListAllUsersService
  ) {}

  @Get()
  async handle(
    @Req() request: Request,
    @Res() response: Response
  ){
    try {
      const users = await this.listAllUsersService.execute();
      
      return response.status(200).json(users);
    } catch (e){
      return response.status(400).json({error:e.message});
    }
  }
}