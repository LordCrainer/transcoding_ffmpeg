import { IWrite, IRead } from "./base.interface";

// we imported all types from mongodb driver, to use in code
import { MongoClient, Db, Collection } from "mongodb";

// that class only can be extended
export abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {
  create(item: T): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  updateOne(id: string, item: T): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  deleteOne(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  find(item: T): Promise<T[]> {
    throw new Error("Method not implemented.");
  }
  findOne(id: string): Promise<T> {
    throw new Error("Method not implemented.");
  }
}