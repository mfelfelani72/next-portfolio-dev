export interface DBConfig {
  name: string;
  version: number;
  stores: StoreConfig[];
}

export interface StoreConfig {
  name: string;
  keyPath: string;
  autoIncrement?: boolean;
  indices?: IndexConfig[];
}

export interface IndexConfig {
  name: string;
  keyPath: string | string[];
  unique?: boolean;
  multiEntry?: boolean;
}

export interface OperationResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export function getDatabaseConfig(): DBConfig {
  const databaseName = process.env.NEXT_PUBLIC_DATABASE_NAME || "portfolio";
  const tableNames = process.env.NEXT_PUBLIC_TABLE_NAMES?.split(",") || [
    "user",
  ];

  const stores: StoreConfig[] = tableNames.map((tableName) => ({
    name: tableName.trim(),
    keyPath: "id",
    autoIncrement: true,
    indices: [
      { name: "timestamp", keyPath: "timestamp", unique: false },
      { name: "language", keyPath: "language", unique: false },
    ],
  }));

  return {
    name: databaseName,
    version: 1,
    stores,
  };
}
