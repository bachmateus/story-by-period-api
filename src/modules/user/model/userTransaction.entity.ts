import { v4 as uuidV4 } from "uuid";

export default class UserTransaction {
  id?: string
  userId: number
  value: number
  transactionKey: string

  constructor() {
    if (!this.id)
      this.id = uuidV4();
  }
}