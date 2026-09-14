/* Minimal class-name joiner (shadcn's `cn`), dependency-free.
   Filters out falsy values and joins the rest with spaces. */
export function cn(
  ...classes: Array<string | number | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}
