import { Controller, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import CreateAuthorService from "./create-author.service";


@Controller('authors')
export class CreateAuthorController {
  constructor(
    private createAuthorService: CreateAuthorService
  ) {}

  @Post()
  async handle(
    @Req() request:Request,
    @Res() response:Response
  ) {
    try {
      const { user, description } = request.body;

      const createdAuthorId = await this.createAuthorService.execute({
        user, description
      })

      return response.status(201).json(createdAuthorId);

    } catch (e) {
      return response.status(400).json({error: e.message})
    }
  }
}