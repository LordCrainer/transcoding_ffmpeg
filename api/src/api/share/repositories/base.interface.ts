export interface IWrite<T> {
  create(item: T): Promise<boolean>;
  updateOne(id: string, item: T): Promise<boolean>;
  deleteOne(id: string): Promise<boolean>;
}

export interface IRead<T> {
  find(item: T): Promise<T[]>;
  findOne(id: string): Promise<T>;
}
