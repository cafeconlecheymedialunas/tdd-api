import 'dotenv/config';

export default {
  PORT: Number(process.env.PORT) ?? 3000,
  SECRET_KEY: process.env.SECRET_KEY ?? 'SECRET',
};
