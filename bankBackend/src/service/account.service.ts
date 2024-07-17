import { ClientSession } from 'mongoose';
import { Account } from '../model/account.model';
import IAccount from '../interface/account.interface';
import AppError from '../utils/errorHandler';
import StatusConstants from '../constant/statusConstant';

export default class AccountService {
  public static async createAccount(
    userId: string,
    accountType: 'savings' | 'checking',
    initialBalance: number,
    session: ClientSession
  ): Promise<IAccount> {
    const newAccount = new Account({
      userId,
      accountType,
      balance: initialBalance,
    });

    await newAccount.save({ session });
    return newAccount.toObject();
  }

  public static async getAccountById(id: string): Promise<IAccount | null> {
    return Account.findById(id).exec();
  }

  public static async getAllAccounts(): Promise<{ accounts: IAccount[], totalAccount: number }> {
    const accounts = await Account.find().exec();
    const totalAccount = await Account.countDocuments().exec();
    return { accounts, totalAccount };
  }

  public static async updateAccountBalance(
    accountId: string,
    amount: number,
    session: ClientSession
  ): Promise<IAccount | null> {
    const account = await Account.findByIdAndUpdate(
      accountId,
      { $inc: { balance: amount } },
      { new: true, session }
    ).exec();
    if (!account) {
      throw new AppError(
        StatusConstants.NOT_FOUND.body.message,
        StatusConstants.NOT_FOUND.httpStatusCode
      );
    }
    return account.toObject();
  }

  public static async deleteAccount(id: string, session: ClientSession): Promise<void> {
    const account = await Account.findByIdAndDelete(id).session(session).exec();
    if (!account) {
      throw new AppError(
        StatusConstants.NOT_FOUND.body.message,
        StatusConstants.NOT_FOUND.httpStatusCode
      );
    }
  }
}
