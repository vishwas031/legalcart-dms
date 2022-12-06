import { Document } from "mongoose";
import Express from "express";

export interface IBaseModel extends Document {
  _id: string;
  created: Date;
  updated: Date;
  deleted: boolean;
}

export interface ICompanyScopedMdoel extends IBaseModel {
  companyId: string;
}

export interface BaseRequest<T> extends Express.Request {
  body: T;
}
