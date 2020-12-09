import Mongoose from "mongoose";
import User from "./interface";
import uniqueValidator from 'mongoose-unique-validator';
import { genders } from "../../common/enums";
import BaseSchema, { SchemaModelBase } from "../base/baseSchema";
import { Room } from "../room/interface";
import Message from "../message/interface";
import EmailValidator from 'email-validator';

export interface UserModel extends SchemaModelBase<User> {
  rooms: Room[]
  messages: Message[]
}

const userSchema = new BaseSchema({
  username: {
    type: String, unique: true, required: true, maxlength: 20
  },
  picture: {
    type: String, maxlength: 255
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    validate: {
        validator: EmailValidator.validate,
        message: "Path `{PATH}` is invalid"
    },
    required: true
  },
  firstName: {
    type: String, maxlength: 200
  },
  lastName: {
    type: String, maxlength: 200
  },
  phoneNumber: {
    type: String
  },
  gender: {
    type: String, enum: Object.values(genders), default: genders.unknown
  },
  rating: {
    type: Number, default: 0
  }
}, { toJSON: { virtuals: true } });

userSchema.virtual('rooms', {
  ref: 'Room',
  localField: '_id',
  foreignField: 'users',
});

userSchema.virtual('messages', {
  ref: 'Message',
  localField: '_id',
  foreignField: 'user',
});

userSchema.plugin(uniqueValidator, { message: 'path `{PATH}` is not unique' });

export default Mongoose.model<User, UserModel>("User", userSchema);
