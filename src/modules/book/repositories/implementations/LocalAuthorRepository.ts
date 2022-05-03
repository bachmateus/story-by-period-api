import { Injectable } from "@nestjs/common";
import Author from "../../model/author.entity";
import IAuthorRepository, { DTOAuthorResponse } from "../IAuthorRepository";

@Injectable()
export default class LocalAuthorRepository implements IAuthorRepository {
  private authors: Author[] = [];
  
  create(author: Author): Promise<number> {
    this.authors.push(author);

    return new Promise((resolve)=>{
      resolve(Math.random() * (1000000000 - 1) + 1);
    });
  }
  update(user: Author): Promise<Author> {
    throw new Error("Method not implemented.");
  }
  
  getById(id: number): Promise<Author> {
    throw new Error("Method not implemented.");
  }

  getByUserId(id: number): Promise<Author> {
    const author = this.authors.find(author => author.user.id === id)
    return new Promise((resolve)=>{
      resolve(author);
    });
  }

  listAll(): Promise<Author[]> {
    throw new Error("Method not implemented.");
  }
  
}