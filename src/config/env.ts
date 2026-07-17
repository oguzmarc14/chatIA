import "dotenv/config";
import { z } from "zod";

const optionalEnvironmentSchema = z.object({
  PORT: z.coerce.number().int().positive().default(3000),
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  META_APP_SECRET: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.string().min(1).optional(),
  ),
});

const result = optionalEnvironmentSchema.safeParse(process.env);

if (!result.success) {
  throw new Error(`Configuración inválida: ${result.error.message}`);
}

export const env = result.data;

export function requireEnvironment(name: string): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Falta la variable de entorno ${name}`);
  }

  return value;
}
