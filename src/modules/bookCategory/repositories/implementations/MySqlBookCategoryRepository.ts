import { Inject } from "@nestjs/common";
import { Repository } from "typeorm";

import BookCategory from "../../model/bookCategory.entity";
import bookCategoryEntity from "../../model/bookCategory.entity";
import IBookCategoryRepository from "../IBookCategoryRepository";

export default class MySqlBookCategoryRepository implements IBookCategoryRepository {
  constructor(
    @Inject('BOOK_CATEGORY_REPOSITORY') 
    private bookCategoryRepository: Repository<BookCategory>
  ){}

  async create(bookCategory: bookCategoryEntity): Promise<number> {
    const response = await this.bookCategoryRepository.insert(bookCategory);

    return response.raw.insertId;
  }
  async update(bookCategory: bookCategoryEntity): Promise<boolean> {
    try {
      const response = await this.bookCategoryRepository.save(bookCategory);
      return true
    } catch {
      return false
    }
    
  }
  async delete(categoryId: number) {
    const response = await this.bookCategoryRepository.softDelete(categoryId);
    return response;
  }
  async getById(id: number): Promise<bookCategoryEntity> {
    const category = await this.bookCategoryRepository.findOneBy({id}); 
  
    return category;
  }
  async listAll(): Promise<bookCategoryEntity[]> {
    const categories = await this.bookCategoryRepository.find(); 

    return categories;
  }
}