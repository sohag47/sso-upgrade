import { cookies } from "next/headers";
import "server-only";

const BASE_URL = process.env.API_BASE_URL ?? "http://127.0.0.1:8000";
const ORIGIN = process.env.ORIGIN ?? "http://127.0.0.1:3000";

import type { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

function parseSetCookieHeader(
  cookieString: string,
): { name: string; value: string; options: Partial<ResponseCookie> } | null {
  const parts = cookieString.split(";").map((p) => p.trim());

  // First part is always "name=value"
  const [nameValue, ...attributes] = parts;
  const eqIndex = nameValue.indexOf("=");
  if (eqIndex === -1) return null;

  const name = nameValue.slice(0, eqIndex).trim();
  const value = decodeURIComponent(nameValue.slice(eqIndex + 1).trim());

  const options: Partial<ResponseCookie> = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    domain: ".ju.local"
  };

  // Parse each attribute
  for (const attr of attributes) {
    const lower = attr.toLowerCase();

    if (lower === "httponly") {
      options.httpOnly = true;
    } else if (lower === "secure") {
      options.secure = true;
    } else if (lower.startsWith("samesite=")) {
      const val = attr.split("=")[1]?.toLowerCase();
      if (val === "strict" || val === "lax" || val === "none") {
        options.sameSite = val;
      }
    } else if (lower.startsWith("path=")) {
      options.path = attr.split("=")[1];
    } else if (lower.startsWith("domain=")) {
      // ⚠️ Skip or override domain — browser must match Next.js host
      // options.domain = attr.split("=")[1];
    } else if (lower.startsWith("max-age=")) {
      options.maxAge = parseInt(attr.split("=")[1], 10);
    } else if (lower.startsWith("expires=")) {
      options.expires = new Date(attr.split("=")[1]);
    }
  }

  return { name, value, options };
}

/**
 * Parses the fetch response safely.
 * Throws an explicit error if the status code is not 2xx.
 */
async function parseResponse<T>(response: Response): Promise<TResponse<T>> {
  const isJson = response.headers
    .get("content-type")
    ?.includes("application/json");

  const responseBody = isJson ? await response.json() : null;
  console.log("response", response);

  const meta: TRequestMetadata = {
    code: response.status,
    statusText: response.statusText,
    url: response.url,
  };

  if (!response.ok) {
    return {
      status: false,
      message: responseBody?.message,
      error: responseBody?.data ?? null,
      meta,
    };
  }

  return {
    status: true,
    message: responseBody?.message,
    data: responseBody?.data ?? null,
    meta,
  };
}

/**
 * 2. Exact Response Parser for Paginated Arrays
 */
export async function parsePaginationResponse<T>(
  response: Response,
): Promise<TPaginationResponse<T>> {
  const responseBody = await response.text();

  if (!response.ok) {
    const error = responseBody ? JSON.parse(responseBody) : undefined;

    return {
      success: false,
      message: response.statusText || "Request failed",
      error,
    };
  }

  return responseBody
    ? JSON.parse(responseBody)
    : { success: true, message: "Success" };
}

/**
 * 3. Core HTTP Request Engine
 *
 * Generic server-side fetch wrapper. Forwards the incoming request's cookies
 * (including httpOnly ones) to the backend .NET API, and parses the response
 * into a consistent `TResponse<T>` shape.
 *
 * @typeParam T - Expected shape of the successful response `data` field.
 * @param url - Relative path appended to BASE_URL (no leading slash), e.g. "users/me".
 * @param options - Request options: method, body, headers, cache, next.
 *
 * @example
 * // GET request
 * const res = await request<TUser>(ENDPOINTS.USES, {
 *       method: HTTP_METHOD.GET,
 *      next: {
 *          revalidate: REVALIDATE.TWO_MINUTES,
 *          tags: [CACHE_TAG.PURPOSES_TAG],
 *      },
 *  })
 *
 * @example
 * // POST with JSON body (plain object - auto stringified)
 * const res = await request<Order>("orders", {
 *   method: "POST",
 *   body: { productId: 42, qty: 2 },
 * })
 *
 * @example
 * // POST with FormData (file upload)
 * const formData = new FormData()
 * formData.append("file", fileBlob, "avatar.png")
 * const res = await request<{ url: string }>("users/avatar", {
 *   method: "POST",
 *   body: formData,
 * })
 *
 * @example
 * // DELETE request
 * const res = await request<null>(`orders/${orderId}`, { method: "DELETE" })
 */
/**
 * Universal Next.js fetch wrapper handling Cookies, FormData, and Error States.
 */
export async function request<T>(
  url: string,
  options?: RequestOptions,
): Promise<TResponse<T>> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    const isFormData = options?.body instanceof FormData;
    const headers = new Headers(options?.headers);

    // 1. Send strictly the access_token cookie
    if (token) {
      headers.set("Cookie", `access_token=${token}`);
    }

    // 2. Attach your domain context so backend validates origin and cookies properly
    headers.set("Host", "backend.ju.local:7153");
    headers.set("Origin", "http://frontend.ju.local:3000");
    headers.set("Referer", "http://frontend.ju.local:3000");

    if (!headers.has("Accept")) {
      headers.set("Accept", "application/json, text/plain, */*");
    }

    if (!isFormData && !headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }

    const body =
      options?.body && !isFormData && typeof options.body === "object"
        ? JSON.stringify(options.body)
        : (options?.body as BodyInit | undefined);

    const response = await fetch(`${BASE_URL}/api/${url}`, {
      method: options?.method ?? "GET",
      body,
      headers,
      cache: options?.cache,
      next: options?.next,
    });

    return await parseResponse<T>(response);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "An unknown network error occurred";

    console.error("[Fetch Error Stack]:", error);

    return {
      status: false,
      message: errorMessage,
      error: errorMessage,
      meta: {
        code: 500,
        statusText: "Internal Server Error",
        url: url,
      },
    };
  }
}
export async function loginRequest<T>(
  url: string,
  init?: RequestInit,
): Promise<TResponse<T>> {
  try {
    const headers = new Headers(init?.headers);
    if (!headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }

    // Clean up endpoint paths to avoid double slashes
    const cleanUrl = url.startsWith("/") ? url.slice(1) : url;
    const response = await fetch(`${BASE_URL}/api/${cleanUrl}`, {
      ...init,
      headers,
    });

    // Safely parse JSON response body
    let data;
    try {
      data = await response.json();
    } catch {
      data = {};
    }

    // Check HTTP status code
    if (!response.ok) {
      return {
        status: false,
        message:
          data?.message || `Request failed with status ${response.status}`,
        error: data?.errors ?? {},
      };
    }

    // Handle incoming backend cookies
    const cookieStore = await cookies();
    const setCookieHeader = response.headers.getSetCookie();

    if (setCookieHeader && setCookieHeader.length > 0) {
      for (const rawCookie of setCookieHeader) {
        const parsed = parseSetCookieHeader(rawCookie);
        if (parsed) {
          cookieStore.set(parsed.name, parsed.value, parsed.options);
        }
      }
    }

    return {
      status: true,
      message: data?.message || "Success",
      data: data?.data as T,
    };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    console.error("DEBUG: Fetch Failed", error);

    return {
      status: false,
      message: errorMessage,
      error: errorMessage,
    };
  }
}
