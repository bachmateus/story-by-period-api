import { Inject } from "@nestjs/common";
import { Repository } from "typeorm";
import Author from "../../model/author.entity";
import authorEntity from "../../model/author.entity";
import IAuthorRepository, { DTOAuthorResponse } from "../IAuthorRepository";


export default class MySqlAuthorRepository implements IAuthorRepository {
  constructor(
    @Inject('MYSQL_AUTHOR_REPOSITORY')
    private authorRepository: Repository<Author>
  ){}
 
  async create(author: authorEntity): Promise<number> {
    const response = await this.authorRepository.insert(author)
    return response.raw.insertId;
  }

  update(user: authorEntity): Promise<authorEntity> {
    throw new Error("Method not implemented.");
  }

  getById(id: number): Promise<Author> {
    throw new Error("Method not implemented.");
  }

  getByUserId(id: number): Promise<Author> {
    throw new Error("Method not implemented.");
  }

  listAll(): Promise<Author[]> {
    throw new Error("Method not implemented.");
  }
  
}