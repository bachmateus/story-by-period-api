import { Connection } from "typeorm";
import User from "./model/user.entity";
import MySQLUserRepository from "./repositories/implementarions/MySQLUserRepository";


export const userProviders = [
  {
    provide: 'MYSQL_USER_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(User),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'USER_REPOSITORY',
    useClass: MySQLUserRepository
  }
];