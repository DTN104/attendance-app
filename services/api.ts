type ApiErrorBody = {
  error?: {
    code?: string;
    message?: string;
  };
};

export class ApiError extends Error {
  readonly code: string;
  readonly status: number;

  constructor(
    message: string,
    code = 'NETWORK_ERROR',
    status = 0,
  ) {
    super(message);
    this.code = code;
    this.status = status;
  }
}

export function getApiUrl() {
  const value = process.env.EXPO_PUBLIC_API_URL?.replace(/\/$/, '');
  if (!value) throw new ApiError('Thiếu EXPO_PUBLIC_API_URL trong .env.local.');
  return value;
}

export async function apiRequest<T>(
  path: string,
  init: RequestInit & { accessToken?: string } = {},
): Promise<T> {
  const { accessToken, headers, ...requestInit } = init;
  let response: Response;

  try {
    response = await fetch(`${getApiUrl()}${path}`, {
      ...requestInit,
      headers: {
        ...(requestInit.body ? { 'Content-Type': 'application/json' } : {}),
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        ...headers,
      },
    });
  } catch {
    throw new ApiError(`Không kết nối được API tại ${getApiUrl()}.`);
  }

  const body = await response.json().catch(() => ({})) as ApiErrorBody & { data?: T };
  if (!response.ok) {
    throw new ApiError(
      body.error?.message ?? 'API trả về lỗi.',
      body.error?.code,
      response.status,
    );
  }
  return body.data as T;
}
