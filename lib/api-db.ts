import { PrismaClient } from '@/app/generated/client/client';
import { PrismaBunSqlite } from 'prisma-adapter-bun-sqlite';
import path from 'path';

// Use a global variable to prevent multiple instances of Prisma Client in development
const globalForApiPrisma = global as unknown as { apiPrisma: PrismaClient };

let apiPrismaInstance: PrismaClient;

if (globalForApiPrisma.apiPrisma) {
  apiPrismaInstance = globalForApiPrisma.apiPrisma;
} else {
  const dbPath = path.join(process.cwd(), 'data/db.sqlite3');
  const adapter = new PrismaBunSqlite({
    url: `file:${dbPath}`,
  });
  apiPrismaInstance = new PrismaClient({ adapter });
}

export const apiPrisma = apiPrismaInstance;

if (process.env.NODE_ENV !== 'production') globalForApiPrisma.apiPrisma = apiPrisma;