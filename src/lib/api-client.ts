const BASE_URL = "http://localhost:5000/api";

export async function apiClient<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {

  const isFormData = options?.body instanceof FormData;

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    credentials: "include",
    ...options,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...options?.headers,
    },
  });

  if (!res.ok) {
    let message = "API Error";

    try {
      const error = await res.json();
      message = error.message;
    } catch {}

    throw new Error(message);
  }

  return res.json();
}
