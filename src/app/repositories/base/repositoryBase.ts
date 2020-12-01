import mongoose = require("mongoose");

export interface Repository<T extends mongoose.Document> {
  upsert(id: string, item: T): Promise<any>;
  create(item: T): Promise<any>;
  getAll(): Promise<T[]>;
  update(id: string, item: T): Promise<any>;
  delete(id: string): Promise<any>;
  getById(id: string): Promise<T | null>;
}

export abstract class RepositoryBase<T extends mongoose.Document> implements Repository<T> {
  private readonly _schemaModel: mongoose.Model<mongoose.Document>

  constructor(schemaModel: mongoose.Model<mongoose.Document>) {
    this._schemaModel = schemaModel;
  }

  async upsert(id: string, item: T): Promise<any> {
    return await this.operate<any>(() => this._schemaModel.findByIdAndUpdate(this.toObjectId(id), item, { new: true, upsert: true }).exec())
  }

  async create(item: T): Promise<any> {
    return await this.operate<any>(() => this._schemaModel.create(item));
  }

  async getAll (): Promise<T[]> {
    return await this.operate<T[]>(() => this._schemaModel.find({}).exec());
  }

  async update(id: string, item: T): Promise<any> {
    return await this.operate<T>(() => this._schemaModel.findByIdAndUpdate(this.toObjectId(id), item).exec());
  }

  async delete(id: string): Promise<any> {
    return await this.operate<any>(() => this._schemaModel.findByIdAndDelete(this.toObjectId(id)).exec());
  }

  async getById(id: string): Promise<T | null> {
    return await this.operate<T | null>(() => this._schemaModel.findById(this.toObjectId(id)).exec());
  }

  protected async operate<TResult>(func: () => Promise<any>): Promise<TResult> {
    try {
      return <TResult>await func();
    }
    catch(err) {
      throw err;
    }
  }

  protected toObjectId(id: string): mongoose.Types.ObjectId {
    return mongoose.Types.ObjectId.createFromHexString(id);
  }
}
