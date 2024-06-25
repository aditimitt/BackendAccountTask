import { Repository } from 'typeorm';
import { AppDataSource } from '../ormconfig';
import { Account } from '../entity/Account';
import bcrypt from "bcrypt";

export class AccountService {
  private accountRepository: Repository<Account>;

  constructor() {
    this.accountRepository = AppDataSource.getRepository(Account);
  }

  async createAccount(account: Account): Promise<Account> {
    return this.accountRepository.save(account);
  }

  async getAccountById(id: number): Promise<Account | null> {
    return this.accountRepository.findOneBy({ id });
  }

  async getAccountByEmail(email: string): Promise<Account | null> {
    return this.accountRepository.findOneBy({ email });
  }

  async updateAccount(id: number, account: Partial<Account>): Promise<void> {
    await this.accountRepository.update(id, account);
  }

  async deleteAccount(id: number) {
    return this.accountRepository.delete(id);
  }

  async listAccounts(limit: number) {
    return this.accountRepository.find({ take: limit });
  }

  async authenticate(email: string, password: string) {
    const account = await this.accountRepository.findOne({ where: { email } });
    if (account && await bcrypt.compare(password, account.password)) {
      return account;
    }
    throw new Error('Invalid credentials');
  }
}
