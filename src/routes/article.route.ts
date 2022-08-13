import { Service } from "typedi";
import { Route } from "../abstract/route";
import { ArticleController } from "../controllers/article.controller";

@Service()
export class ArticleRoute extends Route {
  configuration(): void {
    this.get("/", ArticleController.getArticle);
    this.post("/", ArticleController.createArticle);
  }
}
