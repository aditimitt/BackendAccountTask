import { Request, Response } from "express";
import { AccountService } from "../services/account.service";
import jwt from "jsonwebtoken";

const accountService = new AccountService();

export class AccountController {
  async createAccount(req: Request, res: Response) {
    try {
      const account = await accountService.createAccount(req.body);
      res.status(201).send(account);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send({ message: error.message });
      } else {
        res.status(400).send({ message: "Unknown error" });
      }
    }
  }

  async getAccount(req: Request, res: Response) {
    try {
      const account = await accountService.getAccountById(parseInt(req.params.id));
      res.send(account);
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).send({ message: error.message });
      } else {
        res.status(404).send({ message: "Unknown error" });
      }
    }
  }

  async updateAccount(req: Request, res: Response) {
    try {
      const account = await accountService.updateAccount(parseInt(req.params.id), req.body);
      res.send(account);
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).send({ message: error.message });
      } else {
        res.status(404).send({ message: "Unknown error" });
      }
    }
  }

  async deleteAccount(req: Request, res: Response) {
    try {
      const result = await accountService.deleteAccount(parseInt(req.params.id));
      res.send(result);
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).send({ message: error.message });
      } else {
        res.status(404).send({ message: "Unknown error" });
      }
    }
  }

  async listAccounts(req: Request, res: Response) {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const accounts = await accountService.listAccounts(limit);
      res.send(accounts);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send({ message: error.message });
      } else {
        res.status(400).send({ message: "Unknown error" });
      }
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const account = await accountService.authenticate(email, password);
      const token = jwt.sign({ id: account.id }, process.env.JWT_SECRET as string, { expiresIn: "1h" });
      res.send({ token });
    } catch (error) {
      if (error instanceof Error) {
        res.status(401).send({ message: error.message });
      } else {
        res.status(401).send({ message: "Unknown error" });
      }
    }
  }
}
