import { http } from '@/api/http.ts';
import { type Category, CategoryKind } from '@/types/categories.ts';

export async function getCategories({ kind, includeArchived = false }: {kind: CategoryKind; includeArchived?: boolean}) {
  return http<Category[]>(`/api/categories?kind=${kind}&includeArchived=${includeArchived}`, { method: 'GET' });
}
