import { http } from '@/api/http.ts';
import { type Category, CategoryKind } from '@/types/categories.ts';

interface CategoriesQueryParams {
  kind?: CategoryKind;
  includeArchived?: boolean;
}

export async function getCategories(queryParams?: CategoriesQueryParams) {
  const searchParams = new URLSearchParams();

  if (queryParams?.kind !== undefined) {
    searchParams.set('kind', queryParams.kind);
  }

  if (queryParams?.includeArchived !== undefined) {
    searchParams.set('includeArchived', String(queryParams.includeArchived));
  }

  const queryString = searchParams.toString();
  const url = queryString ? `/api/categories?${queryString}` : '/api/categories';

  return http<Category[]>(url, { method: 'GET' });
}
