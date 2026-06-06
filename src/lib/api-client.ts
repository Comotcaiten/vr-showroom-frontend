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

  if (res.status !== 204 && res.status !== 205) {
    const contentType = res.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      try {
        data = await res.json();
      }
      catch (err) {
        console.log(err);
        data = null;
      }
    }
  }


  if (!res.ok) {
    const error = data;
    let message = error?.message || `API Error: Request failed with status ${res.status}`;
    throw new Error(message);
  }

  return data as T; // return res.json
}
