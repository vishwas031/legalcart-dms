import { Schema, SchemaDefinition, SchemaOptions } from "mongoose";

class BaseSchema extends Schema {
  BaseFields: SchemaDefinition;
  constructor(definition?: SchemaDefinition, options?: SchemaOptions) {
    super(definition, options);
    this.BaseFields = {
      _id: { type: String, required: true },
      created: { type: Date, required: true },
      updated: { type: Date, required: true },
      deleted: { type: Boolean, required: true },
    };
    this.add(this.BaseFields);
  }
}

class CompanyScopedSchema extends BaseSchema {
  constructor(definition?: SchemaDefinition, options?: SchemaOptions) {
    super(definition, options);
    this.add({ companyId: { type: String, required: true } });
  }
}

export { BaseSchema, CompanyScopedSchema };
