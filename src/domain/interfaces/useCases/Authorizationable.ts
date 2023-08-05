import { Request } from "express";

export interface Authorizationable {
  authorize(req: Request): Promise<boolean>;
}
