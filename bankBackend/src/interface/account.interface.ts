import { Document , Schema} from 'mongoose';

export default interface IAccount extends Document {
  userId: Schema.Types.ObjectId;
  accountType: 'savings' | 'checking';
  balance: number;
  createdAt: Date;
  updatedAt: Date;
}
