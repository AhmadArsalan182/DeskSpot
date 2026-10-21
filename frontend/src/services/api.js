export class ApiError extends Error {
  constructor(message, { status, code, details } = {}) {
    super(message);
    this.status = status;
    this.code = code;
    this.details = details ?? [];
  }
}

export async function apiRequest(path, { method = "GET", body } = {}) {
  let response;
  try {
    response = await fetch(`/api${path}`, {
      method,
      headers: body ? { "Content-Type": "application/json" } : undefined,
      credentials: "include",
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError("Cannot reach the server. Check your connection and try again.", {
      code: "NETWORK_ERROR",
    });
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const error = data?.error;
    throw new ApiError(error?.message ?? "Something went wrong. Please try again.", {
      status: response.status,
      code: error?.code,
      details: error?.details,
    });
  }

  return data;
}
