// DO NOT MODIFY — pre-configured database connection.
// Database client. Import in API routes: import { db } from "@/db";
// Query example: const rows = await db.select().from(posts);

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import type { NeonHttpDatabase } from "drizzle-orm/neon-http";
import * as schema from "./schema";

let _db: NeonHttpDatabase<typeof schema> | null = null;

export const db = new Proxy({} as NeonHttpDatabase<typeof schema>, {
  get(_target, prop) {
    if (!_db) {
      if (!process.env.DATABASE_URL) {
        throw new Error("DATABASE_URL is not set");
      }
      const sql = neon(process.env.DATABASE_URL);
      _db = drizzle(sql, { schema });
    }
    return (_db as any)[prop];
  },
});