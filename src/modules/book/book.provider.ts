import { Connection } from "typeorm";
import Author from "./model/author.entity";
import MySqlAuthorRepository from "./repositories/implementations/MySqlAuthorRepository";


export const bookProviders = [
  {
    provide: 'MYSQL_AUTHOR_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Author),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'AUTHOR_REPOSITORY',
    useClass: MySqlAuthorRepository
  }
]