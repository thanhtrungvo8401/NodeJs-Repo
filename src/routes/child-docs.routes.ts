import express from "express";
import { Service } from "typedi";
import { Route } from "../types";

const router = express.Router();

const handlers = [
    (req: express.Request, res: express.Response) => {
        console.log('Middleware');
    },

    (req: express.Request, res: express.Response) => {
        console.log(req.body)
        res.json(req.body)
    }
]

router.get('/child-docs', ...handlers)
router.post

export default router;

@Service()
export class ChildDocsRoute extends Route {
    configuration(): void {
        this.get('/', ...handlers);
        this.post('/', ...handlers);
    }
}