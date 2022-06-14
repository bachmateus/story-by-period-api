import { Inject, Injectable } from "@nestjs/common";

import BookCategory from "../../model/bookCategory.entity";
import IBookCategoryRepository from "../../repositories/IBookCategoryRepository";

interface IRequest {
  name: string
  description?: string
}

@Injectable()
export default class CreateBookCategoryService {
  constructor(
    @Inject('BOOK_CATEGORY_REPOSITORY')
    private bookCategoryRepository: IBookCategoryRepository
  ){}

  async execute({name, description} : IRequest) {
    const bookCategory = new BookCategory();
    Object.assign(bookCategory, {name, description});

    const response = await this.bookCategoryRepository.create(bookCategory)

    bookCategory.id = response;

    return bookCategory;
  }
}