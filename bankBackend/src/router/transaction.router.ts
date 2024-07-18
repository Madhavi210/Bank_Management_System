import express from 'express';
import TransactionController from '../controller/transaction.controller';

export default class TransactionRouter {
  private router: express.Router;

  constructor() {
    this.router = express.Router();
    this.routes();
  }

  private routes() {
    // POST /api/transactions - Create a new transaction
    this.router.post('/', TransactionController.transferFunds);

    // GET /api/transactions/:id - Get transaction by ID
    this.router.get('/:id', TransactionController.getTransactionById);

    // GET /api/transactions - Get all transactions
    this.router.get('/', TransactionController.getAllTransactions);
  }

  public getRouter() {
    return this.router;
  }
}
