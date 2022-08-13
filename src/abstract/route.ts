import express from "express";

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

    get(path: string, ...handlers: Array<any>) {
        this._route.get(path, this.convertHanders(...handlers));
    }

    post(path: string, ...handlers: Array<express.RequestHandler>) {
        this._route.post(path, this.convertHanders(...handlers));
    }

    put(path: string, ...handlers: Array<express.RequestHandler>) {
        this._route.put(path, this.convertHanders(...handlers));
    }

    patch(path: string, ...handlers: Array<express.RequestHandler>) {
        this._route.patch(path, this.convertHanders(...handlers));
    }

    delete(path: string, ...handlers: Array<express.RequestHandler>) {
        this._route.delete(path, this.convertHanders(...handlers));
    }

    get route() {
        return this._route;
    }


    private convertHanders(...handlers: Array<any>) {
        return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
            try {
                let result: object;

                for (let index = 0; index < handlers.length; index++) {
                    const middleWareFunc = handlers[index];

                    if (typeof middleWareFunc === 'function') {
                        result = await middleWareFunc.call({}, req, result);
                    } else {
                        throw new Error(`Argument number ${index + 1} is not valid`)
                    }
                }

                res.status(200).json({
                    data: result,
                    success: true
                })
            } catch (error) {
                console.log(error);
                next(error);
            }

            next();
        }
    }
}