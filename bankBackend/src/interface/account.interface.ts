import { Document, Schema } from 'mongoose';

export default interface IAccount extends Document {
  userId: Schema.Types.ObjectId;
  accountNumber: string;
  accountType: 'savings' | 'checking';
  balance: number;
  transactions: Schema.Types.ObjectId[]; // Reference to transactions associated with the account
  createdAt: Date;
  updatedAt: Date;
}
