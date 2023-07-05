/* The HashPasswordService class implements the HashPasswordServiceInterface and provides methods for
hashing and verifying passwords using the bcrypt library. */
import { HashPasswordServiceInterface } from "../../domain/interfaces/services/HashPasswordServiceInterface";

export class HashPasswordService implements HashPasswordServiceInterface {
    
    readonly bcrypt
    readonly saltRounds
    constructor(bcrypt: any,saltRounds = 10) {
        this.bcrypt = bcrypt
        this.saltRounds = saltRounds
    }

    hash = async (password:string) => {
        try {
        
          const salt = await this.bcrypt.genSalt(this.saltRounds)
    
          return await this.bcrypt.hash(password, salt)
        } catch (error) {
            console.log(error)
          return false
        }
      }

    async verify(password: string, hashedPassword: string): Promise<boolean> {
        return await this.bcrypt.compare(password, hashedPassword);
    }
}