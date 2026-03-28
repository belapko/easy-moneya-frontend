import { http } from '@/api/http.ts';
import type { User } from '@/types/user.ts';

export async function getMe() {
  return http<User>('/api/user/me');
}
