import * as express from "express";
import * as morgan from "morgan";
import * as session from "express-session";
import * as cors from "cors";
import * as cookieParser from "cookie-parser";
import * as passport from "passport";
import { Express } from "express";
import apiRouter from "../api";

export const loadApp = (app: Express) => {
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    }),
  );
  app.use(cookieParser(process.env.COOKIE_SECRET));
  app.use(
    session({
      resave: true,
      saveUninitialized: false,
      secret: String(process.env.COOKIE_SECRET),
      cookie: {
        httpOnly: true,
        secure: false,
      },
    }),
  );

  app.use(express.static("src/public"));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(
    cors({
      origin: true,
      credentials: true,
    }),
  );
  app.use(morgan("dev"));
  app.use("/uploads", express.static("uploads"));
  app.use("/api", apiRouter);
  app.get("/mafia", (req, res, next) => {
    res.sendFile(__dirname + "mafia.htm");
  });
};
