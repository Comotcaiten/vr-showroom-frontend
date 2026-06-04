const BASE_URL = "http://localhost:5000/api";

export async function apiClient<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {

  const isFormData = options?.body instanceof FormData;

  let data = null;

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    credentials: "include",
    ...options,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...options?.headers,
    },
  });

  const contentType = res.headers.get("content-type");

  if (contentType && contentType.includes("application/json")) {
    data = await res.json();
  }

  if (!res.ok) {
    let message = "API Error";
    const error = data;
    message = error.message;

    throw new Error(message);
  }

  return data; // return res.json
}
