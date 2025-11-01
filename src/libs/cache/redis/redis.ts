import Redis from 'ioredis';
import { MultiLanguageResume, ResumeData } from '@/Interfaces/portfolio';

const redis = new Redis(process.env.NEXT_PUBLIC_REDIS_URL || 'redis://localhost:6379');

export class RedisManager {
  private redis: Redis;

  constructor() {
    this.redis = new Redis(process.env.NEXT_PUBLIC_REDIS_URL || 'redis://localhost:6379');
  }

  // ============ Resume Specific Methods ============

  async getResumeData(): Promise<MultiLanguageResume | null> {
    try {
      const data = await this.redis.get('resume');
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error getting resume data:', error);
      return null;
    }
  }

  async getResumeByLanguage(lang: string): Promise<ResumeData | null> {
    const data = await this.getResumeData();
    return data?.[lang] || null;
  }

  async setResumeData(data: MultiLanguageResume): Promise<boolean> {
    try {
      await this.redis.set('resume', JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Error setting resume data:', error);
      return false;
    }
  }

  async initializeDefaultData(): Promise<void> {
    // هیچ داده پیش‌فرضی ایجاد نمی‌کنیم
    // فقط برای compatibility با کد موجود
    console.log('No default data initialized - data must be set manually');
  }
}

export const redisManager = new RedisManager();

// Export توابع برای استفاده مستقیم
export const getResumeData = () => redisManager.getResumeData();
export const getResumeByLanguage = (lang: string) => redisManager.getResumeByLanguage(lang);
export const setResumeData = (data: MultiLanguageResume) => redisManager.setResumeData(data);
export const initializeDefaultData = () => redisManager.initializeDefaultData();