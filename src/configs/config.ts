import dotenv from 'dotenv';

dotenv.config();

interface RAW_ENV {
  STATUS: string | undefined;
  TEST_DB_URL: string | undefined;
  PROD_DB_URL: string | undefined;
  TEST_PORT: string | undefined;
  PROD_PORT: string | undefined;
}

interface Config {
  STATUS: string;
  TEST_DB_URL: string;
  PROD_DB_URL: string;
  TEST_PORT: number;
  PROD_PORT: number;
}

const getRawConfig = (): RAW_ENV => {
  return {
    STATUS: process.env.STATUS,
    TEST_DB_URL: process.env.TEST_DB_URL,
    PROD_DB_URL: process.env.PROD_DB_URL,
    PROD_PORT: process.env.PROD_PORT,
    TEST_PORT: process.env.TEST_PORT,
  };
};

const getConfig = (config: RAW_ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing ${key} in .env`);
    }
  }
  return {
    STATUS: config.STATUS!,
    TEST_DB_URL: config.TEST_DB_URL!,
    PROD_DB_URL: config.PROD_DB_URL!,
    PROD_PORT: parseInt(config.PROD_PORT!),
    TEST_PORT: parseInt(config.TEST_PORT!),
  };
};

const rawEnv = getRawConfig();
const config = getConfig(rawEnv);

export default config;
