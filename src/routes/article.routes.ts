import express from "express";
import slugify from "slugify";
import { Service } from "typedi";
import { Article } from "../entities/article.entity";
import { Route } from "../types";

const createHandlers = [
  async (req: express.Request, res: express.Response) => {
    const article = new Article(req.body);

    article.createdAt = new Date();

    await article.save();

    res.json({ success: true, data: article });
  },
];

const getDetailHandlers = [
  async (req: express.Request, res: express.Response) => {
    const slug = req.params?.slug;

    const article = await Article.findOne({ slug: slug });

    res.json({ success: true, data: article });
  },
];

const getAllHandlers = [
  async (req: express.Request, res: express.Response) => {
    const articles = await Article.find({});

    res.json({ success: true, data: articles });
  },
];

const updateHandlers = [
  async (req: express.Request, res: express.Response) => {
    const body = req.body;

    if (body.title) {
      body.slug = slugify(body.title, { lower: true, strict: true });
    }
  },
  async (req: express.Request, res: express.Response) => {
    const id = req.params?.id;

    const article = await Article.findOneAndUpdate({ _id: id }, req.body, {
      runValidators: true,
      new: true,
    });
    res.json({ success: true, data: article });
  },
];

@Service()
export class ArticleRoutes extends Route {
  configuration(): void {
    this.get("/", ...getAllHandlers);
    this.get("/:slug", ...getDetailHandlers);
    this.post("/", ...createHandlers);
    this.put("/:id", ...updateHandlers);
  }
}
