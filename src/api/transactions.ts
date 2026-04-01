import { http } from '@/api/http.ts';
import { type Category } from '@/types/categories.ts';
import type { Transaction, TransactionKind } from '@/types/transactions.ts';

interface TransactionBody {
  kind: TransactionKind;
  categoryId: Category['id'];
  amount: string;
  description: string;
  occurredAt: Date;
}

interface TransactionsQueryParams {
  kind?: TransactionKind;
  categoryId?: Category['id'];
  occurredFrom?: Date;
  occurredTo?: Date;
}

export async function getTransactions(queryParams?: TransactionsQueryParams) {
  const searchParams = new URLSearchParams();

  if (queryParams?.kind !== undefined) {
    searchParams.set('kind', queryParams.kind);
  }

  if (queryParams?.categoryId !== undefined) {
    searchParams.set('categoryId', queryParams.categoryId);
  }

  if (queryParams?.occurredFrom !== undefined) {
    searchParams.set('occurredFrom', queryParams.occurredFrom.toISOString());
  }

  if (queryParams?.occurredTo !== undefined) {
    searchParams.set('occurredTo', queryParams.occurredTo.toISOString());
  }

  const queryString = searchParams.toString();
  const url = queryString ? `/api/transactions?${queryString}` : '/api/transactions';

  return http<Transaction[]>(
    url,
    { method: 'GET' }
  );
}

export async function createTransaction(transaction: TransactionBody) {
  return http<Transaction>('/api/transactions', {
    method: 'POST',
    body: transaction
  });
}
