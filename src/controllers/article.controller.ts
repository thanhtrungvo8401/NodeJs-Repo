import express from "express";
import { ArticleService } from "../services/articles.service";

export class ArticleController {
    static async createArticle(req: express.Request, result: any = {}) {
        const article = req?.body;

        return article;
    }

    static async getArticle(req: express.Request, result: any = {}) {
        return await ArticleService.getArticles();
    }
}