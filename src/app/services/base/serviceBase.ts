import Mongoose from "mongoose";
import { IRepository } from "../../repositories/base/repositoryBase";

export default abstract class ServiceBase<T extends Mongoose.Document> {
  private readonly _repository: IRepository<T>;

  constructor(repository: IRepository<T>) {
    this._repository = repository;
  }

  async create(item: T): Promise<any> {
    return await this._repository.create(item);
  }

  async getAll(): Promise<T[]> {
    return await this._repository.getAll();
  }

  async update(id: string, item: T): Promise<any> {
    return await this._repository.update(id, item);
  }

  async delete(id: string): Promise<any> {
    return await this._repository.delete(id);
  }

  async getById(id: string): Promise<T | null> {
    return await this._repository.getById(id);
  }
}