import { DBConfig, OperationResult, getDatabaseConfig } from "@/libs/cache/indexDB/config";

export class IndexedDBManager {
  private db: IDBDatabase | null = null;
  private config: DBConfig;
  private isInitialized = false;
  private initPromise: Promise<void> | null = null;

  constructor(config: DBConfig) {
    this.config = config;
  }

  // ---------- CONNECT ----------
  async connect(): Promise<void> {
    if (this.initPromise) return this.initPromise;

    this.initPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(this.config.name, this.config.version);

      request.onerror = () => reject(new Error(`Database error: ${request.error}`));

      request.onsuccess = () => {
        this.db = request.result;
        this.isInitialized = true;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        this.config.stores.forEach((storeConfig) => {
          if (!db.objectStoreNames.contains(storeConfig.name)) {
            const objectStore = db.createObjectStore(storeConfig.name, {
              keyPath: storeConfig.keyPath,
              autoIncrement: storeConfig.autoIncrement || false,
            });

            storeConfig.indices?.forEach((indexConfig) => {
              objectStore.createIndex(indexConfig.name, indexConfig.keyPath, {
                unique: indexConfig.unique || false,
                multiEntry: indexConfig.multiEntry || false,
              });
            });
          }
        });
      };
    });

    return this.initPromise;
  }

  private async ensureConnected(): Promise<IDBDatabase> {
    if (!this.isInitialized) await this.connect();
    if (!this.db) throw new Error("Database not initialized");
    return this.db;
  }

  // ---------- CREATE ----------
  async create<T>(storeName: string, data: T): Promise<OperationResult<T>> {
    try {
      const db = await this.ensureConnected();
      if (!db.objectStoreNames.contains(storeName))
        return { success: false, error: `Store '${storeName}' not found` };

      return new Promise((resolve) => {
        const tx = db.transaction([storeName], "readwrite");
        const store = tx.objectStore(storeName);
        const req = store.add(data);

        req.onsuccess = () =>
          resolve({ success: true, data: { ...data, id: req.result } as T });
        req.onerror = () =>
          resolve({ success: false, error: `Create failed: ${req.error}` });
      });
    } catch (error) {
      return { success: false, error: `Connection error: ${error}` };
    }
  }

  // ---------- READ ----------
  async read<T>(storeName: string, key: IDBValidKey): Promise<OperationResult<T>> {
    try {
      const db = await this.ensureConnected();
      if (!db.objectStoreNames.contains(storeName))
        return { success: false, error: `Store '${storeName}' not found` };

      return new Promise((resolve) => {
        const tx = db.transaction([storeName], "readonly");
        const store = tx.objectStore(storeName);
        const req = store.get(key);

        req.onsuccess = () =>
          req.result
            ? resolve({ success: true, data: req.result as T })
            : resolve({ success: false, error: "Record not found" });
        req.onerror = () =>
          resolve({ success: false, error: `Read failed: ${req.error}` });
      });
    } catch (error) {
      return { success: false, error: `Connection error: ${error}` };
    }
  }

  // ---------- READ ALL ----------
  async readAll<T>(storeName: string): Promise<OperationResult<T[]>> {
    try {
      const db = await this.ensureConnected();
      if (!db.objectStoreNames.contains(storeName))
        return { success: false, error: `Store '${storeName}' not found` };

      return new Promise((resolve) => {
        const tx = db.transaction([storeName], "readonly");
        const store = tx.objectStore(storeName);
        const req = store.getAll();

        req.onsuccess = () => resolve({ success: true, data: req.result as T[] });
        req.onerror = () =>
          resolve({ success: false, error: `readAll failed: ${req.error}` });
      });
    } catch (error) {
      return { success: false, error: `Connection error: ${error}` };
    }
  }

  // ---------- UPDATE ----------
  async update<T>(storeName: string, key: IDBValidKey, data: T): Promise<OperationResult<T>> {
    try {
      const db = await this.ensureConnected();
      if (!db.objectStoreNames.contains(storeName))
        return { success: false, error: `Store '${storeName}' not found` };

      return new Promise((resolve) => {
        const tx = db.transaction([storeName], "readwrite");
        const store = tx.objectStore(storeName);
        const req = store.put(data);

        req.onsuccess = () => resolve({ success: true, data });
        req.onerror = () =>
          resolve({ success: false, error: `Update failed: ${req.error}` });
      });
    } catch (error) {
      return { success: false, error: `Connection error: ${error}` };
    }
  }

  // ---------- DELETE ----------
  async delete(storeName: string, key: IDBValidKey): Promise<OperationResult> {
    try {
      const db = await this.ensureConnected();
      if (!db.objectStoreNames.contains(storeName))
        return { success: false, error: `Store '${storeName}' not found` };

      return new Promise((resolve) => {
        const tx = db.transaction([storeName], "readwrite");
        const store = tx.objectStore(storeName);
        const req = store.delete(key);

        req.onsuccess = () => resolve({ success: true });
        req.onerror = () =>
          resolve({ success: false, error: `Delete failed: ${req.error}` });
      });
    } catch (error) {
      return { success: false, error: `Connection error: ${error}` };
    }
  }

  // ---------- QUERY ----------
  async query<T>(storeName: string, indexName: string, value: any): Promise<OperationResult<T[]>> {
    try {
      const db = await this.ensureConnected();
      if (!db.objectStoreNames.contains(storeName))
        return { success: false, error: `Store '${storeName}' not found` };

      return new Promise((resolve) => {
        const tx = db.transaction([storeName], "readonly");
        const store = tx.objectStore(storeName);
        const index = store.index(indexName);
        const req = index.getAll(value);

        req.onsuccess = () => resolve({ success: true, data: req.result as T[] });
        req.onerror = () =>
          resolve({ success: false, error: `Query failed: ${req.error}` });
      });
    } catch (error) {
      return { success: false, error: `Connection error: ${error}` };
    }
  }

  // ---------- CLEAR ----------
  async clear(storeName: string): Promise<OperationResult> {
    try {
      const db = await this.ensureConnected();
      if (!db.objectStoreNames.contains(storeName))
        return { success: false, error: `Store '${storeName}' not found` };

      return new Promise((resolve) => {
        const tx = db.transaction([storeName], "readwrite");
        const store = tx.objectStore(storeName);
        const req = store.clear();

        req.onsuccess = () => resolve({ success: true });
        req.onerror = () =>
          resolve({ success: false, error: `Clear failed: ${req.error}` });
      });
    } catch (error) {
      return { success: false, error: `Connection error: ${error}` };
    }
  }

  // ---------- UTILS ----------
  async storeExists(storeName: string): Promise<boolean> {
    try {
      const db = await this.ensureConnected();
      return db.objectStoreNames.contains(storeName);
    } catch {
      return false;
    }
  }

  async getStoreNames(): Promise<string[]> {
    try {
      const db = await this.ensureConnected();
      return Array.from(db.objectStoreNames);
    } catch {
      return [];
    }
  }
}

// ---------- SINGLETON ----------
const config = getDatabaseConfig();
export const indexDB = new IndexedDBManager(config);

if (typeof window !== "undefined") {
  indexDB.connect().catch(console.error);
}

export default IndexedDBManager;
