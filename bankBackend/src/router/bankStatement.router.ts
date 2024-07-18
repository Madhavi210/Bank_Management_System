
import express from 'express';
import BankStatementsController from '../controller/bankStatement.controller';

export default class BankStatementRouter {
  private router: express.Router;

  constructor() {
    this.router = express.Router();
    this.routes();
  }

  private routes() {
    // GET /api/bank-statements/:userId/:accountId - Get bank statement for a user and account
    this.router.get('/:userId/:accountId', BankStatementsController.getBankStatement);
  }

  public getRouter() {
    return this.router;
  }
}
