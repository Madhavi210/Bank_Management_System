import { Schema, model, Document } from 'mongoose';
import { SchemaTypes } from 'mongoose';
import IAccount from '../interface/account.interface';

const accountSchema = new Schema<IAccount>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    accountNumber: {
      type: String,
      required: true,
      unique: true,
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
    },
    transactions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Transaction',
      },
    ],
  },
  { timestamps: true }
);

export const Account = model<IAccount>('Account', accountSchema);
