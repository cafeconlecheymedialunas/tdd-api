import { User } from "../domain/entities/User.entity";
import { UserRepositoryInterface } from "../domain/interfaces/repositories/UserRepositoryInterface";

export class UserUseCase {
    private readonly repository: UserRepositoryInterface
    constructor(repository: UserRepositoryInterface) {
        this.repository = repository
    }

    async getUserById(id: number): Promise<User | undefined> {
        const user = await this.repository.getById(id);
        return user
    }

    async deleteUser(id: number): Promise<boolean> {
        const res = await this.repository.delete(id)
        return res
    }

}