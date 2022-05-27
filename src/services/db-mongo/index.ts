import { dbMongo } from "../../configs/db-mongo";
import mongoose, { Mongoose } from "mongoose";

export class DBMongo {
    #url: string;

    constructor() {
        this.#url = dbMongo.url;
    }

    async install(): Promise<Mongoose> {
       return await mongoose.connect(this.#url);
    }
};