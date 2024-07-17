import { ClientSession } from 'mongoose';
import { Transfer } from '../model/transaction.model';
import { Account } from '../model/account.model';
import ITransaction from '../interface/transaction.interface';
import AppError from '../utils/errorHandler';
import StatusConstants from '../constant/statusConstant';

export default class TransactionService {
  public static async createTransaction(
    accountId: string,
    amount: number,
    type: 'deposit' | 'withdrawal',
    description?: string,
    session?: ClientSession
  ): Promise<ITransaction> {
    const account = await Account.findById(accountId).session(session).exec();
    if (!account) {
      throw new AppError(
        StatusConstants.NOT_FOUND.body.message,
        StatusConstants.NOT_FOUND.httpStatusCode
      );
    }

    if (type === 'withdrawal' && account.balance < amount) {
      throw new AppError(
        StatusConstants.INSUFFICIENT_FUNDS.body.message,
        StatusConstants.INSUFFICIENT_FUNDS.httpStatusCode
      );
    }

    const newTransaction = new Transfer({
      accountId,
      amount: type === 'withdrawal' ? -amount : amount,
      type,
      description,
    });

    if (type === 'withdrawal') {
      account.balance -= amount;
    } else {
      account.balance += amount;
    }

    await account.save({ session });
    await newTransaction.save({ session });

    return newTransaction.toObject();
  }

  public static async getTransactionById(id: string): Promise<ITransaction | null> {
    return Transfer.findById(id).exec();
  }

  public static async getAllTransactions(): Promise<{ transactions: ITransaction[], totalTransaction: number }> {
    const transactions = await Transfer.find().exec();
    const totalTransaction = await Transfer.countDocuments().exec();
    return { transactions, totalTransaction };
  }

  public static async deleteTransaction(id: string, session: ClientSession): Promise<void> {
    const transaction = await Transfer.findByIdAndDelete(id).session(session).exec();
    if (!transaction) {
      throw new AppError(
        StatusConstants.NOT_FOUND.body.message,
        StatusConstants.NOT_FOUND.httpStatusCode
      );
    }
  }
}
