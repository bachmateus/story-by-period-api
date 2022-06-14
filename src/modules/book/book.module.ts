import { Module } from "@nestjs/common";

import { DatabaseModule } from "../../database/database.module";
import { userProviders } from "../user/user.providers";
import { bookProviders } from "./book.provider";

import { CreateAuthorController } from "./services/create-author/create-author.controller";
import CreateAuthorService from "./services/create-author/create-author.service";
import { CreateBookCategoryController } from "./services/create-book-category/create-book-category.controller";
import CreateBookCategoryService from "./services/create-book-category/create-book-category.service";


@Module({
  imports: [ DatabaseModule],
  controllers: [ 
    CreateAuthorController,
    CreateBookCategoryController 
  ],
  providers: [
    ...bookProviders,
    ...userProviders,
    CreateAuthorService,
    CreateBookCategoryService
  ]
})
export class BookModule {}