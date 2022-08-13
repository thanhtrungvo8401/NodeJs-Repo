import { ArticleModel } from "../models/article.model";

export class ArticleService {
    static async getArticles() {
        const articles = await ArticleModel.find({});

        return articles;
    }
}