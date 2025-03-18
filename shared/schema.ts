import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name").notNull(),
  role: text("role").notNull().default("user"),
  neonMode: boolean("neon_mode").default(false),
});

export const educationResources = pgTable("education_resources", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  type: text("type").notNull(),
  description: text("description").notNull(),
  completed: boolean("completed").default(false),
});

export const familyTasks = pgTable("family_tasks", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  priority: text("priority").notNull(),
  dueDate: timestamp("due_date"),
  completed: boolean("completed").default(false),
});

export const wellbeingLogs = pgTable("wellbeing_logs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  mood: text("mood").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  fullName: true,
}).extend({
  password: z.string().min(8, "Password must be at least 8 characters"),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type EducationResource = typeof educationResources.$inferSelect;
export type FamilyTask = typeof familyTasks.$inferSelect;
export type WellbeingLog = typeof wellbeingLogs.$inferSelect;
