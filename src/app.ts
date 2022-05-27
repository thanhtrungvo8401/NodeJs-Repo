import 'reflect-metadata';
import express from "express";

// Services:
import { DBMongo } from "./services/db-mongo";

// Types:
import { ApplicationOptions, AppService } from './types';
import Container from 'typedi';
class Application {
    constructor(private app: Express.Application, private options: ApplicationOptions) {}

    async start() {
        await this.installService();
    }

    private async installService() {
        for (const Service of this.options.services) {
            await (Container.get(Service) as AppService).install();
            console.log(`${Service.name} installed successfully`);
        }
    }
}

const app = new Application(express(), { port: 8080, services: [DBMongo] });

app.start();
