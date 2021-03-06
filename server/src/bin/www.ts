import * as fs from "fs";
import { createApp } from "../app";
import { createServer } from "https";
import { sequelize } from "../db/models";
import { socketInit } from "../webSocket/socket";

export const app = createApp();

const port: number = Number(process.env.PORT) || 4000;

const server = createServer(
  process.env.NODE_ENV === "development"
    ? {
        key: fs.readFileSync(__dirname + "/../../key.pem", "utf-8"),
        cert: fs.readFileSync(__dirname + "/../../cert.pem", "utf-8"),
      }
    : {
        key: fs.readFileSync("/etc/letsencrypt/live/www.cowdogting.kro.kr/privkey.pem", "utf-8"),
        cert: fs.readFileSync("/etc/letsencrypt/live/www.cowdogting.kro.kr/cert.pem", "utf-8"),
      },
  app,
);
socketInit(server, app);

server.listen(port, () => {
  sequelize
    .authenticate()
    .then(() => {
      console.log("connection");
    })
    .catch((err) => {
      console.log("fail: ", err);
    });
});
