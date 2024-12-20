import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  POSTGRES_DB_NAME: string;
  POSTGRES_PORT: number;
  POSTGRES_USERNAME: string;
  POSTGRES_PASSWORD: string;
  PGADMIN_NAME: string;
  POSTGRES_HOST: string;
  NATS_SERVERS: string[];
}

const envVarsSchema = joi
  .object({
    PORT: joi.number().required(),
    POSTGRES_DB_NAME: joi.string().required(),
    POSTGRES_PORT: joi.number().required(),
    POSTGRES_USERNAME: joi.string().required(),
    POSTGRES_PASSWORD: joi.string().required(),
    PGADMIN_NAME: joi.string().required(),
    PGADMIN_EMAIL: joi.string().required(),
    PGADMIN_PASSWORD: joi.string().required(),
    POSTGRES_HOST: joi.string().required(),
    NATS_SERVERS: joi.array().items(joi.string()).required(),
  })
  .unknown(true);

const { error, value } = envVarsSchema.validate({
  ...process.env,
  NATS_SERVERS: process.env.NATS_SERVERS?.split(','),
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  database: {
    name: envVars.POSTGRES_DB_NAME,
    port: envVars.POSTGRES_PORT,
    username: envVars.POSTGRES_USERNAME,
    password: envVars.POSTGRES_PASSWORD,
    host: envVars.POSTGRES_HOST,
  },
  natsServers: envVars.NATS_SERVERS,
};
