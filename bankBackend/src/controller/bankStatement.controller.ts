
import { Request, Response, NextFunction } from 'express';
import BankStatementService from '../service/bankStatements.service';
import { startSession } from 'mongoose';

export default class BankStatementsController { 
public static async getBankStatement (req: Request, res: Response, next: NextFunction) {
  const { userId, accountId } = req.params;

  try {
    const session = await startSession();
    session.startTransaction();
    
    const bankStatement = await BankStatementService.getBankStatement(userId, accountId, session);
    
    await session.commitTransaction();
    session.endSession();

    if (!bankStatement) {
      return res.status(404).json({
        message: 'Bank statement not found'
      });
    }

    return res.status(200).json(bankStatement);
  } catch (error) {
    next(error);
  }
};

}