import { existsSync, mkdirSync } from "fs";
import { basename, join } from "path";
import winston from "winston";
import WinstonDaily from "winston-daily-rotate-file";

// logs dir
const logDir = "src/logger";

if (!existsSync(logDir)) {
  mkdirSync(logDir);
}

const fileLogFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.label({
    label: basename(require?.main?.filename || "server"),
  }),
  winston.format.metadata({
    fillExcept: ["message", "level", "timestamp", "label"],
  }),
  winston.format.json()
);

export const consoleLogFormat = winston.format.combine(
  winston.format.splat(),
  winston.format.colorize(),
  winston.format.printf(({ timestamp, level, message, label }: any) => {
    return `${timestamp} ${level} [${label}]: ${message}`;
  })
);

const customLevels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
  verbose: 4,
  silly: 5,
  ok: 6, // Add any custom level you need
};

// Define colors for custom log levels
const customColors = {
  error: "red",
  warn: "yellow",
  info: "green",
  debug: "magenta",
  verbose: "cyan",
  silly: "gray",
  ok: "blue", // Add color for custom level
};

winston.addColors(customColors);

export const logger = winston.createLogger({
  level: "verbose", // Minimum level to log
  levels: customLevels,
  format: fileLogFormat,
  transports: [
    // debug log setting
    new WinstonDaily({
      level: "debug",
      datePattern: "YYYY-MM-DD",
      dirname: `${logDir}/debug`, // log file /logs/debug/*.log in save
      filename: "%DATE%.log",
      maxFiles: 30, // 30 Days saved

      zippedArchive: true,
    }),
    // error log setting
    new WinstonDaily({
      level: "error",
      datePattern: "YYYY-MM-DD",
      dirname: `${logDir}/error`, // log file /logs/error/*.log in save
      filename: "%DATE%.log",
      maxFiles: 30, // 30 Days saved
      handleExceptions: true,

      zippedArchive: true,
    }),
  ],
});

logger.add(
  new winston.transports.Console({
    format: consoleLogFormat,
  })
);

export const stream = {
  write: (message: string) => {
    logger.info(message.substring(0, message.lastIndexOf("\n")));
    logger.verbose(message.substring(0, message.lastIndexOf("\n")));
  },
};

export const configData = Object.freeze({
  // Default timer=>5 minutes
  defaultTimer: 300000,
  // At least schedule time
  atLeastTimer: 120000,
  // default undo time
  default_undo_time: 5000,
});
