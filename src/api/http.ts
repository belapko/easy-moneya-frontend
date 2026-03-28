type ApiErrorResponse = {
  error?: {
    code?: string;
    message?: string;
  };
};

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type HttpOptions = Omit<RequestInit, 'method' | 'body' | 'credentials'> & {
  method?: HttpMethod;
  body?: unknown;
};

export class ApiError extends Error {
  public readonly code: string | null;
  public readonly status: number;

  constructor(message: string, status: number, code: string | null = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

async function createApiError(response: Response): Promise<ApiError> {
  const fallbackMessage = `Request failed with status ${response.status}`;

  try {
    const errorResponse = await response.json() as ApiErrorResponse;

    return new ApiError(
      errorResponse.error?.message ?? fallbackMessage,
      response.status,
      errorResponse.error?.code ?? null,
    );
  } catch {
    return new ApiError(fallbackMessage, response.status);
  }
}

export async function http<T>(url: string, options: HttpOptions = {}): Promise<T> {
  const apiUrl = import.meta.env.VITE_API_URL;

  if (!apiUrl) {
    throw new Error('VITE_API_URL is not defined');
  }

  const { method = 'GET', body, headers, ...restOptions } = options;

  const requestHeaders = new Headers(headers);

  if (body !== undefined) {
    requestHeaders.set('Content-Type', 'application/json');
  }

  const response = await fetch(new URL(url, apiUrl), {
    ...restOptions,
    credentials: 'include',
    method,
    headers: requestHeaders,
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  if (!response.ok) {
    throw await createApiError(response);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}
