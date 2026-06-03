import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";

// Guestbook entries left by visitors of SarthakOS
export const guestbook = pgTable("guestbook", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Simple visit counter for the "System Monitor" app
export const visits = pgTable("visits", {
  id: serial("id").primaryKey(),
  count: integer("count").notNull().default(0),
});

export type Guestbook = typeof guestbook.$inferSelect;
export type NewGuestbook = typeof guestbook.$inferInsert;
