import { Document, Schema } from 'mongoose';

export default interface ITransfer extends Document {
  senderAccountId: Schema.Types.ObjectId;
  recipientAccountId: Schema.Types.ObjectId;
  amount: number;
  type: 'credit' | 'debit' | 'transfer';
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}
