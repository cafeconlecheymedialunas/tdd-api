import LoginUser from './LoginUser';
import RegisterUser from './RegisterUser';
import { User } from './User';

const loginUser = new LoginUser();

const registerUser = new RegisterUser();

const userController = new User();

export { registerUser, loginUser, userController };
