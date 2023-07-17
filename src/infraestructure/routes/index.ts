import { Router } from 'express';

import { readdirSync } from 'fs';

const PATH_ROUTER = `${__dirname}`;

const router = Router();

const cleanFileName = (fileName: string) => {
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
});

export default router;
