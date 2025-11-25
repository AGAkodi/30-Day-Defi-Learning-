import { sql } from "drizzle-orm";
import { pgTable, text, varchar, serial, integer, boolean, timestamp, date, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const sessions = pgTable("sessions", {
  sid: varchar("sid").primaryKey(),
  sess: jsonb("sess").notNull(),
  expire: timestamp("expire").notNull(),
});

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: varchar("username").unique().notNull(),
  email: varchar("email").unique().notNull(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const dailyLessons = pgTable("daily_lessons", {
  id: serial("id").primaryKey(),
  dayNumber: integer("day_number").notNull().unique(),
  weekNumber: integer("week_number").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  readingLinks: text("reading_links").array().notNull(),
  tasks: text("tasks").array().notNull(),
  quizQuestions: jsonb("quiz_questions").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const userProgress = pgTable("user_progress", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id),
  dayNumber: integer("day_number").notNull(),
  completedTasks: text("completed_tasks").array().notNull().default(sql`ARRAY[]::text[]`),
  notes: text("notes"),
  quizScore: integer("quiz_score"),
  completed: boolean("completed").notNull().default(false),
  completedAt: timestamp("completed_at"),
});

export const streaks = pgTable("streaks", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().unique().references(() => users.id),
  currentStreak: integer("current_streak").notNull().default(0),
  lastCompletedDay: integer("last_completed_day"),
  lastActiveDate: date("last_active_date"),
  longestStreak: integer("longest_streak").notNull().default(0),
});

export const weeklyReviews = pgTable("weekly_reviews", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id),
  weekNumber: integer("week_number").notNull(),
  reviewNotes: text("review_notes"),
  quizScore: integer("quiz_score"),
  completed: boolean("completed").notNull().default(false),
  completedAt: timestamp("completed_at"),
});

export const dailyQuiz = pgTable("daily_quiz", {
  id: serial("id").primaryKey(),
  dayNumber: integer("day_number").notNull().unique().references(() => dailyLessons.dayNumber),
  weekNumber: integer("week_number").notNull(),
  questions: jsonb("questions").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const weeklyQuizResults = pgTable("weekly_quiz_results", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id),
  weekNumber: integer("week_number").notNull(),
  score: integer("score").notNull(),
  totalQuestions: integer("total_questions").notNull().default(40),
  missedQuestions: jsonb("missed_questions").notNull(),
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
});

export const quizQuestion = z.object({
  id: z.string(),
  type: z.enum(["mcq", "truefalse", "short", "scenario"]),
  question: z.string(),
  options: z.array(z.string()).optional(),
  correctAnswer: z.string(),
  explanation: z.string().optional(),
  difficulty: z.enum(["easy", "medium", "hard"]).default("easy"),
});

export type QuizQuestion = z.infer<typeof quizQuestion>;

export const insertUserSchema = createInsertSchema(users).omit({
  createdAt: true,
  updatedAt: true,
});

export const upsertUserSchema = createInsertSchema(users).omit({
  createdAt: true,
  updatedAt: true,
});

export const insertDailyLessonSchema = createInsertSchema(dailyLessons).omit({
  id: true,
  createdAt: true,
});

export const insertUserProgressSchema = createInsertSchema(userProgress).omit({
  id: true,
});

export const insertStreakSchema = createInsertSchema(streaks).omit({
  id: true,
});

export const insertWeeklyReviewSchema = createInsertSchema(weeklyReviews).omit({
  id: true,
});

export const insertDailyQuizSchema = createInsertSchema(dailyQuiz).omit({
  id: true,
  createdAt: true,
});

export const insertWeeklyQuizResultsSchema = createInsertSchema(weeklyQuizResults).omit({
  id: true,
  submittedAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type UpsertUser = z.infer<typeof upsertUserSchema>;
export type User = typeof users.$inferSelect;

export const signupSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters").max(50),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;

export type InsertDailyLesson = z.infer<typeof insertDailyLessonSchema>;
export type DailyLesson = typeof dailyLessons.$inferSelect;

export type InsertUserProgress = z.infer<typeof insertUserProgressSchema>;
export type UserProgress = typeof userProgress.$inferSelect;

export type InsertStreak = z.infer<typeof insertStreakSchema>;
export type Streak = typeof streaks.$inferSelect;

export type InsertWeeklyReview = z.infer<typeof insertWeeklyReviewSchema>;
export type WeeklyReview = typeof weeklyReviews.$inferSelect;

export type InsertDailyQuiz = z.infer<typeof insertDailyQuizSchema>;
export type DailyQuiz = typeof dailyQuiz.$inferSelect;

export type InsertWeeklyQuizResults = z.infer<typeof insertWeeklyQuizResultsSchema>;
export type WeeklyQuizResults = typeof weeklyQuizResults.$inferSelect;
