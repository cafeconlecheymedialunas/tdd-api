import { HashPasswordUseCaseInterface } from "../domain/interfaces/useCases/HashPasswordUseCaseInterface";

export class HashPasswordUseCase implements HashPasswordUseCaseInterface {
    bcrypt
    constructor(bcrypt){
        this.bcrypt = bcrypt
    }
    hash(password:string):Promise<string>{
        return const match = await bcrypt.hash(password);
    }

    verify(password:string,hashedPassword:string):Promise<string>{
        return const match = await bcrypt.compare(password, hashedPassword);
    }
}