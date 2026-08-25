/** @type {import("pm2").StartOptions} */
module.exports = {
  apps: [
    {
      name: "workout-federation",
      cwd: "/var/www/workout-federation.ru",
      script: "server.js",
      env: {
        NODE_ENV: "production",
        PORT: 3001,
        HOSTNAME: "127.0.0.1",
      },
    },
  ],
};
