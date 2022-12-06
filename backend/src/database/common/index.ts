import { Types } from "mongoose";

const generateUuid = () => new Types.ObjectId();

export default generateUuid;
