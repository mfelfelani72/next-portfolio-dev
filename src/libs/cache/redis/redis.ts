import { createClient } from "redis";

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

      this.client.on("error", () => {
        this.isConnected = false;
      });

      this.client.on("ready", () => {
        this.isConnected = true;
      });

      await this.client.connect();

      const pingResult = await this.client.ping();
    } catch (error) {
      console.error("Redis initialization failed:", error);
      this.isConnected = false;
    }
  }

  async getData(table: string): Promise<any | null> {
    if (!this.isConnected || !this.client) {
      return null;
    }

    try {
      const data = await this.client.get(table);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Error getting data from Redis:", error);
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
      return false;
    }

    try {
      await this.client.set(table, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error("Error setting data to Redis:", error);
      return false;
    }
  }

  async initializeDefaultData(): Promise<void> {
    console.log("No default data initialized - set data manually if needed");
  }

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
      console.error(`Error getting item ${id} from ${tableName}:`, error);
      return null;
    }
  }

  async getTableData(tableName: string): Promise<any[] | null> {
    try {
      const data = await this.getData(tableName);
      if (!data) return null;

      return Array.isArray(data) ? data : Object.values(data);
    } catch (error) {
      console.error(`Error getting all data from ${tableName}:`, error);
      return null;
    }
  }

  async setTableData(tableName: string, data: any[]): Promise<boolean> {
    try {
      await this.setData(tableName, data);
      return true;
    } catch (error) {
      console.error(`Error setting table data for ${tableName}:`, error);
      return false;
    }
  }
}

export const redisManager = new RedisManager();

export const getData = (table: string) => redisManager.getData(table);
export const getDataByLanguage = (lang: string, table: string) =>
  redisManager.getDataByLanguage(lang, table);
export const setData = (table: string, data: MultiLanguageResume) =>
  redisManager.setData(table, data);
export const initializeDefaultData = () => redisManager.initializeDefaultData();
