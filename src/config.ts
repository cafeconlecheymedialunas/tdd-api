import 'dotenv/config';
export default {
  PORT: parseInt(process.env.PORT ?? '3000'),
  SECRET_KEY: process.env.SECRET_KEY ?? 'SECRET',
  DATABASE_HOST: process.env.DATABSE_HOST ?? 'localhost',
  DATABASE_PORT: parseInt(process.env.DATABASE_PORT ?? '5433'),
  DATABASE_USER: process.env.DATABASE_USER ?? 'postgres',
  DATABASE_NAME: process.env.DATABASE_NAME ?? 'database',
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD ?? '',
};
