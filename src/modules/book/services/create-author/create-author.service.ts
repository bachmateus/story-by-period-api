import { Inject, Injectable } from "@nestjs/common";
import User from "src/modules/user/model/user.entity";
import IUserRepository from "../../../user/repositories/IUserRepository";
import Author from "../../model/author.entity";
import IAuthorRepository from "../../repositories/IAuthorRepository";

interface IRequest {
  user: User 
  description?: string
}

@Injectable()
export default class CreateAuthorService {
  constructor(
    @Inject('AUTHOR_REPOSITORY')
    private authorRepository: IAuthorRepository,

    @Inject('USER_REPOSITORY')
    private userRepository: IUserRepository
  ){}

  async execute({user, description = ""}: IRequest) {
    if ( !user || (user && !user.id) )
      throw new Error("userId ought to be set");
      
    const userRegistered = await this.userRepository.getById(user.id);
      
    if (!userRegistered)
      throw new Error("userId does not belong to a registered user");
    
    const authorWithSameUserId = await this.authorRepository.getByUserId(user.id);

    if ( authorWithSameUserId )
      throw new Error("This userId belongs to another author");

    const author = new Author();

    Object.assign(author, { user, description });

    const registedAuthorId = await this.authorRepository.create(author);
    author.id = registedAuthorId;
    
    return author;
  }
}