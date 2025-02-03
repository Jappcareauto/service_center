export interface Collection<T> {
  entities: Record<string, T>;
  ids: string[];
}
