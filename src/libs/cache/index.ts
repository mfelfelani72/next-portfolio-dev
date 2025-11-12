import { indexDB } from "@/libs/cache/indexDB/IndexDB";
import { redisManager } from "@/libs/cache/redis/redis";

class UnifiedCache {
  private isOnline = true;

  constructor() {
    this.checkConnection();
  }

  private checkConnection() {
    if (typeof window !== "undefined") {
      this.isOnline = navigator.onLine;

      window.addEventListener("online", () => {
        this.isOnline = true;
      });

      window.addEventListener("offline", () => {
        this.isOnline = false;
      });
    }
  }

  // --- CREATE ---
  async create<T>(tableName: string, data: T): Promise<boolean> {
    try {
      const dbResult = await indexDB.create(tableName, {
        ...data,
        timestamp: new Date().getTime(),
      });

      if (!dbResult.success) return false;

      if (this.isOnline) {
        await this.syncTableToRedis(tableName);
      }

      return true;
    } catch (error) {
      console.error(`❌ Error creating data in ${tableName}:`, error);
      return false;
    }
  }

  // --- READ ---
  async read<T>(tableName: string, id: string | number): Promise<T | null> {
    try {
      const dbResult = await indexDB.read<T>(tableName, id);
      if (dbResult.success && dbResult.data) return dbResult.data;

      if (this.isOnline) {
        const redisData = await redisManager.getTableItem(tableName, id);
        if (redisData) {
          await indexDB.create(tableName, redisData);
          return redisData as T;
        }
      }

      return null;
    } catch (error) {
      console.error(`❌ Error reading from ${tableName}:`, error);
      return null;
    }
  }

  // --- READ ALL ---
  async readAll<T>(tableName: string): Promise<T[]> {
    try {
      const dbResult = await indexDB.readAll<T>(tableName);
      return dbResult.success ? dbResult.data || [] : [];
    } catch (error) {
      console.error(`❌ Error reading all from ${tableName}:`, error);
      return [];
    }
  }

  // --- UPDATE ---
  async update<T>(tableName: string, id: string | number, updates: Partial<T>): Promise<boolean> {
    try {
      const dbResult = await indexDB.update(tableName, id, updates);

      if (dbResult.success && this.isOnline) {
        await this.syncTableToRedis(tableName);
      }

      return dbResult.success;
    } catch (error) {
      console.error(`❌ Error updating ${tableName}:`, error);
      return false;
    }
  }

  // --- DELETE ---
  async delete(tableName: string, id: string | number): Promise<boolean> {
    try {
      const dbResult = await indexDB.delete(tableName, id);

      if (dbResult.success && this.isOnline) {
        await this.syncTableToRedis(tableName);
      }

      return dbResult.success;
    } catch (error) {
      console.error(`❌ Error deleting from ${tableName}:`, error);
      return false;
    }
  }

  // --- QUERY ---
  async query<T>(tableName: string, indexName: string, value: any): Promise<T[]> {
    try {
      const dbResult = await indexDB.query<T>(tableName, indexName, value);
      return dbResult.success ? dbResult.data || [] : [];
    } catch (error) {
      console.error(`❌ Error querying ${tableName}:`, error);
      return [];
    }
  }

  // --- SYNC TO REDIS ---
  async syncTableToRedis(tableName: string): Promise<boolean> {
    if (!this.isOnline) return false;

    try {
      const allData = await this.readAll(tableName);
      return await redisManager.setTableData(tableName, allData);
    } catch (error) {
      console.error(`❌ Error syncing ${tableName} to Redis:`, error);
      return false;
    }
  }

  // --- SYNC FROM REDIS ---
  async syncTableFromRedis(tableName: string): Promise<boolean> {
    if (!this.isOnline) return false;

    try {
      const redisData = await redisManager.getTableData(tableName);
      if (!redisData) return false;

      await indexDB.clear(tableName);

      for (const item of redisData) {
        await indexDB.create(tableName, item);
      }

      return true;
    } catch (error) {
      console.error(`❌ Error syncing ${tableName} from Redis:`, error);
      return false;
    }
  }
}

export const cache = new UnifiedCache();
