import { http } from '@/api/http.ts';
import type { User } from '@/types/user.ts';

export async function postRegister({ email, password }: { email: string; password: string }) {
  return http<User>('/api/auth/register', {
    method: 'POST',
    body: { email, password },
  });
}

export async function postLogin({ email, password }: { email: string; password: string }) {
  return http<User>('/api/auth/login', {
    method: 'POST',
    body: { email, password },
  });
}

export async function postLogout() {
  return http('/api/auth/logout', { method: 'POST' });
}
