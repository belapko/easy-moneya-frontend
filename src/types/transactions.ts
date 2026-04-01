import type { Category } from '@/types/categories.ts';

export enum TransactionKind {
  EXPENSE = 'expense',
  INCOME = 'income',
}

export enum TransactionFilter {
  ALL = '',
  EXPENSE = 'expense',
  INCOME = 'income',
}

export interface Transaction {
  id: string;
  kind: TransactionKind;
  categoryId: Category['id'];
  amount: string;
  description: string;
  occurredAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
