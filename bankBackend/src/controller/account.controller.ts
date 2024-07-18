import { Request, Response, NextFunction } from 'express';
import { ClientSession } from 'mongoose';
import AccountService from '../service/account.service';
import { StatusCode } from '../enum/statusCode';
import AppError from '../utils/errorHandler';
import mongoose from 'mongoose';

export default class AccountController {
    public static async createAccount(
        req: Request,
        res: Response,
        next: NextFunction
      ): Promise<void> {
        const { userId, accountNumber, accountType , balance } = req.body;
        const session = await mongoose.startSession();
        session.startTransaction();
    
        try {
          const newAccount = await AccountService.createAccount(
            userId,
            accountNumber,
            accountType,
            balance,
            session
          );
    
          await session.commitTransaction();
          session.endSession();
    
          res.status(StatusCode.CREATED).json(newAccount);
        } catch (error) {
          await session.abortTransaction();
          session.endSession();
          next(error);
        }
      }

  public static async getAccountById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const accountId = req.params.id;

    try {
      const account = await AccountService.getAccountById(accountId);
      if (!account) {
        throw new AppError('Account not found', StatusCode.NOT_FOUND);
      }
      res.status(StatusCode.OK).json(account);
    } catch (error) {
      next(error);
    }
  }

  public static async getAllAccounts(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { accounts, totalAccounts } = await AccountService.getAllAccounts();
      res.status(StatusCode.OK).json({ accounts, totalAccounts });
    } catch (error) {
      next(error);
    }
  }

  public static async updateAccount(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const accountId = req.params.id;
    const updates = req.body;
    const session = await mongoose.startSession();
  
    try {
      session.startTransaction();
      const updatedAccount = await AccountService.updateAccount(
        accountId,
        updates,
        session
      );
      await session.commitTransaction();
      session.endSession();
      res.status(StatusCode.OK).json(updatedAccount);
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      next(error);
    }
  }
  
  public static async deleteAccount(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const accountId = req.params.id;
    const session = await mongoose.startSession();
  
    try {
      session.startTransaction();
      await AccountService.deleteAccount(accountId, session);
      await session.commitTransaction();
      session.endSession();
      res.status(StatusCode.NO_CONTENT).send();
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      next(error);
    }
  }


}
