import { Request, Response } from "express";
import bcrypt from "bcrypt"
import { RegisterUserUseCase } from "../../application/useCases/RegisterUserUseCase";
import { UserMockRepository } from "../repositories/UserMockRepository";
import { HashPasswordService } from "../../application/services/HashPasswordService";
import { ClientError, response } from "../utils";
const hashPasswordService = new HashPasswordService(bcrypt)
const userRepository = new UserMockRepository();
const registerUseCase = new RegisterUserUseCase(userRepository, hashPasswordService)
export default async function registerController(req: Request, res: Response): Promise<void> {

    const { name, email, password, roles } = req.body
    const result = await registerUseCase.register({ name, email, password, roles })
    if (!result) throw new ClientError('No se encontro', 400)
    return response(res, 200, result);
}
