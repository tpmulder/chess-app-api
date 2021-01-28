import mongoose from "mongoose";
import { User } from "./interface";
import uniqueValidator from 'mongoose-unique-validator';
import { Genders } from "../../common/enums";
import { BaseSchema, SchemaModelBase } from "../base/baseSchema";
import { Room } from "../room/interface";
import { Message } from "../message/interface";
import EmailValidator from 'email-validator';
import { UserProviders } from "../../common/constants";

export interface UserModel extends SchemaModelBase<User> {
  rooms: Room[]
  messages: Message[]
}

const userSchema = new BaseSchema({
  provider: {
    type: String, enum: Object.values(UserProviders), required: true, maxlength: 20
  },
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
    type: Number, enum: Object.values(Genders), default: Genders.Unknown
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

userSchema.virtual('invitations', {
  ref: 'Invitation',
  localField: '_id',
  foreignField: 'receiver'
})

userSchema.plugin(uniqueValidator, { message: 'path `{PATH}` is not unique' });

export default mongoose.model<User, UserModel>("User", userSchema);
