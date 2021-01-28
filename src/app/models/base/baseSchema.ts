import mongoose, { FilterQuery } from "mongoose";
import paginationPlugin from 'mongoose-paginate-v2';

type paginateOptions = {
    page: number
    limit: number
    customLabels?: any
    select?: string
    populate?: string
    sort?: Record<string, number>
}

class BaseSchema extends mongoose.Schema { 
    constructor(definition?: mongoose.SchemaDefinition, options?: mongoose.SchemaOptions) {
        super(definition, options);
        
        this.plugin(paginationPlugin);
    }
}

interface SchemaModelBase<T extends mongoose.Document> extends mongoose.Model<T> {
    paginate: (query: FilterQuery<T>, options: paginateOptions) => any
}

export { paginateOptions, BaseSchema, SchemaModelBase }