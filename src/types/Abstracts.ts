import express from "express";

export abstract class AppService {
    abstract install(): Promise<any>;
}

export abstract class Route {
    private _route: express.Router;

    constructor() {
        this._route = express.Router();
    }

    install(): express.Router {
        this.configuration();

        return this.route;
    }

    abstract configuration(): void

    get(path: string, ...handlers: Array<express.RequestHandler>) {
        this._route.get(path, ...this.convertHanders(...handlers));
    }

    post(path: string, ...handlers: Array<express.RequestHandler>) {
        this._route.post(path, ...this.convertHanders(...handlers));
    }

    put(path: string, ...handlers: Array<express.RequestHandler>) {
        this._route.put(path, ...this.convertHanders(...handlers));
    }

    patch(path: string, ...handlers: Array<express.RequestHandler>) {
        this._route.patch(path, ...this.convertHanders(...handlers));
    }

    delete(path: string, ...handlers: Array<express.RequestHandler>) {
        this._route.delete(path, ...this.convertHanders(...handlers));
    }

    get route() {
        return this._route;
    }
    

    private convertHanders (...handlers: Array<any>) {
        return [...handlers].map((handler: any) => {
            return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
                try {
                    await handler(req, res);

                } catch (error) {
                    next(error);
                }
                
                next();
            }
        })
    }
}