import LoginUser from './LoginUser';
import { Permission } from './Permission';
import RegisterUser from './RegisterUser';
import { Role } from './Role';
import { User } from './User';

const loginUser = new LoginUser();

const registerUser = new RegisterUser();

const userController = new User();

const roleController = new Role()

const permissionController = new Permission()

export { registerUser, loginUser, userController ,roleController,permissionController};
