import Redis from "ioredis";

// Interfaces
import { MultiLanguageResume, ResumeData } from "@/Interfaces/portfolio";
const redisUrl = `redis://:${process.env.NEXT_PUBLIC_REDIS_PASSWORD}@${process.env.NEXT_PUBLIC_REDIS_HOST}:${process.env.NEXT_PUBLIC_REDIS_PORT}`;

console.log(redisUrl);

export class RedisManager {
  private redis: Redis;

  constructor() {
    const redisUrl = `redis://:${process.env.NEXT_PUBLIC_REDIS_PASSWORD}@${process.env.NEXT_PUBLIC_REDIS_HOST}:${process.env.NEXT_PUBLIC_REDIS_PORT}`;

    console.log(redisUrl);

    this.redis = new Redis(redisUrl);
  }

  // --- Base CRUD Functions ---

  async getData(table: string): Promise<any | null> {
    try {
      const data = await this.redis.get(table);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("❌ Error getting data from Redis:", error);
      return null;
    }
  }

  async getDataByLanguage(
    lang: string,
    table: string
  ): Promise<ResumeData | null> {
    const data = await this.getData(table);
    return data?.[lang] || null;
  }

  async setData(table: string, data: any): Promise<boolean> {
    try {
      await this.redis.set(table, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error("❌ Error setting data to Redis:", error);
      return false;
    }
  }

  async initializeDefaultData(): Promise<void> {
    console.log("ℹ️ No default data initialized - set data manually if needed");
  }

  // --- UnifiedCache Support Methods ---

  async getTableItem(
    tableName: string,
    id: string | number
  ): Promise<any | null> {
    try {
      const allData = await this.getData(tableName);
      if (!allData) return null;

      // در صورتی که داده‌ها آرایه باشند
      if (Array.isArray(allData)) {
        return allData.find((item: any) => item.id === id) || null;
      }

      // در صورتی که داده‌ها آبجکت باشند
      return allData[id] || null;
    } catch (error) {
      console.error(`❌ Error getting item ${id} from ${tableName}:`, error);
      return null;
    }
  }

  async getTableData(tableName: string): Promise<any[] | null> {
    try {
      const data = await this.getData(tableName);
      if (!data) return null;

      return Array.isArray(data) ? data : Object.values(data);
    } catch (error) {
      console.error(`❌ Error getting all data from ${tableName}:`, error);
      return null;
    }
  }

  async setTableData(tableName: string, data: any[]): Promise<boolean> {
    try {
      await this.setData(tableName, data);
      return true;
    } catch (error) {
      console.error(`❌ Error setting table data for ${tableName}:`, error);
      return false;
    }
  }
}

// --- Singleton Export ---
export const redisManager = new RedisManager();

// Optional short helpers
export const getData = (table: string) => redisManager.getData(table);
export const getDataByLanguage = (lang: string, table: string) =>
  redisManager.getDataByLanguage(lang, table);
export const setData = (table: string, data: MultiLanguageResume) =>
  redisManager.setData(table, data);
export const initializeDefaultData = () => redisManager.initializeDefaultData();
