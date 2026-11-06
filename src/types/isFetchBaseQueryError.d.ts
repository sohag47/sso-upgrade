import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export function isFetchBaseQueryError(
  error: FetchBaseQueryError | SerializedError | undefined,
): error is FetchBaseQueryError {
  return error !== undefined && "data" in error;
}
