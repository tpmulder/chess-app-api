import Mongoose from "mongoose";
import { http_status_codes } from "../../common/enums";
import { ApiError, InvalidParametersError, NotFoundError, ValidationError } from "../../common/errors";
import { SchemaModelBase } from "../../models/base/baseSchema";
import PaginationParams from "../../utils/pagination/paginationParams";
import PaginationResult from "../../utils/pagination/paginationResult";

export interface MongoRepository<T extends Mongoose.Document> {
  getAll(params: PaginationParams): Promise<PaginationResult>;
  getById(id: string, includes?: string, selects?: string): Promise<T>;
  create(item: Partial<T>): Promise<T>;
  update(id: string, item: Partial<T>): Promise<T>;
  delete(id: string): Promise<T>;
}

export abstract class RepositoryBase<T extends Mongoose.Document> implements MongoRepository<T> {
  private readonly schemaModel: SchemaModelBase<Mongoose.Document>

  constructor(schemaModel: SchemaModelBase<Mongoose.Document>) {
    this.schemaModel = schemaModel;
  }

  async getAll (params: PaginationParams): Promise<PaginationResult> {
    const options = { 
      page: params.options.pageNumber, 
      limit: params.options.pageSize,
      populate: params.options.includes,
      select: params.options.selects,
      sort: params.options.sort,
      customLabels: params.options.customLabels
    }

    return await this.operate<PaginationResult>(() => this.schemaModel.paginate(params.searchQuery ? params.searchQuery : {}, options));
  }

  async getById(id: string, includes?: string, selects?: string): Promise<T> {
    const selected = selects ? selects.split(',').join(' ') : undefined
    const included = includes ? includes.split(',').join(' ') : undefined

    return await this.operate<T>(() => this.schemaModel.findById(this.toObjectId(id)).populate(included).select(selected).orFail(new NotFoundError(id)).exec());
  }

  async create(item: Partial<T>): Promise<T> {
    return await this.operate<T>(() => this.schemaModel.create(item as T));
  }

  async update(id: string, item: Partial<T>): Promise<T> {
    return await this.operate<T>(() => this.schemaModel.findByIdAndUpdate(this.toObjectId(id), item).orFail(new NotFoundError(id)).exec());
  }

  async delete(id: string): Promise<T> {
    return await this.operate<T>(() => this.schemaModel.findByIdAndDelete(this.toObjectId(id)).orFail(new NotFoundError(id)).exec());
  }

  protected async operate<TResult>(func: () => any): Promise<TResult> {
    try {
      return <TResult>await func();
    }
    catch (err) {
      if (err.name === 'ValidationError') {
        const errorMessage: string[] = err.message.split(/:(.+)/);

        const message = errorMessage[0];

        const errors = errorMessage[1].split(',').map(e => {
            const m = e.split(':');
            const m2 = m[1].split('`');

            const field = m2[1];
            const prob = m2[2];

            return new ValidationError(m[0], field + prob);
          }
        );
        
        throw new ApiError(http_status_codes.bad_request, message, errors)
      }

      throw err;
    }
  }

  protected toObjectId(id: string): Mongoose.Types.ObjectId {
    try {
      return Mongoose.Types.ObjectId.createFromHexString(id);
    }
    catch (error) {
      throw new InvalidParametersError([new ValidationError('id', 'id is invalid')])
    }
  }
}
