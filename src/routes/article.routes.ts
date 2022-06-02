import express from "express";
import { Service } from "typedi";
import { Article } from "../entities/article.entity";
import { Route } from "../types";


const postHandlers = [
    async (req: express.Request, res: express.Response) => {
        const article = new Article(req.body);
        
        article.createdAt = new Date();

        await article.save();

        res.json({ success: true, data: article });
    }
]

const getAllHandlers = [
    async (req: express.Request, res: express.Response) => {
        const articles = await Article.find({});
        
        res.json({ success: true, data: articles })
    }
]


@Service()
export class ArticleRoutes extends Route {
    configuration(): void {
        this.get('/', ...getAllHandlers);
        this.post('/', ...postHandlers);
    }
}