const fs = require("fs");
const path = require("path");

const APP_DIR = "/var/www/workout-federation.ru";
const ENV_PATH = path.join(APP_DIR, ".env");

const loadEnvFile = (filePath) => {
  if (!fs.existsSync(filePath)) {
    return;
  }

  for (const line of fs.readFileSync(filePath, "utf8").split("\n")) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmed.indexOf("=");

    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex);
    let value = trimmed.slice(separatorIndex + 1);

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
};

loadEnvFile(ENV_PATH);

/** @type {import("pm2").StartOptions} */
module.exports = {
  apps: [
    {
      name: "workout-federation",
      cwd: path.join(APP_DIR, ".next/standalone"),
      script: "server.js",
      env: {
        NODE_ENV: "production",
        PORT: Number(process.env.PORT) || 3001,
        HOSTNAME: "127.0.0.1",
        TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN || "",
        TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID || "",
        NEXT_PUBLIC_SITE_URL:
          process.env.NEXT_PUBLIC_SITE_URL || "https://workout-federation.ru",
        NEXT_PUBLIC_YANDEX_MAPS_API_KEY:
          process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY || "",
        NEXT_PUBLIC_NO_INDEX: process.env.NEXT_PUBLIC_NO_INDEX || "",
      },
    },
  ],
};
