import { IUserProps, KindKeys } from '@modules/users/domain/interface/IUserProps';
import mongoose, { Schema, model } from 'mongoose';

const userSchema = new Schema<IUserProps>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cpf: {
    type: String,
    required: true,
    unique: true,
  },
  pixKeys: [
    {
      type: new mongoose.Schema(
        {
          kind: {
            type: String,
            enum: KindKeys,
          },
          actived: Boolean,
          key: String,
        },
        { timestamps: true }
      )
    }
  ],
  balance: {
    type: Number,
    default: 0,
  }
}, {
  timestamps: true,
});

export const UserModel = model('users', userSchema);
