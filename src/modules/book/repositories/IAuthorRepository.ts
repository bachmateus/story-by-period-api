import User from "../../user/model/user.entity";
import Author from "../model/author.entity";

export interface DTOAuthorResponse {
  id: number
  description: string
  userData: User
}

export default interface IAuthorRepository {
  create(author:Author): Promise<number>
  update(user:Author): Promise<Author>
  getById(id:number): Promise<Author>
  getByUserId(id:number): Promise<Author>
  listAll(): Promise<Author[]>
}