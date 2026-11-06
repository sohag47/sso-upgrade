declare module "next/cache" {
  /**
   * Revalidate a cache tag. Some Next versions have different typings —
   * allow an optional second argument for compatibility.
   */
  export function revalidateTag(tag: string, mode?: string): Promise<void>;

  export function revalidatePath(path: string): Promise<void>;
  export function updateTag(tag: string): Promise<void>;
}
