// import { formatWithCursor } from 'prettier';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce((acc, obj) => {
      if (obj.type === 'income') {
        return acc + obj.value;
      }
      return acc;
    }, 0);

    // const totalOutcome: number = outcome.reduce((acc: number, cur: number) => acc + cur ),0);
    const outcome = this.transactions.reduce((acc, obj) => {
      if (obj.type === 'outcome') {
        return acc + obj.value;
      }
      return acc;
    }, 0);

    const total = income - outcome;

    return {
      income,
      outcome,
      total,
    };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type,
    });
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
