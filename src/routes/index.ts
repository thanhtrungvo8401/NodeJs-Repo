import express from "express";
import Container from "typedi";

import { ArticleRoutes } from "./articles.route";

const articleRoutes = Container.get(ArticleRoutes);

export class RoutesConfig {
    static config(app: express.Application) {
        app.use('/articles', articleRoutes.install());
    }
}