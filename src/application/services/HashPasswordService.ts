import { HashPasswordServiceInterface } from "../../domain/interfaces/services/HashPasswordServiceInterface";

export class HashPasswordService implements HashPasswordServiceInterface {
  readonly hashing
  readonly saltRounds
  constructor(hashing: any, saltRounds = 10) {
    this.hashing = hashing
    this.saltRounds = saltRounds
  }

  async hash(password: string) {
    try {
      const salt = await this.hashing.genSalt(this.saltRounds)
      return await this.hashing.hash(password, salt)
    } catch (error) {
      console.log(error)
      return false
    }
  }

  async verify(password: string, hashedPassword: string): Promise<boolean> {
    return await this.hashing.compare(password, hashedPassword);
  }
}