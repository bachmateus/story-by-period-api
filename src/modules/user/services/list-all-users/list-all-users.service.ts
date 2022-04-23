import { Inject, Injectable } from "@nestjs/common";


@Injectable()
export default class ListAllUsers {
  constructor(
    @Inject()
    private userRepository: Reposi
  ){}
}