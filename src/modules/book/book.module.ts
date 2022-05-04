import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../database/database.module";
import { userProviders } from "../user/user.providers";
import { bookProviders } from "./book.provider";
import { CreateAuthorController } from "./services/create-author/create-author.controller";
import CreateAuthorService from "./services/create-author/create-author.service";


@Module({
  imports: [ DatabaseModule],
  controllers: [ CreateAuthorController ],
  providers: [
    ...bookProviders,
    ...userProviders,
    CreateAuthorService,
  ]
})
export class BookModule {}