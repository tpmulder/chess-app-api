import Mongoose from "mongoose";
import { error_messages, http_status_codes } from "../../common/enums";
import { ApiError, NotFoundError } from "../../common/errors";
import { MongoRepository } from "../../repositories/base/mongoRepositoryBase";
import PaginationParams from "../../utils/pagination/paginationParams";
import PaginationResult from "../../utils/pagination/paginationResult";

export interface ApiService<T> {
  getAll(params: PaginationParams): Promise<PaginationResult>;
  getById(id: string, includes?: string, selects?: string): Promise<T>;
  create(item: T): Promise<T>;
  update(id: string, item: T): Promise<T>;
  delete(id: string): Promise<T>;
}

export default abstract class ServiceBase<T extends Mongoose.Document> implements ApiService<T> {
  private readonly repository: MongoRepository<T>;

  constructor(repository: MongoRepository<T>) {
    this.repository = repository;
  }

  async getAll(params: PaginationParams): Promise<PaginationResult> {
    return await this.repository.getAll(params);
  }

  async getById(id: string, includes?: string, selects?: string): Promise<T> {
    return await this.repository.getById(id, includes, selects);
  }

  async create(item: Partial<T>): Promise<T> {
    return await this.repository.create(item as T);
  }

  async update(id: string, item: Partial<T>): Promise<T> {
    return await this.repository.update(id, item as T);
  }

  async delete(id: string): Promise<T> {
    return await this.repository.delete(id);
  }
}