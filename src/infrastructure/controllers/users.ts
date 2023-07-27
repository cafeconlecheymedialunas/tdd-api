import { Request, Response } from 'express';
import { response } from '../utils';

const usersController = (req: Request, res: Response): void => {
  return response(res, 200, { route: '/users', method: 'GET' });
};

export default usersController;
