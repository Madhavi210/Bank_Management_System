import { Schema, model, Document } from 'mongoose';
import { SchemaTypes } from 'mongoose';
import ITransaction from '../interface/transaction.interface';

const transactionSchema = new Schema<ITransaction>(
  {
    senderAccountId: {
      type: Schema.Types.ObjectId,
      ref: 'Account',
      required: true,
    },
    recipientAccountId: {
      type: Schema.Types.ObjectId,
      ref: 'Account',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ['credit', 'debit', 'transfer'],
      required: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Transaction = model<ITransaction>('Transaction', transactionSchema);
