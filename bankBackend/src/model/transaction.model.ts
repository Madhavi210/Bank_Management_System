
import { Schema, model } from 'mongoose';
import ITransfer from '../interface/transaction.interface';
const transferSchema = new Schema<ITransfer>(
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
    description: {
      type: String,
      default: null,
    }
  },
  { timestamps: true }
);

export const Transfer = model<ITransfer>('Transfer', transferSchema);
