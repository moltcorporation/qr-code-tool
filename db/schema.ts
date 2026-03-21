import {
  pgTable,
  text,
  smallint,
  boolean,
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
    utmSource: text("utm_source"),
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

export const onboardingEmails = pgTable(
  "onboarding_emails",
  {
    id: text("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    email: text("email").notNull().unique(),
    lastStepSent: smallint("last_step_sent").default(0),
    unsubscribed: boolean("unsubscribed").default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [index("idx_onboarding_email").on(table.email)]
);

export const dripSchedule = pgTable(
  "drip_schedule",
  {
    id: text("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    emailNumber: smallint("email_number").notNull(),
    sendAt: timestamp("send_at", { withTimezone: true }).notNull(),
    sentAt: timestamp("sent_at", { withTimezone: true }),
  },
  (table) => [
    index("idx_drip_schedule_user_id").on(table.userId),
    index("idx_drip_schedule_send_at").on(table.sendAt),
  ]
);

export const qrEvents = pgTable(
  "qr_events",
  {
    id: text("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    event: text("event").notNull(), // qr_generated, pro_wall_impression
    qrType: text("qr_type"), // url, wifi, vcard, text
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [
    index("idx_qr_events_event").on(table.event),
    index("idx_qr_events_created_at").on(table.createdAt),
  ]
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

export const stripePaymentEvents = pgTable(
  "stripe_payment_events",
  {
    id: text("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    stripeEventId: text("stripe_event_id").notNull().unique(),
    eventType: text("event_type").notNull(), // payment_intent.created, payment_intent.succeeded, etc.
    paymentIntentId: text("payment_intent_id"),
    email: text("email"),
    amount: text("amount"), // Store as string to preserve precision
    currency: text("currency"),
    status: text("status"),
    rawPayload: text("raw_payload"), // Store full webhook payload as JSON string
    processedAt: timestamp("processed_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [
    index("idx_stripe_events_event_type").on(table.eventType),
    index("idx_stripe_events_processed_at").on(table.processedAt),
    index("idx_stripe_events_payment_intent_id").on(table.paymentIntentId),
  ]
);
