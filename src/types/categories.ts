export enum CategoryKind {
  EXPENSE = 'expense',
  INCOME = 'income',
}

export interface Category {
  id: string;
  kind: CategoryKind;
  code: string;
  name: string;
  iconKey: string;
  color: string;
  isSystem: boolean;
  isArchived: boolean;
  sortOrder: string;
  createdAt: Date;
  updatedAt: Date;
}
