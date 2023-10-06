import * as express from 'express';
export interface PaginatedResult {
  data: any[];
  meta: {
    next?: { page: number; limit: number };
    previous?: { page: number; limit: number };
  };
}
export abstract class BaseController {
  public static jsonResponse(res: express.Response, code: number, message: string) {
    return res.status(code).json({ message });
  }

  public paginate(model: any,req:express.Request): PaginatedResult {
    const result: PaginatedResult = {
      data: [],
      meta: {
        next: undefined,
        previous: undefined,
      }
    };
    if (req.query.page) {
      const page = parseInt(req.query.page as string);
      const limit = parseInt(req.query.limit as string);
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      result.data = model.slice(startIndex, endIndex);
      if (endIndex < model.length) {
        result.meta.next = {
          page: page + 1,
          limit: limit,
        };
      }
      if (startIndex > 0) {
        result.meta.previous = {
          page: page - 1,
          limit: limit,
        };
      }
      return result;
    }

    return result;
  }
}
