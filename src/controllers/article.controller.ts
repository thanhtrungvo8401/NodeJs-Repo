import express from "express";

export class ArticleController {
    static async createArticle(req: express.Request, result: any = {}) {
        const article = req?.body;

        return article;
    }

    static async getArticle(req: express.Request, result: any = {}) {
        return "GET"
    }
}