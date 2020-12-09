import mongoose from "mongoose";
import Mongoose from "mongoose";
import { FilterQuery } from "mongoose";
import paginationPlugin from 'mongoose-paginate-v2';

type paginateOptions = {
    page: number
    limit: number
    customLabels?: any
    select?: string
    populate?: string
    sort?: Record<string, number>
}

export default class BaseSchema extends Mongoose.Schema {
    constructor(definition?: Mongoose.SchemaDefinition, options?: Mongoose.SchemaOptions) {
        super(definition, options);
        
        this.plugin(paginationPlugin);
    }
}

export interface SchemaModelBase<T extends mongoose.Document> extends mongoose.Model<T> {
    paginate: (query: FilterQuery<T>, options: paginateOptions) => any
}