/* eslint-disable @typescript-eslint/no-explicit-any */

export const removeEmptyKeys = <T extends Record<string, any>>(
  obj: T,
): Partial<T> => {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([_, value]) => value !== null && value !== undefined,
    ),
  ) as Partial<T>;
};
