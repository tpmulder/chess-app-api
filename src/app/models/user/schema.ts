import Mongoose, { Model } from "mongoose";
import { User } from "./interface";
import uniqueValidator from 'mongoose-unique-validator';
import { genders } from "../../common/enums";

export interface UserModel extends Model<User> {
}

const userSchema = new Mongoose.Schema({
  displayName: {
    type: String, unique: true, required: true
  },
  email: {
    type: String, unique: true, lowercase: true, trim: true, required: true
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  phoneNumber: {
    type: String
  },
  gender: {
    type: String, enum: Object.values(genders),required: false
  },
  score: {
    type: Number, default: 0
  },
  games: [{
    ref: 'Game',
    type: Mongoose.Schema.Types.ObjectId
  }]
});

userSchema.plugin(uniqueValidator);

export default Mongoose.model<User & UserModel>("User", userSchema);
