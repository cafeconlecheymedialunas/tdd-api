import { Request, Response } from 'express';
import { response } from '../utils';

export default function pruebaController(req: Request, res: Response): void {
  return response(res, 200, { name: 'Holas' });
}
