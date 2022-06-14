import { Connection } from "typeorm";

import Author from "./model/author.entity";
import BookCategory from "./model/bookCategory.entity";

import MySqlAuthorRepository from "./repositories/implementations/MySqlAuthorRepository";
import MySqlBookCategoryRepository from "./repositories/implementations/MySqlBookCategoryRepository";

export const bookProviders = [
  {
    provide: 'MYSQL_AUTHOR_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Author),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'AUTHOR_REPOSITORY',
    useClass: MySqlAuthorRepository
  },
  {
    provide: 'MYSQL_BOOK_CATEGORY_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(BookCategory),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'BOOK_CATEGORY_REPOSITORY',
    useClass: MySqlBookCategoryRepository
  }
]