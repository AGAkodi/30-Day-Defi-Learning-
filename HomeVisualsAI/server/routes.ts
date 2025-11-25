import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { isAuthenticated } from "./auth";
import { lessonsSeed } from "./lessonsSeed";
import { eq } from "drizzle-orm";
import type { QuizQuestion } from "@shared/schema";
import { signupSchema, loginSchema } from "@shared/schema";
import bcrypt from "bcrypt";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication routes are defined below

  // Seed lessons on startup if database is empty
  const existingLessons = await storage.getAllLessons();
  if (existingLessons.length === 0) {
    console.log("Seeding lessons...");
    for (const lesson of lessonsSeed) {
      await storage.createDailyLesson(lesson);
    }
    console.log("Lessons seeded successfully!");
  }

  // POST /api/signup - Create new user account
  app.post("/api/signup", async (req, res) => {
    try {
      const result = signupSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: "Invalid input", errors: result.error });
      }

      const { username, email, password } = result.data;

      // Check if user already exists
      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(409).json({ message: "Email already in use" });
      }

      // Check if username already exists
      const existingUsername = await storage.getUserByUsername(username);
      if (existingUsername) {
        return res.status(409).json({ message: "Username already taken" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const user = await storage.createUser({
        username,
        email,
        password: hashedPassword,
      });

      // Initialize streak
      await storage.createOrUpdateStreak({
        userId: user.id,
        currentStreak: 0,
        longestStreak: 0,
        lastCompletedDay: null,
        lastActiveDate: null,
      });

      // Set session
      req.session.userId = user.id;
      await new Promise((resolve, reject) => {
        req.session.save((err: any) => {
          if (err) reject(err);
          else resolve(undefined);
        });
      });

      res.json({ message: "Account created successfully", user });
    } catch (error: any) {
      console.error("Signup error:", error);
      res.status(500).json({ message: "Failed to create account" });
    }
  });

  // POST /api/login - Login user
  app.post("/api/login", async (req, res) => {
    try {
      const result = loginSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: "Invalid input" });
      }

      const { email, password } = result.data;

      // Find user by email
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Set session
      req.session.userId = user.id;
      await new Promise((resolve, reject) => {
        req.session.save((err: any) => {
          if (err) reject(err);
          else resolve(undefined);
        });
      });

      res.json({ message: "Logged in successfully", user });
    } catch (error: any) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Login failed" });
    }
  });

  // POST /api/logout - Logout user
  app.post("/api/logout", (req, res) => {
    req.session.destroy((err: any) => {
      if (err) {
        return res.status(500).json({ message: "Failed to logout" });
      }
      res.json({ message: "Logged out successfully" });
    });
  });

  // GET /api/auth/user - Get current authenticated user
  app.get("/api/auth/user", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.session.userId;
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error: any) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Helper to get or create user (for backward compatibility with existing routes)
  const getOrCreateUser = async (userId: string) => {
    let user = await storage.getUser(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  };

  // GET /api/lessons/today - Get today's lesson (Day 1 for now, can be dynamic)
  app.get("/api/lessons/today", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.session.userId;
      const user = await getOrCreateUser(userId);
      const allProgress = await storage.getAllUserProgress(user.id);
      const completedDays = allProgress.filter(p => p.completed).map(p => p.dayNumber);
      
      // Find the next incomplete day, or day 1 if none completed
      let nextDay = 1;
      for (let day = 1; day <= 30; day++) {
        if (!completedDays.includes(day)) {
          nextDay = day;
          break;
        }
      }
      
      const lesson = await storage.getDailyLesson(nextDay);
      res.json(lesson || null);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // GET /api/lessons/:dayNumber - Get specific lesson
  app.get("/api/lessons/:dayNumber", async (req, res) => {
    try {
      const dayNumber = parseInt(req.params.dayNumber);
      const lesson = await storage.getDailyLesson(dayNumber);
      res.json(lesson || null);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // GET /api/lessons/week/:weekNumber - Get all lessons for a week
  app.get("/api/lessons/week/:weekNumber", async (req, res) => {
    try {
      const weekNumber = parseInt(req.params.weekNumber);
      const lessons = await storage.getLessonsByWeek(weekNumber);
      res.json(lessons);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // GET /api/progress/today - Get progress for today's lesson
  app.get("/api/progress/today", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.session.userId;
      const user = await getOrCreateUser(userId);
      const allProgress = await storage.getAllUserProgress(user.id);
      const completedDays = allProgress.filter(p => p.completed).map(p => p.dayNumber);
      
      let nextDay = 1;
      for (let day = 1; day <= 30; day++) {
        if (!completedDays.includes(day)) {
          nextDay = day;
          break;
        }
      }
      
      const progress = await storage.getUserProgress(user.id, nextDay);
      res.json(progress || null);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // GET /api/progress/:dayNumber - Get progress for specific day
  app.get("/api/progress/:dayNumber", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.session.userId;
      const user = await getOrCreateUser(userId);
      const dayNumber = parseInt(req.params.dayNumber);
      const progress = await storage.getUserProgress(user.id, dayNumber);
      res.json(progress || null);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // GET /api/progress/week/:weekNumber - Get progress for all days in a week
  app.get("/api/progress/week/:weekNumber", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.session.userId;
      const user = await getOrCreateUser(userId);
      const weekNumber = parseInt(req.params.weekNumber);
      const progress = await storage.getUserProgressByWeek(user.id, weekNumber);
      res.json(progress);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // GET /api/progress/all - Get all user progress
  app.get("/api/progress/all", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.session.userId;
      const user = await getOrCreateUser(userId);
      const progress = await storage.getAllUserProgress(user.id);
      res.json(progress);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // POST /api/progress/tasks - Update completed tasks
  app.post("/api/progress/tasks", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.session.userId;
      const user = await getOrCreateUser(userId);
      const { dayNumber, completedTasks } = req.body;
      
      const lesson = await storage.getDailyLesson(dayNumber);
      if (!lesson) {
        return res.status(404).json({ error: "Lesson not found" });
      }

      const existingProgress = await storage.getUserProgress(user.id, dayNumber);
      const allTasksComplete = completedTasks.length === lesson.tasks.length;
      const hasQuiz = existingProgress?.quizScore !== undefined && existingProgress?.quizScore !== null;
      
      // Mark as completed if all tasks are done AND quiz has been taken
      const isCompleted = allTasksComplete && hasQuiz;
      
      const progress = await storage.createOrUpdateProgress({
        userId: user.id,
        dayNumber,
        completedTasks,
        notes: existingProgress?.notes,
        quizScore: existingProgress?.quizScore,
        completed: isCompleted,
        completedAt: isCompleted ? new Date() : null
      });

      // Update streak if day is completed
      if (isCompleted) {
        await updateStreak(user.id, dayNumber);
      }

      res.json(progress);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // POST /api/progress/notes - Submit notes (and email them)
  app.post("/api/progress/notes", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.session.userId;
      const user = await getOrCreateUser(userId);
      const { dayNumber, notes } = req.body;
      
      const lesson = await storage.getDailyLesson(dayNumber);
      if (!lesson) {
        return res.status(404).json({ error: "Lesson not found" });
      }

      const existingProgress = await storage.getUserProgress(user.id, dayNumber);
      
      const progress = await storage.createOrUpdateProgress({
        userId: user.id,
        dayNumber,
        completedTasks: existingProgress?.completedTasks || [],
        notes,
        quizScore: existingProgress?.quizScore,
        completed: existingProgress?.completed || false,
        completedAt: existingProgress?.completedAt || null
      });

      // Send email via Resend
      const { sendNotesEmail } = await import("./email");
      await sendNotesEmail({
        userEmail: user.email,
        dayNumber,
        lessonTitle: lesson.title,
        notes,
        quizScore: progress.quizScore || undefined,
        totalQuestions: (lesson.quizQuestions as QuizQuestion[]).length
      });
      
      res.json(progress);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // POST /api/progress/quiz - Submit quiz score
  app.post("/api/progress/quiz", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.session.userId;
      const user = await getOrCreateUser(userId);
      const { dayNumber, score } = req.body;
      
      const lesson = await storage.getDailyLesson(dayNumber);
      if (!lesson) {
        return res.status(404).json({ error: "Lesson not found" });
      }

      const existingProgress = await storage.getUserProgress(user.id, dayNumber);
      const allTasksComplete = existingProgress?.completedTasks?.length === lesson.tasks.length;
      
      // Mark as completed if all tasks are done AND quiz is now taken
      const isCompleted = allTasksComplete;
      
      const progress = await storage.createOrUpdateProgress({
        userId: user.id,
        dayNumber,
        completedTasks: existingProgress?.completedTasks || [],
        notes: existingProgress?.notes,
        quizScore: score,
        completed: isCompleted,
        completedAt: isCompleted ? new Date() : null
      });

      // Update streak if day is completed
      if (isCompleted) {
        await updateStreak(user.id, dayNumber);
      }

      res.json(progress);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // GET /api/streak - Get user's streak
  app.get("/api/streak", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.session.userId;
      const user = await getOrCreateUser(userId);
      const streak = await storage.getStreak(user.id);
      res.json(streak || { currentStreak: 0, longestStreak: 0 });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // GET /api/weekly-review/:weekNumber - Get weekly review
  app.get("/api/weekly-review/:weekNumber", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.session.userId;
      const user = await getOrCreateUser(userId);
      const weekNumber = parseInt(req.params.weekNumber);
      const review = await storage.getWeeklyReview(user.id, weekNumber);
      res.json(review || null);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // POST /api/weekly-review - Complete weekly review
  app.post("/api/weekly-review", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await getOrCreateUser(userId);
      const { weekNumber, notes, score } = req.body;
      
      const review = await storage.createWeeklyReview({
        userId: user.id,
        weekNumber,
        reviewNotes: notes,
        quizScore: score,
        completed: true,
        completedAt: new Date()
      });

      res.json(review);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // GET /api/quiz/:dayNumber - Get or generate quiz for a day
  app.get("/api/quiz/:dayNumber", isAuthenticated, async (req: any, res) => {
    try {
      const dayNumber = parseInt(req.params.dayNumber);
      const userId = req.session.userId;
      
      // Check if quiz already exists
      let quiz = await storage.getDailyQuiz(dayNumber);
      
      if (!quiz) {
        // Generate quiz if it doesn't exist
        const { generateDailyQuiz } = await import("./quizGenerator");
        const lesson = await storage.getDailyLesson(dayNumber);
        
        if (!lesson) {
          return res.status(404).json({ error: "Lesson not found" });
        }
        
        const questions = generateDailyQuiz(dayNumber, lesson.title, lesson.readingLinks);
        
        // Store quiz in database
        quiz = await storage.createOrUpdateDailyQuiz({
          dayNumber,
          weekNumber: lesson.weekNumber,
          questions
        });
      }
      
      res.json(quiz);
    } catch (error: any) {
      console.error("Quiz generation error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // POST /api/weekly-quiz/:weekNumber - Submit weekly quiz results
  app.post("/api/weekly-quiz/:weekNumber", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.session.userId;
      const user = await getOrCreateUser(userId);
      const weekNumber = parseInt(req.params.weekNumber);
      const { score, missedQuestions } = req.body;
      
      const result = await storage.createWeeklyQuizResult({
        userId: user.id,
        weekNumber,
        score,
        missedQuestions: missedQuestions || []
      });
      
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // GET /api/weekly-quiz/:weekNumber - Get weekly quiz result
  app.get("/api/weekly-quiz/:weekNumber", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.session.userId;
      const user = await getOrCreateUser(userId);
      const weekNumber = parseInt(req.params.weekNumber);
      
      const result = await storage.getWeeklyQuizResult(user.id, weekNumber);
      res.json(result || null);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Helper function to update streak
  async function updateStreak(userId: string, dayNumber: number) {
    const streak = await storage.getStreak(userId);
    const today = new Date().toISOString().split('T')[0];
    
    if (!streak) {
      await storage.createOrUpdateStreak({
        userId,
        currentStreak: 1,
        longestStreak: 1,
        lastCompletedDay: dayNumber,
        lastActiveDate: today
      });
      return;
    }

    const lastActiveDate = streak.lastActiveDate;
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    let newStreak = 1;
    
    if (lastActiveDate === today) {
      // Same day, don't increment
      newStreak = streak.currentStreak;
    } else if (lastActiveDate === yesterdayStr) {
      // Consecutive day, increment
      newStreak = streak.currentStreak + 1;
    } else if (lastActiveDate && lastActiveDate < yesterdayStr) {
      // Streak broken, reset to 1
      newStreak = 1;
    }

    const newLongestStreak = Math.max(newStreak, streak.longestStreak || 0);

    await storage.createOrUpdateStreak({
      userId,
      currentStreak: newStreak,
      longestStreak: newLongestStreak,
      lastCompletedDay: dayNumber,
      lastActiveDate: today
    });
  }

  const httpServer = createServer(app);
  return httpServer;
}
