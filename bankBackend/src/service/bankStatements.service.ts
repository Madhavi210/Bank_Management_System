
import { ClientSession } from 'mongoose';
import { BankStatement } from '../model/bankStatement.model';
import { Transaction } from '../model/transaction.model';
import { Account } from '../model/account.model';
import IBankStatement from '../interface/bankStatement.interface';
import AppError from '../utils/errorHandler';
import StatusConstants from '../constant/statusConstant';

export default class BankStatementService {

  public static async getBankStatement(
    userId: string,
    accountId: string,
    session?: ClientSession
  ): Promise<IBankStatement | null> {
    if (!session) {
      throw new AppError(
        StatusConstants.INTERNAL_SERVER_ERROR.body.message,
        StatusConstants.INTERNAL_SERVER_ERROR.httpStatusCode
      );
    }

    // Ensure the account belongs to the user
    const account = await Account.findOne({ _id: accountId }).session(session);
    if (!account) {
      throw new AppError(
        'Account not found or does not belong to the user',
        StatusConstants.NOT_FOUND.httpStatusCode
      );
    }

    // Fetch transactions related to the account
    const transactions = await Transaction.find({ 
      $or: [{ senderAccountId: userId }, { recipientAccountId: userId }] 
    }).session(session);

    // Format transactions
    const formattedTransactions = transactions.map(transaction => ({
      transactionId: transaction._id,
      date: transaction.createdAt,
      description: transaction.description || '',
      amount: transaction.amount,
      type: transaction.senderAccountId.toString() === accountId ? 'debit' : 'credit'
    }));

    // Create or update bank statement
    const bankStatement = await BankStatement.findOneAndUpdate(
      { userId, accountId },
      { $set: { transactions: formattedTransactions }},
      { new: true, upsert: true, session }
    );

    return bankStatement;
  }
}
