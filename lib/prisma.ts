import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

// pastikan env sudah dimuat
const databaseUrl = process.env.DATABASE_URL!;

const adapter = new PrismaBetterSqlite3({
    url: databaseUrl,
});

declare global {
    var prisma: PrismaClient | undefined;
}

const prisma = globalThis.prisma ?? new PrismaClient({ adapter });

// hanya cache instance di dev supaya gak bikin banyak instance
if (process.env.NODE_ENV !== "production") {
    globalThis.prisma = prisma;
}

export default prisma;
