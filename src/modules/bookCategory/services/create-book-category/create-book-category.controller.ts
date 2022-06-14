import { Controller, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";

import CreateBookCategoryService from "./create-book-category.service";

@Controller('categories')
export class CreateBookCategoryController {
  constructor(
    private createBookCategoryService: CreateBookCategoryService
  ){}

  @Post()
  async handle(
    @Req() request: Request,
    @Res() response: Response
  ) {
    try {
      const name = "Category test";
      const description = "This is a test";

      const respCreated = await this.createBookCategoryService.execute({name, description});

      return response.status(201).json(respCreated);

    } catch (e) {
      return response.status(400).json({error: e.message})
    }
  }
}