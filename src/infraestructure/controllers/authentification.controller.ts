import { Request, Response } from "express";

import { RegisterUserUseCase } from "../../application/useCases/RegisterUserUseCase";
import { LoginUseCase } from "../../application/useCases/LoginUseCase";
import { UserMockRepository } from "../../domain/repositories/UserMockRepository";
import { JsonWebTokenService } from "../../application/services/JsonWebTokenService";
import { HashPasswordService } from "../../application/services/HashPasswordService";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import { HttpCustomResponse } from "../../domain/types/HttpCustomResponse";

const hashPasswordService = new HashPasswordService(bcrypt)
const userMockRepository = new UserMockRepository();
const loginUseCase= new LoginUseCase(userMockRepository,hashPasswordService , new JsonWebTokenService(jwt))
const registerUseCase = new RegisterUserUseCase(userMockRepository, hashPasswordService)

const loginController = async (req: Request, res: Response) => {
    const { email, password } = req.body
    const result = await loginUseCase.login(email, password)
    if (result === false) return HttpCustomResponse.forbidden(res, 'Failed to logged in')
    return HttpCustomResponse.ok(res,result,'User logged in successfully')

};

const registerController = async (req: Request, res: Response): Promise<Response> => {
    const { name, email, password,roles } = req.body
    const result = await registerUseCase.register({ name, email, password,roles })
    if (result === false) return HttpCustomResponse.forbidden(res, 'Failed to register user')
    return HttpCustomResponse.ok(res,result,'User registered successfully')
}
const pruebaController = (req: Request, res: Response) => {
res.send('Holas')
}
export { loginController, registerController,pruebaController };