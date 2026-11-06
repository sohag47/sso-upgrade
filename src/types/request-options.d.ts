type THttp_Methods = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";

type RequestOptions = {
  method?: THttp_Methods;
  body?: BodyInit | Record<string, unknown> | null;
  headers?: HeadersInit;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
};
