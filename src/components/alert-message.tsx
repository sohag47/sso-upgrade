"use client";

import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { AlertTriangle, X } from "lucide-react";
import { useEffect, useState } from "react";

interface AlertMessageProps {
  response?: FetchBaseQueryError | SerializedError;
}

function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === "object" &&
    error !== null &&
    ("title" in error ||
      "errors" in error ||
      "traceId" in error ||
      "type" in error)
  );
}

function isResponsePayload(data: unknown): data is TResponseErrorPayload {
  return typeof data === "object" && data !== null;
}

function ErrorList({ errors }: { errors: Record<string, string[]> }) {
  const entries = Object.entries(errors);

  if (!entries.length) return null;

  return (
    <ul className="m-0 list-disc pl-[18px] text-xs">
      {entries.map(([field, messages]) => (
        <li key={field}>
          {field && (
            <span className="font-semibold">
              {field.replace(/^\$\./, "")}:{" "}
            </span>
          )}
          {messages.join(" ")}
        </li>
      ))}
    </ul>
  );
}

function RawDetails({
  error,
  meta,
}: {
  error?: ApiError;
  meta?: TRequestMetadata;
}) {
  const [open, setOpen] = useState(false);

  if (!error && !meta) return null;

  return (
    <div className="mt-2">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="text-xs underline opacity-70 hover:opacity-100"
      >
        {open ? "Hide details" : "Show details"}
      </button>

      {open && (
        <pre className="mt-2 max-h-[150px] overflow-auto rounded bg-black/5 p-2 text-[11px] whitespace-pre-wrap break-words">
          {JSON.stringify({ error, meta }, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default function AlertMessage({ response }: AlertMessageProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(Boolean(response));
  }, [response]);

  if (!response || !visible) return null;

  let message = "An unexpected error occurred.";
  let apiError: ApiError | undefined;
  let meta: TRequestMetadata | undefined;

  // SerializedError
  if ("message" in response && !("status" in response)) {
    message = response.message ?? message;
  }

  // FetchBaseQueryError
  else if ("status" in response) {
    const data = response.data;

    if (typeof data === "string") {
      message = data;
    } else if (isResponsePayload(data)) {
      message = data.message ?? message;
      meta = data.meta;

      if (typeof data.error === "string") {
        message = data.error;
      } else if (isApiError(data.error)) {
        apiError = data.error;
      }
    }
  }

  const fieldErrors = apiError?.errors ?? {};
  const hasFieldErrors = Object.keys(fieldErrors).length > 0;

  return (
    <div className="mb-2 flex items-start gap-3 rounded-xl border border-destructive/80 bg-destructive/10 p-4 text-destructive">
      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-destructive text-white">
        <AlertTriangle size={14} />
      </div>

      <div className="flex-1">
        <p className="text-sm font-semibold">{message}</p>

        {hasFieldErrors ? (
          <ErrorList errors={fieldErrors} />
        ) : (
          apiError?.title && <p className="mt-1 text-xs">{apiError.title}</p>
        )}

        {(apiError || meta) && <RawDetails error={apiError} meta={meta} />}
      </div>

      <button
        type="button"
        onClick={() => setVisible(false)}
        className="opacity-70 hover:opacity-100"
      >
        <X size={16} />
      </button>
    </div>
  );
}
