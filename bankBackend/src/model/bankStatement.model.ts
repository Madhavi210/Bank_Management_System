import { Schema, model } from 'mongoose';
import IBankStatement from '../interface/bankStatement.interface';

// Define the schema
const bankStatementSchema = new Schema<IBankStatement>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  accountId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
  transactions: [
    {
      transactionId: { type: Schema.Types.ObjectId, ref: 'Transaction', required: true },
      date: { type: Date, required: true },
      description: { type: String, required: true },
      amount: { type: Number, required: true },
      type: { type: String, enum: ['credit', 'debit'], required: true }
    }
  ]
});

// Export the model
export const BankStatement = model<IBankStatement>('BankStatement', bankStatementSchema);
