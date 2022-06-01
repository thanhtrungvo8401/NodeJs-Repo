import express from "express";
import { Service } from "typedi";
import { Article } from "../entities/article.entity";
import { Route } from "../types";

const handlers = [
    (req: express.Request, res: express.Response) => {
        res.json(req.body)
    }
]

const postHandlers = [
    async (req: express.Request, res: express.Response) => {
        const article = new Article(req.body);
        
        article.createdAt = new Date();

        await article.save();

        res.json({ success: true, data: article });
    }
]


@Service()
export class ArticleRoutes extends Route {
    configuration(): void {
        this.get('/', ...handlers);
        this.post('/', ...postHandlers);
    }
}