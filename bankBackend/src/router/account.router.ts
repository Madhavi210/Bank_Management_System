import express from 'express';
import AccountController from '../controller/account.controller';

export default class AccountRouter {
  private router: express.Router;

  constructor() {
    this.router = express.Router();
    this.routes();
  }

  private routes() {
    // POST /api/accounts - Create a new account
    this.router.post('/', AccountController.createAccount);

    // GET /api/accounts/:id - Get account by ID
    this.router.get('/:id', AccountController.getAccountById);

    // DELETE /api/accounts/:id - Delete account by ID
    this.router.delete('/:id', AccountController.deleteAccount);

    // PUT /api/accounts/:id - Update account by ID
    this.router.put('/:id', AccountController.updateAccount);

    // GET /api/accounts - Get all accounts
    this.router.get('/', AccountController.getAllAccounts);
  }

  public getRouter() {
    return this.router;
  }
}
