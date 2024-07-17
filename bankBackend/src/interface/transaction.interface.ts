import { Document } from 'mongoose';
import { Schema } from 'mongoose';

export default interface ITransfer extends Document {
  senderAccountId: Schema.Types.ObjectId;
  recipientAccountId: Schema.Types.ObjectId;
  amount: number;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}
