import { ClientSession } from 'mongoose';
import { Account } from '../model/account.model';
import IAccount from '../interface/account.interface';
import AppError from '../utils/errorHandler';
import StatusConstants from '../constant/statusConstant';

export default class AccountService {
  public static async createAccount(
    userId: string,
    accountNumber: string,
    accountType: 'savings' | 'checking',
    balance: number,
    session: ClientSession 
  ): Promise<IAccount> {
    const existingAccount = await Account.findOne({ accountNumber }).session(session);
    if (existingAccount) {
      throw new AppError(
        StatusConstants.DUPLICATE_KEY_VALUE.body.message,
        StatusConstants.DUPLICATE_KEY_VALUE.httpStatusCode
      );
    }

    const newAccount = new Account({
      userId,
      accountNumber,
      accountType,
      balance, // Initial balance
      transactions: [],
    });

    await newAccount.save({ session });
    return newAccount.toObject();
  }

  public static async getAccountById(id: string): Promise<IAccount | null> {
    return Account.findById(id).exec();
  }

  public static async getAllAccounts(): Promise<{ accounts: IAccount[], totalAccounts: number }> {
    const accounts = await Account.find().exec();
    const totalAccounts = await Account.countDocuments().exec();
    return { accounts, totalAccounts };
  }

  public static async updateAccount(
    id: string,
    updates: Partial<IAccount>,
    session: ClientSession
  ): Promise<IAccount | null> {
    const account = await Account.findByIdAndUpdate(id, updates, { new: true, session }).exec();
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

