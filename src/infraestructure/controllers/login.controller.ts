import { Request, Response } from "express";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import { LoginUseCase } from "../../application/useCases/LoginUseCase";
import { UserMockRepository } from "../repositories/UserMockRepository";
import { JsonWebTokenService } from "../../application/services/JsonWebTokenService";
import { HashPasswordService } from "../../application/services/HashPasswordService";
import { HttpCustomResponse } from "../../domain/types/HttpCustomResponse";
const hashPasswordService = new HashPasswordService(bcrypt)
const userRepository = new UserMockRepository();
const loginUseCase = new LoginUseCase(userRepository, hashPasswordService, new JsonWebTokenService(jwt))

export default async function loginController(req: Request, res: Response) {
    const { email, password } = req.body
    const result = await loginUseCase.login(email, password)
    if (result === false) return HttpCustomResponse.forbidden(res, 'Failed to logged in')
    return HttpCustomResponse.ok(res, result, 'User logged in successfully')
}
