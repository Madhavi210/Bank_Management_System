import express ,{ Request, Response, NextFunction } from 'express';
import { ClientSession } from 'mongoose';
import TransactionService from '../service/transaction.service';
import { StatusCode } from '../enum/statusCode';
import AppError from '../utils/errorHandler';
import mongoose from 'mongoose';
import { startSession } from 'mongoose';

export default class TransactionController {
   
    
  public static async getTransactionById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const transactionId = req.params.id;

    try {
      const transaction = await TransactionService.getTransactionById(transactionId);
      if (!transaction) {
        throw new AppError('Transaction not found', StatusCode.NOT_FOUND);
      }
      res.status(StatusCode.OK).json(transaction);
    } catch (error) {
      next(error);
    }
  }

  public static async getAllTransactions(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { transactions, totalTransactions } = await TransactionService.getAllTransactions();
      res.status(StatusCode.OK).json({ transactions, totalTransactions });
    } catch (error) {
      next(error);
    }
  }

  public static async transferFunds(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { senderAccountId, recipientAccountId, amount,type, description } = req.body;
    if (!senderAccountId || !recipientAccountId || !amount || !type) {
      throw new AppError('Missing required fields', 400);
    }
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const success = await TransactionService.transferFunds(senderAccountId, recipientAccountId, amount, type,  description, session);
      
      if (!success) {
        throw new AppError('Transaction failed', StatusCode.INTERNAL_SERVER_ERROR);
      }

      await session.commitTransaction();
      session.endSession();

      res.status(StatusCode.OK).json({ message: 'Transaction successful' });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.log(error);
      
      next(error);
    }
  }

}
