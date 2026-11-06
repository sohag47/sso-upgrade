import type { ReactNode } from "react";

type DataNotFoundProps = {
  className?: string;
  title?: string;
  description?: string;
  action?: ReactNode; // optional button or link
};

const DataNotFound = ({
  className = "",
  title = "No Data Found",
  description = "No records are currently available.",
  action,
}: DataNotFoundProps) => {
  return (
    <div
      className={` flex w-full flex-col items-center justify-center gap-4 bg-background px-6 py-14 text-center dark:border-gray-700 ${className}`}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-background shadow-sm ">
        <svg
          className="h-10 w-10 text-gray-400 dark:text-gray-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5v6c0 1.7 4 3 9 3s9-1.3 9-3V5" />
          <path d="M3 11v6c0 1.7 4 3 9 3s9-1.3 9-3v-6" />
        </svg>
      </div>

      <div>
        <h3 className="text-base font-semibold text-gray-500 dark:text-gray-400">
          {title}
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </div>

      {action && <div className="mt-2">{action}</div>}
    </div>
  );
};

export default DataNotFound;
