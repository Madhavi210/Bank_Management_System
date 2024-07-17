
import { Schema, model } from 'mongoose';
import IAccount from '../interface/account.interface';

const accountSchema = new Schema<IAccount>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    accountType: {
      type: String,
      enum: ['savings', 'checking'],
      required: true,
    },
    balance: {
      type: Number,
      required: true,
      default: 0,
    }
  },
  { timestamps: true }
);

export const Account = model<IAccount>('Account', accountSchema);
