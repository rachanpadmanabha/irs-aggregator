/**
 * Storage abstraction layer
 * Allows swapping localStorage with IndexedDB or backend API
 */
export interface StorageAdapter {
  save(key: string, data: unknown): Promise<void>;
  load<T>(key: string): Promise<T | null>;
  clear(key: string): Promise<void>;
  clearAll(): Promise<void>;
  sync(): Promise<void>;  // Cross-tab sync
}
