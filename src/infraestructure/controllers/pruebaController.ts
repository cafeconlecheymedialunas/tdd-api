import { Request, Response } from 'express';
import { response } from '../utils';

const pruebaController = (req: Request, res: Response): void => {
  return response(res, 200, { name: 'Holas' });
};

export default pruebaController;
