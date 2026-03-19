import {
  pgTable,
  serial,
  text,
  timestamp,
  index,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const users = pgTable(
  "users",
  {
    id: text("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    email: text("email").notNull().unique(),
    passwordHash: text("password_hash").notNull(),
    plan: text("plan").notNull().default("free"), // free, pro, premium
    stripeCustomerId: text("stripe_customer_id"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [index("idx_users_email").on(table.email)]
);

export const qrCodes = pgTable(
  "qr_codes",
  {
    id: text("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
    shortCode: text("short_code").notNull().unique(),
    destinationUrl: text("destination_url").notNull(),
    title: text("title"),
    type: text("type").notNull().default("static"), // static, dynamic
    fgColor: text("fg_color").notNull().default("#000000"),
    bgColor: text("bg_color").notNull().default("#ffffff"),
    errorCorrection: text("error_correction").notNull().default("M"), // L, M, Q, H
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [
    index("idx_qr_codes_user_id").on(table.userId),
    index("idx_qr_codes_short_code").on(table.shortCode),
  ]
);

export const feedback = pgTable(
  "feedback",
  {
    id: text("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    email: text("email"),
    category: text("category").notNull().default("general"), // bug, feature, general
    intent: text("intent"), // what were you hoping to do?
    message: text("message").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
);

export const passwordResetTokens = pgTable(
  "password_reset_tokens",
  {
    id: text("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    token: text("token").notNull().unique(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    usedAt: timestamp("used_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [index("idx_password_reset_tokens_token").on(table.token)]
);

export const emailSubscribers = pgTable(
  "email_subscribers",
  {
    id: serial("id").primaryKey(),
    email: text("email").notNull().unique(),
    source: text("source"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [index("idx_email_subscribers_email").on(table.email)]
);

export const scans = pgTable(
  "scans",
  {
    id: text("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    qrCodeId: text("qr_code_id")
      .notNull()
      .references(() => qrCodes.id, { onDelete: "cascade" }),
    scannedAt: timestamp("scanned_at", { withTimezone: true }).defaultNow(),
    userAgent: text("user_agent"),
    acceptLanguage: text("accept_language"),
    referrer: text("referrer"),
    ipHash: text("ip_hash"),
  },
  (table) => [
    index("idx_scans_qr_code_id").on(table.qrCodeId),
    index("idx_scans_scanned_at").on(table.scannedAt),
  ]
);
