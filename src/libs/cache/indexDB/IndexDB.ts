import { DBConfig, OperationResult } from './config';

class IndexedDBManager {
  private db: IDBDatabase | null = null;
  private config: DBConfig;
  private isInitialized = false;
  private initPromise: Promise<void> | null = null;

  constructor(config: DBConfig) {
    this.config = config;
  }

  async connect(): Promise<void> {
    if (this.initPromise) {
      return this.initPromise;
    }

    this.initPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(this.config.name, this.config.version);

      request.onerror = () => {
        reject(new Error(`Database error: ${request.error}`));
      };
      
      request.onsuccess = () => {
        this.db = request.result;
        this.isInitialized = true;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        this.config.stores.forEach(storeConfig => {
          if (!db.objectStoreNames.contains(storeConfig.name)) {
            const objectStore = db.createObjectStore(
              storeConfig.name, 
              { 
                keyPath: storeConfig.keyPath,
                autoIncrement: storeConfig.autoIncrement || false 
              }
            );

            storeConfig.indices?.forEach(indexConfig => {
              objectStore.createIndex(
                indexConfig.name,
                indexConfig.keyPath,
                { 
                  unique: indexConfig.unique || false,
                  multiEntry: indexConfig.multiEntry || false 
                }
              );
            });
          }
        });
      };
    });

    return this.initPromise;
  }

  private async ensureConnected(): Promise<IDBDatabase> {
    if (!this.isInitialized) {
      await this.connect();
    }
    if (!this.db) {
      throw new Error('Database not initialized');
    }
    return this.db;
  }

  // CREATE
  async create<T>(storeName: string, data: T): Promise<OperationResult<T>> {
    try {
      const db = await this.ensureConnected();
      
      if (!db.objectStoreNames.contains(storeName)) {
        return { 
          success: false, 
          error: `Store '${storeName}' not found` 
        };
      }
      
      return new Promise((resolve) => {
        const transaction = db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        
        const request = store.add(data);
        
        request.onsuccess = () => {
          resolve({ 
            success: true, 
            data: { ...data, id: request.result } as T 
          });
        };
        
        request.onerror = () => {
          resolve({ 
            success: false, 
            error: `Failed to create: ${request.error}` 
          });
        };
      });
    } catch (error) {
      return { 
        success: false, 
        error: `Connection error: ${error}` 
      };
    }
  }

  // READ
  async read<T>(storeName: string, key: IDBValidKey): Promise<OperationResult<T>> {
    try {
      const db = await this.ensureConnected();
      
      if (!db.objectStoreNames.contains(storeName)) {
        return { 
          success: false, 
          error: `Store '${storeName}' not found` 
        };
      }
      
      return new Promise((resolve) => {
        const transaction = db.transaction([storeName], 'readonly');
        const store = transaction.objectStore(storeName);
        
        const request = store.get(key);
        
        request.onsuccess = () => {
          if (request.result) {
            resolve({ success: true, data: request.result as T });
          } else {
            resolve({ success: false, error: 'Record not found' });
          }
        };
        
        request.onerror = () => {
          resolve({ success: false, error: `Failed to read: ${request.error}` });
        };
      });
    } catch (error) {
      return { success: false, error: `Connection error: ${error}` };
    }
  }

  // UPDATE - این متد رو اضافه کردم
  async update<T>(storeName: string, key: IDBValidKey, data: T): Promise<OperationResult<T>> {
    try {
      const db = await this.ensureConnected();
      
      if (!db.objectStoreNames.contains(storeName)) {
        return { 
          success: false, 
          error: `Store '${storeName}' not found` 
        };
      }
      
      return new Promise((resolve) => {
        const transaction = db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        
        // از put استفاده می‌کنیم که هم update کنه هم create
        const request = store.put(data);
        
        request.onsuccess = () => {
          resolve({ 
            success: true, 
            data: data 
          });
        };
        
        request.onerror = () => {
          resolve({ 
            success: false, 
            error: `Failed to update: ${request.error}` 
          });
        };
      });
    } catch (error) {
      return { 
        success: false, 
        error: `Connection error: ${error}` 
      };
    }
  }

  // DELETE
  async delete(storeName: string, key: IDBValidKey): Promise<OperationResult> {
    try {
      const db = await this.ensureConnected();
      
      if (!db.objectStoreNames.contains(storeName)) {
        return { 
          success: false, 
          error: `Store '${storeName}' not found` 
        };
      }
      
      return new Promise((resolve) => {
        const transaction = db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        
        const request = store.delete(key);
        
        request.onsuccess = () => {
          resolve({ success: true });
        };
        
        request.onerror = () => {
          resolve({ success: false, error: `Failed to delete: ${request.error}` });
        };
      });
    } catch (error) {
      return { success: false, error: `Connection error: ${error}` };
    }
  }

  async storeExists(storeName: string): Promise<boolean> {
    try {
      const db = await this.ensureConnected();
      return db.objectStoreNames.contains(storeName);
    } catch (error) {
      return false;
    }
  }

  async getStoreNames(): Promise<string[]> {
    try {
      const db = await this.ensureConnected();
      return Array.from(db.objectStoreNames);
    } catch (error) {
      return [];
    }
  }
}

// ایجاد نمونه
import { getDatabaseConfig } from './config';
const config = getDatabaseConfig();
export const indexDB = new IndexedDBManager(config);

// اتصال خودکار
indexDB.connect().catch(console.error);

export default IndexedDBManager;