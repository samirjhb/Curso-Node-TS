import "reflect-metadata";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { UserRouter } from "./router/user.router";
import { ConfigServer } from "./config/config";
import { DataSource } from "typeorm";

class ServerBoostrap extends ConfigServer {
  public app: express.Application = express();
  private port: number = this.getNumberEnv("PORT");

  constructor() {
    super();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.dbConnect();
    this.app.use(morgan("dev"));
    this.app.use(cors());

    this.app.use("/api", this.routers());
    this.listen();
  }

  routers(): Array<express.Router> {
    return [new UserRouter().router];
  }

  async dbConnect(): Promise<DataSource | void> {
    return this.initConnect
      .then(() => {
        console.log("Connect Success");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log("Server listening on port => " + this.port);
    });
  }
}
new ServerBoostrap();
