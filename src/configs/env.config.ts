import dotenv from "dotenv";

const ENVIRONMENT = process.env.ENVIRONMENT || "development";
dotenv.config({
  path: ENVIRONMENT ? `.env.${ENVIRONMENT}` : ".env.development",
});

const apiKey = process.env.REACT_APP_MY_API_KEY;

const envObjects = {
  BASE_URL: process.env.BASE_URL,
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL || "",
  NODE_ENV: process.env.NODE_ENV,
  SECRET_KEY: process.env.SECRET_KEY || "",
  FRONT_URL: process.env.FRONT_URL || "",
  CLOUD_NAME: process.env.CLOUD_NAME || "",
  API_KEY: process.env.API_KEY || "",
  API_SECRET: process.env.API_SECRET || "",
};

export const {
  BASE_URL,
  SECRET_KEY,
  PORT,
  DATABASE_URL,
  NODE_ENV,
  FRONT_URL,
  CLOUD_NAME,
  API_KEY,
  API_SECRET,
} = envObjects;
