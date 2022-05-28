import express from "express";
import Container from "typedi";

import { ChildDocsRoute } from "./child-docs.routes";

const childDocs = Container.get(ChildDocsRoute);

export class RoutesConfig {
    static config(app: express.Application) {
        app.use('/child-docs', childDocs.install());
    }
}