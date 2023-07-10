import { Request, Response } from "express";
export default function pruebaController(req: Request, res: Response) {
    res.send('Holas')
}
export { pruebaController };