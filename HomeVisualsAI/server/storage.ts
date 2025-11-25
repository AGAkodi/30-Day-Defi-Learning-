import { 
  users, 
  dailyLessons,
  userProgress,
  streaks,
  weeklyReviews,
  dailyQuiz,
  weeklyQuizResults,
  type User, 
  type InsertUser,
  type UpsertUser,
  type DailyLesson,
  type InsertDailyLesson,
  type UserProgress,
  type InsertUserProgress,
  type Streak,
  type InsertStreak,
  type WeeklyReview,
  type InsertWeeklyReview,
  type DailyQuiz,
  type InsertDailyQuiz,
  type WeeklyQuizResults,
  type InsertWeeklyQuizResults
} from "@shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  getDailyLesson(dayNumber: number): Promise<DailyLesson | undefined>;
  getLessonsByWeek(weekNumber: number): Promise<DailyLesson[]>;
  getAllLessons(): Promise<DailyLesson[]>;
  createDailyLesson(lesson: InsertDailyLesson): Promise<DailyLesson>;
  
  getUserProgress(userId: string, dayNumber: number): Promise<UserProgress | undefined>;
  getUserProgressByWeek(userId: string, weekNumber: number): Promise<UserProgress[]>;
  getAllUserProgress(userId: string): Promise<UserProgress[]>;
  createOrUpdateProgress(progress: InsertUserProgress): Promise<UserProgress>;
  
  getStreak(userId: string): Promise<Streak | undefined>;
  createOrUpdateStreak(streak: InsertStreak): Promise<Streak>;
  
  getWeeklyReview(userId: string, weekNumber: number): Promise<WeeklyReview | undefined>;
  createWeeklyReview(review: InsertWeeklyReview): Promise<WeeklyReview>;
  
  getDailyQuiz(dayNumber: number): Promise<DailyQuiz | undefined>;
  createOrUpdateDailyQuiz(quiz: InsertDailyQuiz): Promise<DailyQuiz>;
  
  createWeeklyQuizResult(result: InsertWeeklyQuizResults): Promise<WeeklyQuizResults>;
  getWeeklyQuizResult(userId: string, weekNumber: number): Promise<WeeklyQuizResults | undefined>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async getDailyLesson(dayNumber: number): Promise<DailyLesson | undefined> {
    const [lesson] = await db
      .select()
      .from(dailyLessons)
      .where(eq(dailyLessons.dayNumber, dayNumber));
    return lesson || undefined;
  }

  async getLessonsByWeek(weekNumber: number): Promise<DailyLesson[]> {
    return db
      .select()
      .from(dailyLessons)
      .where(eq(dailyLessons.weekNumber, weekNumber));
  }

  async getAllLessons(): Promise<DailyLesson[]> {
    return db.select().from(dailyLessons);
  }

  async createDailyLesson(lesson: InsertDailyLesson): Promise<DailyLesson> {
    const [created] = await db.insert(dailyLessons).values(lesson).returning();
    return created;
  }

  async getUserProgress(userId: string, dayNumber: number): Promise<UserProgress | undefined> {
    const [progress] = await db
      .select()
      .from(userProgress)
      .where(and(eq(userProgress.userId, userId), eq(userProgress.dayNumber, dayNumber)));
    return progress || undefined;
  }

  async getUserProgressByWeek(userId: string, weekNumber: number): Promise<UserProgress[]> {
    const lessons = await this.getLessonsByWeek(weekNumber);
    const dayNumbers = lessons.map(l => l.dayNumber);
    
    if (dayNumbers.length === 0) return [];
    
    // Get progress for all days in this week
    const allProgress = await db
      .select()
      .from(userProgress)
      .where(eq(userProgress.userId, userId));
    
    return allProgress.filter(p => dayNumbers.includes(p.dayNumber));
  }

  async getAllUserProgress(userId: string): Promise<UserProgress[]> {
    return db
      .select()
      .from(userProgress)
      .where(eq(userProgress.userId, userId));
  }

  async createOrUpdateProgress(progress: InsertUserProgress): Promise<UserProgress> {
    const existing = await this.getUserProgress(progress.userId, progress.dayNumber);
    
    if (existing) {
      const [updated] = await db
        .update(userProgress)
        .set(progress)
        .where(and(
          eq(userProgress.userId, progress.userId),
          eq(userProgress.dayNumber, progress.dayNumber)
        ))
        .returning();
      return updated;
    } else {
      const [created] = await db.insert(userProgress).values(progress).returning();
      return created;
    }
  }

  async getStreak(userId: string): Promise<Streak | undefined> {
    const [streak] = await db
      .select()
      .from(streaks)
      .where(eq(streaks.userId, userId));
    return streak || undefined;
  }

  async createOrUpdateStreak(streakData: InsertStreak): Promise<Streak> {
    const existing = await this.getStreak(streakData.userId);
    
    if (existing) {
      const [updated] = await db
        .update(streaks)
        .set(streakData)
        .where(eq(streaks.userId, streakData.userId))
        .returning();
      return updated;
    } else {
      const [created] = await db.insert(streaks).values(streakData).returning();
      return created;
    }
  }

  async getWeeklyReview(userId: string, weekNumber: number): Promise<WeeklyReview | undefined> {
    const [review] = await db
      .select()
      .from(weeklyReviews)
      .where(and(
        eq(weeklyReviews.userId, userId),
        eq(weeklyReviews.weekNumber, weekNumber)
      ));
    return review || undefined;
  }

  async createWeeklyReview(review: InsertWeeklyReview): Promise<WeeklyReview> {
    const [created] = await db.insert(weeklyReviews).values(review).returning();
    return created;
  }

  async getDailyQuiz(dayNumber: number): Promise<DailyQuiz | undefined> {
    const [quiz] = await db
      .select()
      .from(dailyQuiz)
      .where(eq(dailyQuiz.dayNumber, dayNumber));
    return quiz || undefined;
  }

  async createOrUpdateDailyQuiz(quizData: InsertDailyQuiz): Promise<DailyQuiz> {
    const existing = await this.getDailyQuiz(quizData.dayNumber);
    
    if (existing) {
      const [updated] = await db
        .update(dailyQuiz)
        .set(quizData)
        .where(eq(dailyQuiz.dayNumber, quizData.dayNumber))
        .returning();
      return updated;
    } else {
      const [created] = await db.insert(dailyQuiz).values(quizData).returning();
      return created;
    }
  }

  async createWeeklyQuizResult(result: InsertWeeklyQuizResults): Promise<WeeklyQuizResults> {
    const [created] = await db.insert(weeklyQuizResults).values(result).returning();
    return created;
  }

  async getWeeklyQuizResult(userId: string, weekNumber: number): Promise<WeeklyQuizResults | undefined> {
    const [result] = await db
      .select()
      .from(weeklyQuizResults)
      .where(and(
        eq(weeklyQuizResults.userId, userId),
        eq(weeklyQuizResults.weekNumber, weekNumber)
      ));
    return result || undefined;
  }
}

export const storage = new DatabaseStorage();
