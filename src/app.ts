import express from "express";
import { DBMongo } from "./services/db-mongo";

type ApplicationOptions = {
    services: Function[];
    port: Number;
}
class Application {
    constructor(private app: Express.Application, private options: ApplicationOptions) {}

    async start() {
        await this.installService();
    }

    private async installService() {
        for (const Service of this.options.services) {
            console.log(Service.name)
        }
    }
}

const app = new Application(express(), { port: 8080, services: [DBMongo] });

app.start();
