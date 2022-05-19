import { dbMongo } from "../../configs/db-mongo";
import mongoose from "mongoose";

export class DBMongo {
    #url: string;

    constructor() {
        this.#url = dbMongo.url;
    }

    async install(): Promise<void> {
       await mongoose.connect(this.#url);
        console.log(`${this.constructor.name} installed successfully !!!`);
    }
};