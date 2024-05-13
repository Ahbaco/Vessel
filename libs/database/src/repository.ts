import { Connection, Model, Types } from "mongoose";
import { SchemaDocument } from "./schema";

export abstract class Repository<TDoc extends SchemaDocument> {
  constructor(
    protected readonly model: Model<TDoc>,
    private readonly connection: Connection,
  ) {}

  async create(data: Omit<TDoc, "_id">): Promise<TDoc> {
    return this.model.create({
      _id: new Types.ObjectId(),
      ...data,
    });
  }

  async transaction() {
    const session = await this.connection.startSession();
    session.startTransaction();
    return session;
  }
}
