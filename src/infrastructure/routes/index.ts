import { Router } from 'express';

import { readdirSync } from 'fs';
import { response } from '../utils';

const PATH_ROUTER = `${__dirname}`;

const router = Router();

const cleanFileName = (fileName: string): string => {
  const file = fileName.split('.');

  return file[0];
};

readdirSync(PATH_ROUTER).filter((fileName) => {
  const file = cleanFileName(fileName);

  if (file !== 'index') {
    import(`./${file}`).then((module) => {
      router.use(`/${file}`, module.router);
    });
  }
  router.use(function (req, res) {
    response(res, 404, {
      error: false,
      req
    })
  });
});

export default router;
