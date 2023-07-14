import { Request, Response } from "express";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import { LoginUseCase } from "../../application/useCases/LoginUseCase";
import { UserMockRepository } from "../repositories/UserMockRepository";
import { JsonWebTokenService } from "../../application/services/JsonWebTokenService";
import { HashPasswordService } from "../../application/services/HashPasswordService";
import { ClientError, response } from "../utils";
import { UserDtoMapper } from "../../application/datamappers/UserDtoMapper";
import { RoleMockRepository } from "../repositories/RoleMockRepository";
import { RoleDtoMapper } from "../../application/datamappers/RoleDtoMapper";
import { PermissionMockRepository } from "../repositories/PermissionMockRepository";
import { PermissionDtoMapper } from "../../application/datamappers/PermissionDtoMapper";

const hashPasswordService = new HashPasswordService(bcrypt)
const userRepository = new UserMockRepository(new UserDtoMapper(new RoleMockRepository(new RoleDtoMapper(new PermissionMockRepository(new PermissionDtoMapper)))));
const loginUseCase = new LoginUseCase(userRepository, hashPasswordService, new JsonWebTokenService(jwt))

export default async function loginController(req: Request, res: Response) {
    const { email, password } = req.body
    const result = await loginUseCase.login(email, password)

    if (!result) throw new ClientError("Invalid ID", 400);
    return response(res, 200, result);

}
