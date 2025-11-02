import Redis from "ioredis";

// Interfaces

import { MultiLanguageResume, ResumeData } from "@/Interfaces/portfolio";

//  Classes

export class RedisManager {
  private redis: Redis;

  constructor() {
    this.redis = new Redis(
      process.env.NEXT_PUBLIC_REDIS_URL || "redis://localhost:6379"
    );
  }

  // Functions

  async getData(table: string): Promise<MultiLanguageResume | null> {
    try {
      const data = await this.redis.get(table);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Error getting resume data:", error);
      return null;
    }
  }

  async getResumeByLanguage(
    lang: string,
    table: string
  ): Promise<ResumeData | null> {
    const data = await this.getData(table);
    return data?.[lang] || null;
  }

  async setData(table: string, data: MultiLanguageResume): Promise<boolean> {
    try {
      await this.redis.set(table, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error("Error setting resume data:", error);
      return false;
    }
  }

  async initializeDefaultData(): Promise<void> {
    console.log("No default data initialized - data must be set manually");
  }
}

export const redisManager = new RedisManager();

export const getData = (table: string) => redisManager.getData(table);
export const getResumeByLanguage = (lang: string, table: string) =>
  redisManager.getResumeByLanguage(lang, table);
export const setData = (table: string, data: MultiLanguageResume) =>
  redisManager.setData(table, data);
export const initializeDefaultData = () => redisManager.initializeDefaultData();
