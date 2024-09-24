export interface Redis {
  set(key: string, value: string, expiration: number): Promise<void>
  get(key: string): Promise<string | null>
}
