import { Request, Response } from "express";
import bcrypt from "bcrypt"
import { RegisterUserUseCase } from "../../application/useCases/RegisterUserUseCase";
import { UserMockRepository } from "../repositories/UserMockRepository";
import { HashPasswordService } from "../../application/services/HashPasswordService";
import { HttpCustomResponse } from "../../domain/types/HttpCustomResponse";
const hashPasswordService = new HashPasswordService(bcrypt)
const userRepository = new UserMockRepository();
const registerUseCase = new RegisterUserUseCase(userRepository, hashPasswordService)
export default async function registerController(req: Request, res: Response): Promise<Response> {
    const { name, email, password, roles } = req.body
    const result = await registerUseCase.register({ name, email, password, roles })
    if (result === false) return HttpCustomResponse.forbidden(res, 'Failed to register user')
    return HttpCustomResponse.ok(res, result, 'User registered successfully')
}
