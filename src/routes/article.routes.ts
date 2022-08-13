import express from "express";
import slugify from "slugify";
import { Service } from "typedi";
import { Article } from "../entities/article.entity";
import { Route } from "../types/application";

const createHandlers = [
  async function (req: express.Request, result: any) {
    const data = req?.body;

    return {
      data,
      time: 1
    }
  },
  async (req: express.Request, result: any) => {
    return {
      ...result,
      time: result?.time + 1
    }
  },
  async (req: express.Request, result: any) => {
    return {
      ...result,
      time: result?.time + 1
    }
  },
  async (req: express.Request, result: any) => {
    return {
      ...result,
      time: result?.time + 1
    }
  },
];

const getDetailHandlers = [
  async (req: express.Request, result: any) => {
    const slug = req.params?.slug;

    const article = await Article.findOne({ slug: slug });

    return article;
  },
];

const getAllHandlers = [
  async (req: express.Request, result: any) => {
    const articles = await Article.find({});

    return articles;
  },
];

const updateHandlers = [
  async (req: express.Request, result: any) => {
    const body = req.body;

    if (body.title) {
      body.slug = slugify(body.title, { lower: true, strict: true });
    }

    return {}
  },
  async (req: express.Request, res: express.Response) => {
    const id = req.params?.id;

    const article = await Article.findOneAndUpdate({ _id: id }, req.body, {
      runValidators: true,
      new: true,
    });

    return article;
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
