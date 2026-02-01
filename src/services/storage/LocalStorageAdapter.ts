import type { StorageAdapter } from './StorageAdapter';

const STORAGE_PREFIX = 'k2_part2_';

/**
 * LocalStorage implementation with BroadcastChannel for cross-tab sync
 */
export class LocalStorageAdapter implements StorageAdapter {
  private channel: BroadcastChannel;
  private listeners: Set<(key: string, data: unknown) => void> = new Set();

  constructor() {
    // Create broadcast channel for cross-tab communication
    this.channel = new BroadcastChannel('k2_storage_sync');
    
    // Listen for updates from other tabs
    this.channel.onmessage = (event) => {
      const { key, data } = event.data;
      this.notifyListeners(key, data);
    };
  }

  async save(key: string, data: unknown): Promise<void> {
    const storageKey = STORAGE_PREFIX + key;
    localStorage.setItem(storageKey, JSON.stringify(data));
    
    // Broadcast to other tabs
    this.channel.postMessage({ key, data });
  }

  async load<T>(key: string): Promise<T | null> {
    const storageKey = STORAGE_PREFIX + key;
    const item = localStorage.getItem(storageKey);
    
    if (!item) return null;
    
    try {
      return JSON.parse(item) as T;
    } catch (error) {
      console.error('Failed to parse storage item:', error);
      return null;
    }
  }

  async clear(key: string): Promise<void> {
    const storageKey = STORAGE_PREFIX + key;
    localStorage.removeItem(storageKey);
    
    // Broadcast to other tabs
    this.channel.postMessage({ key, data: null });
  }

  async clearAll(): Promise<void> {
    const keys = Object.keys(localStorage).filter(k => k.startsWith(STORAGE_PREFIX));
    keys.forEach(key => localStorage.removeItem(key));
    
    // Broadcast to other tabs
    this.channel.postMessage({ key: '__ALL__', data: null });
  }

  async sync(): Promise<void> {
    // Sync is automatic via BroadcastChannel
    // This method is here for interface compatibility
  }

  /**
   * Add a listener for storage changes from other tabs
   */
  addListener(listener: (key: string, data: unknown) => void): void {
    this.listeners.add(listener);
  }

  /**
   * Remove a listener
   */
  removeListener(listener: (key: string, data: unknown) => void): void {
    this.listeners.delete(listener);
  }

  private notifyListeners(key: string, data: unknown): void {
    this.listeners.forEach(listener => listener(key, data));
  }

  /**
   * Close the broadcast channel (cleanup)
   */
  close(): void {
    this.channel.close();
  }
}

// Singleton instance
export const storage = new LocalStorageAdapter();
