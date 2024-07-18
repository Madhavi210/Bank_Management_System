import { Document, Schema } from 'mongoose';

// Interface for Bank Statement document
interface IBankStatement extends Document {
  userId: Schema.Types.ObjectId;
  accountId: Schema.Types.ObjectId;
  transactions: Array<{
    transactionId: Schema.Types.ObjectId;
    date: Date;
    description: string;
    amount: number;
    type: 'credit' | 'debit';
  }>;
}

export default IBankStatement;
