export function setItem(key: string, value: unknown) {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

export function getItem<T = unknown>(key: string): T | null {
  if (typeof window !== "undefined") {
    const item = localStorage.getItem(key);
    try {
      return item ? (JSON.parse(item) as T) : null;
    } catch {
      return null;
    }
  }
  return null;
}
