
import { Response } from "express"
import { UserUseCase } from "../../application/useCases/UserUseCase"
import { UserMockRepository } from "../repositories/UserMockRepository"

export class UserController {
    private readonly service
    constructor() {
        this.service = new UserUseCase(new UserMockRepository())
    }

    async getUserById(res: Response, id: number): Promise<Response> {
        const user = await this.service.getUserById(id)
        if (user) return res.status(200).json(user)
        if (!user) return res.status(404).json()
        return res.status(404).json()
    }

    async deleteUser(res: Response, id: number): Promise<Response> {
        const response = await this.service.deleteUser(id)
        if (response !== undefined) return res.status(200).json(response)
        else return res.status(404).json()
    }

}