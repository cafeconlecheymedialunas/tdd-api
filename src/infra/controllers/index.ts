import { Login } from 'core/useCases/Login';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserMock } from 'infra/repositories/UserMock';
import { User as UserEntity } from 'core/entities/User';
import { RoleMock } from 'infra/repositories/RoleMock';
import { PermissionMock } from 'infra/repositories/PermissionMock';
import { Hash } from 'core/services/Hash';
import { JsonWebToken } from 'core/services/JsonWebToken';
import { Validator } from 'core/services/Validator';
import { Mock } from 'infra/repositories/Mock';
import LoginUser from './LoginUser';
import RegisterUser from './RegisterUser';
import { Register } from 'core/useCases/Register';
import { User } from './User';

const loginUser = new LoginUser(
  new Login(
    new UserMock(new Mock<UserEntity>(), new RoleMock(new PermissionMock())),
    new Hash(bcrypt),
    new JsonWebToken(jwt),
    new Validator(),
  ),
);

const registerUser = new RegisterUser(
  new Register(
    new UserMock(new Mock<UserEntity>(), new RoleMock(new PermissionMock())),
    new Hash(bcrypt),
    new Validator(),
  )
);

const userController = new User();

export {
  registerUser,
  loginUser,
  userController
}
