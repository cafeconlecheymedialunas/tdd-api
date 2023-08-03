import { Request, Response } from 'express';
import { response } from '../utils';

const users = (req: Request, res: Response): void => {
  return response(res, 200, { route: '/users', method: 'GET' });
};

export default users;
