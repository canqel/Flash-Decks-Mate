export function isNullOrWhitespace(value: string): boolean {
  return value == null || value.trim().length === 0;
}