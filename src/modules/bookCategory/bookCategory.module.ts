import { Module } from "@nestjs/common";
import { Connection } from "typeorm";

import { DatabaseModule } from "../../database/database.module";
import BookCategory from "./model/bookCategory.entity";
import MySqlBookCategoryRepository from "./repositories/implementations/MySqlBookCategoryRepository";
import { CreateBookCategoryController } from "./services/create-book-category/create-book-category.controller";


@Module({
  imports: [ DatabaseModule],
  controllers: [ 
    CreateBookCategoryController
  ],
  providers: [
    {
      provide: 'BOOK_CATEGORY_ENTITY',
      useFactory: (connection: Connection) => connection.getRepository(BookCategory),
      inject: ['DATABASE_CONNECTION']
    },
    {
      provide: 'BOOK_CATEGORY_REPOSITORY',
      useClass: MySqlBookCategoryRepository
    }
  ]
})
export class BookCategoryModule {}