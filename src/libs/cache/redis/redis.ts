import { createClient } from 'redis';

// Interfaces

import { MultiLanguageResume, ResumeData } from "@/Interfaces/portfolio";

export class RedisManager {
  private client: any = null;
  private isConnected: boolean = false;

  constructor() {
    this.initializeRedis();
  }

  private async initializeRedis() {
    try {
     
      this.client = createClient({
        socket: {
          host: process.env.NEXT_PUBLIC_REDIS_HOST,
          port: parseInt(process.env.NEXT_PUBLIC_REDIS_PORT!),
          connectTimeout: 5000,
        },
        password: process.env.NEXT_PUBLIC_REDIS_PASSWORD,
      });

      this.client.on('error', (error: Error) => {
        console.error('❌ Redis error:', error.message);
        this.isConnected = false;
      });

      this.client.on('connect', () => {
        console.log('🔌 Redis connected');
      });

      this.client.on('ready', () => {
        console.log('✅ Redis ready');
        this.isConnected = true;
      });

      await this.client.connect();
      
      // تست اتصال
      const pingResult = await this.client.ping();
      console.log('✅ Redis test PING:', pingResult);
      
    } catch (error) {
      console.error('❌ Redis initialization failed:', error);
      this.isConnected = false;
    }
  }

  // --- Base CRUD Functions ---

  async getData(table: string): Promise<any | null> {
    if (!this.isConnected || !this.client) {
      console.log('⚠️ Redis not connected, returning null');
      return null;
    }

    try {
      const data = await this.client.get(table);
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
    if (!this.isConnected || !this.client) {
      console.log('⚠️ Redis not connected, not saving');
      return false;
    }

    try {
      await this.client.set(table, JSON.stringify(data));
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

      if (Array.isArray(allData)) {
        return allData.find((item: any) => item.id === id) || null;
      }

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