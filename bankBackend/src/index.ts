
import express from "express";
import Database from "./db/db";
import cors from "cors";
import errorHandlerMiddleware from "./handler/errorHandler";
import UserRouter from "./router/user.router";
import AccountRouter from "./router/account.router";
import TransactionRouter from "./router/transaction.router";
import BankStatementRouter from "./router/bankStatement.router";
import path, { dirname } from "path";

export default class App {
    private app: express.Application;

    constructor(){
        this.app = express();
        this.config();
        this.connect();
        this.routes();
    }

    private config(): void {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        
        this.app.use('/uploads', express.static(path.join(__dirname, 'uploads') ));        
    }

    private connect(): void {
        new Database();
    }

    private routes(): void {
        const userRoute = new UserRouter().getRouter();
        const accountRoute = new AccountRouter().getRouter();
        const transactionRoute = new TransactionRouter().getRouter();
        const bankStatementRoute = new BankStatementRouter().getRouter();

        this.app.use("/api/user", userRoute);
        this.app.use("/api/account", accountRoute);
        this.app.use("/api/transaction", transactionRoute);
        this.app.use("/api/bankStatement", bankStatementRoute);

        this.app.use('/uploads', express.static(path.join(__dirname, 'uploads') ));        
        this.app.use(errorHandlerMiddleware);
    }

    public start(port: string | undefined): void {
        this.app.listen(port, () => {
          console.log(`Server running on port ${port}`);
        });
    }

}