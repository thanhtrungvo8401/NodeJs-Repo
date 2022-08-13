import { dbMongo } from "../../configs/db-mongo";
import mongoose, { Mongoose } from "mongoose";
import { Service } from "typedi";
import { AppService } from "../../abstract/app-service";

@Service()
export class DBMongo extends AppService{
    #url: string;

    constructor() {
        super();
        this.#url = dbMongo.url;
    }

    async install(): Promise<Mongoose> {
       return await mongoose.connect(this.#url);
    }
};