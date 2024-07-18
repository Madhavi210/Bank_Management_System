import { ClientSession } from 'mongoose';
import { Transaction } from '../model/transaction.model';
import ITransaction from '../interface/transaction.interface';
import AppError from '../utils/errorHandler';
import StatusConstants from '../constant/statusConstant'; // Corrected import path
import { Account } from '../model/account.model';
export default class TransactionService {
  
  public static async transferFunds(
    senderAccountId: string,
    recipientAccountId: string,
    amount: number,
    type: 'credit' | 'debit' | 'transfer',
    description?: string,
    session?: ClientSession
  ): Promise<boolean> {
    if (!session) {
      throw new AppError(
        StatusConstants.INTERNAL_SERVER_ERROR.body.message,
        StatusConstants.INTERNAL_SERVER_ERROR.httpStatusCode
      );
    }

    let senderAccount ;
    let receiverAccount ;

    // Handle transaction types
    if (type === 'credit') {
      let receiverAccount = await Account.findOne({ userId: recipientAccountId }).session(session);
      if (!receiverAccount) {
        throw new AppError('Recipient account not found', StatusConstants.NOT_FOUND.httpStatusCode);
      }
      receiverAccount.balance += amount;
      await receiverAccount.save({ session });
    } else if (type === 'debit') {
      senderAccount = await Account.findOne({ userId: senderAccountId }).session(session);
      if (!senderAccount) {
        throw new AppError('Sender account not found', StatusConstants.NOT_FOUND.httpStatusCode);
      }
      if (senderAccount.balance < amount) {
        throw new AppError('Insufficient funds', StatusConstants.BAD_REQUEST.httpStatusCode);
      }
      senderAccount.balance -= amount;
      await senderAccount.save({ session });
    } else if (type === 'transfer') {
      senderAccount = await Account.findOne({ userId: senderAccountId }).session(session);
      if (!senderAccount) {
        throw new AppError('Sender account not found', StatusConstants.NOT_FOUND.httpStatusCode);
      }
      if (senderAccount.balance < amount) {
        throw new AppError('Insufficient funds', StatusConstants.BAD_REQUEST.httpStatusCode);
      }
      senderAccount.balance -= amount;
      await senderAccount.save({ session });

      receiverAccount = await Account.findOne({ userId: recipientAccountId }).session(session);
      if (!receiverAccount) {
        throw new AppError('Recipient account not found', StatusConstants.NOT_FOUND.httpStatusCode);
      }
      receiverAccount.balance += amount;
      await receiverAccount.save({ session });
    } else {
      throw new AppError('Invalid transaction type', StatusConstants.BAD_REQUEST.httpStatusCode);
    }

    // Create transaction record
    const transaction = new Transaction({
      senderAccountId: type === 'credit' ? null : senderAccountId,
      recipientAccountId: type === 'debit' ? null : recipientAccountId,
      amount: amount,
      type: type,
      description: description,
    });

    await transaction.save({ session });

    return true;
  }

  public static async getTransactionById(id: string): Promise<ITransaction | null> {
    return Transaction.findById(id).exec();
  }

  public static async getAllTransactions(): Promise<{ transactions: ITransaction[], totalTransactions: number }> {
    const transactions = await Transaction.find().exec();
    const totalTransactions = await Transaction.countDocuments().exec();
    return { transactions, totalTransactions };
  }

}
