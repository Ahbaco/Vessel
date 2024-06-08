import {
  Connection,
  FilterQuery,
  Model,
  PopulateOptions,
  ProjectionType,
  SortOrder,
  Types,
  UpdateQuery,
} from "mongoose";
import { SchemaDocument } from "../schemas/schema";

type StoreOptions<T> = Omit<T, "_id">;

type UpdateOptions<T> = {
  input: UpdateQuery<T>;
  filter: FilterQuery<T>;
};

type AllOptions<T> = {
  filter?: FilterQuery<T>;
  projection?: ProjectionType<T> | null;
};

type AllPopulatedOptions<T> = AllOptions<T> & {
  populate: PopulateOptions;
};

type SortOption<T> = Record<keyof T, SortOrder>;

type PaginatedOptions<T> = {
  filter?: FilterQuery<T>;
  projection?: ProjectionType<T>;
  perPage?: number;
  page?: number;
  sort?: SortOption<T> | null;
};

type FindOneOptions<T> = {
  filter: FilterQuery<T>;
  projection?: ProjectionType<T>;
};

type FindOnePopulatedOptions<T> = FindOneOptions<T> & {
  populate: PopulateOptions;
};

export abstract class Repository<TDoc extends SchemaDocument> {
  constructor(
    protected readonly model: Model<TDoc>,
    private readonly connection: Connection,
  ) {}

  async store(input: StoreOptions<TDoc>): Promise<TDoc> {
    return await this.model.create({
      _id: new Types.ObjectId(),
      ...input,
    });
  }

  async update({ input, filter }: UpdateOptions<TDoc>) {
    return await this.model.findOneAndUpdate(filter, input, { lean: true, new: true });
  }

  async upsert({ input, filter }: UpdateOptions<TDoc>) {
    return await this.model.findOneAndUpdate(filter, input, {
      lean: true,
      new: true,
      upsert: true,
    });
  }

  async all({ filter = {}, projection = {} }: AllOptions<TDoc>) {
    return await this.model.find(filter, projection, {
      lean: true,
    });
  }

  async allPopulated({ filter = {}, projection = {}, populate }: AllPopulatedOptions<TDoc>) {
    return await this.model.find(filter, projection, { lean: true }).populate(populate);
  }

  async count() {
    return await this.model.countDocuments();
  }

  async paginated({
    filter = {},
    projection = {},
    page = 0,
    perPage = 8,
    sort,
  }: PaginatedOptions<TDoc> = {}) {
    const order = sort ?? { _id: "descending" };

    const [results, count] = await Promise.all([
      this.model
        .find(filter, projection, { lean: true })
        .skip((page - 1) * perPage)
        .limit(perPage)
        .sort(order),
      this.count(),
    ]);

    return {
      total: count,
      perPage,
      page,
      lastPage: Math.ceil(count / perPage),
      results,
    };
  }

  async one({ filter, projection = {} }: FindOneOptions<TDoc>) {
    return await this.model.findOne(filter, projection, { lean: true });
  }

  async onePopulated({ filter, projection = {}, populate }: FindOnePopulatedOptions<TDoc>) {
    return await this.model.findOne(filter, projection, { lean: true }).populate(populate);
  }

  async destroy(filter: FilterQuery<TDoc>) {
    return await this.model.deleteOne(filter);
  }

  async transaction() {
    const session = await this.connection.startSession();
    session.startTransaction();
    return session;
  }
}
