import express from "express";
import Container from "typedi";

import { ArticleRoute } from "./article.route";

const articleRoutes = Container.get(ArticleRoute);

export class RoutesConfig {
    static config(app: express.Application) {
        app.use('/articles', articleRoutes.install());
    }
}