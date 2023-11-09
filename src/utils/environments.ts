import 'dotenv/config';
import { z } from 'zod';

const typeormConfigSchema = z.object({
  DB_HOSTNAME: z.string().min(1),
  DB_PORT: z.string().min(1),
  DB_USER_NAME: z.string().min(1),
  DB_PASSWORD: z.string().min(1),
  DB_NAME: z.string().min(1),
});

const expressSchema = z.object({
  PORT: z.string().min(1),
});

const jwtSchema = z.object({
  JWT_KEY: z.string().min(1),
  EXPIRATION_TIME: z.string().min(1),
});

export const dbEnv = typeormConfigSchema.parse(process.env);
export const expressEnv = expressSchema.parse(process.env);
export const jwtEnv = jwtSchema.parse(process.env);
