import { Request, Response } from 'express';
import { response } from '../utils';

export default function pruebaController(req: Request, res: Response) {
  return response(res, 200, {});
};


