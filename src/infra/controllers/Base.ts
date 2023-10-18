import { Request, Response } from 'express';

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  links: {
    first: string;
    prev: string | null;
    next: string | null;
    last: string
  }
  included: any[]

}

interface Resource {
  type: string;
  id: string;
  attributes: any;
}

export class BaseController {
  constructor() { }

  protected buildResponse(data: any, links: any = {}, meta: any = {}, included: any): any {
    return {
      data,
      links,
      meta,
      included
    };
  }

  private buildResource(data: any): Resource {
    return {
      type: 'articles',  // Reemplaza 'articles' con el tipo de recurso que estás manejando
      id: data.id.toString(),  // Convierte el ID a cadena si es necesario
      attributes: this.buildAttributes(data),  // Coloca los datos del recurso aquí
    };
  }

  private buildData(data: any[]): Resource[] {
    return data.map(item => this.buildResource(item));
  }

  private buildAttributes(data: any): any {
    const attributes: any = {};
    for (const key in data) {
      // Filtra las propiedades que no quieres incluir como atributos
      if (key !== 'id' && key !== 'comments' && key !== 'userId') {
        attributes[key] = data[key];
      }
    }
    return attributes;
  }

  protected handleRequest(req: Request, res: Response, dataGetter: any[]): void {
    try {
      const totalItems = dataGetter.length
      const page = parseInt(req.query.page as string, 10) || 1;
      const limit = parseInt(req.query.limit as string, 10) || 10;
      const totalPages = Math.ceil(totalItems / limit);

      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      const data = this.buildData(dataGetter.slice(startIndex, endIndex));

      const meta: PaginationMeta = {
        page,
        limit,
        total: totalItems,
        totalPages,
        links: {
          first: `/resource?page=1&limit=${limit}`,
          prev: page > 1 ? `/resource?page=${page - 1}&limit=${limit}` : null,
          next: page < totalPages ? `/resource?page=${page + 1}&limit=${limit}` : null,
          last: `/resource?page=${totalPages}&limit=${limit}`
        },
        included: data.reduce((included: any[], item: any) => {
          // Agrega los recursos incluidos según tus relaciones
          if (item.comments && item.comments.length > 0) {
            included = included.concat(item.comments.map((comment: any) => ({
              type: 'comments',
              id: comment.id.toString(),
              attributes: {
                text: comment.text,
              },
            })));
          }

          if (item.userId) {
            included.push({
              type: 'users',
              id: item.userId.toString(),
              attributes: {
                name: 'Nombre del Usuario',  // Obtén el nombre del usuario desde tus datos
              },
            });
          }

          return included;
        }, []),
      };

      const response = this.buildResponse(data, {}, meta, meta.included);
      res.status(200).json(response);
    } catch (error: any) {
      res.status(500).json({
        error: {
          message: error.message,
        },
      });
    }
  }
}
