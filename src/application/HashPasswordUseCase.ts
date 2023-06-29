import { HashPasswordUseCaseInterface } from "../domain/interfaces/useCases/HashPasswordUseCaseInterface";

export class HashPasswordUseCase implements HashPasswordUseCaseInterface {
    hash(password:string):Promise<string>{
        return password
    }
}