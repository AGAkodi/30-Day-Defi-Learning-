# Monarch's DeFi Learning Platform

## Overview

Monarch's DeFi Learning Platform is a premium educational web application designed to teach decentralized finance (DeFi) concepts through a structured 30-day curriculum. The platform embodies a "regal sophistication" design philosophy with the tagline "To know is to be free," emphasizing knowledge empowerment through daily lessons, interactive quizzes, progress tracking, and streak-based gamification.

The application follows a mobile-first approach, providing a seamless learning experience across all devices while maintaining a sophisticated aesthetic with gold accents on dark backgrounds that convey authority and premium quality.

## User Preferences

Preferred communication style: Simple, everyday language.
Fast Mode Enabled: Working to complete comprehensive rebuild within 3 turns with parallel batching.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- **React 18** with TypeScript for type-safe component development
- **Vite** as the build tool and development server, providing fast hot module replacement (HMR)
- **Wouter** for lightweight client-side routing instead of React Router
- **TanStack Query (React Query)** for server state management, data fetching, and caching

**UI Component System**
- **Radix UI** primitives for accessible, unstyled component foundations
- **shadcn/ui** component library using the "new-york" style variant
- **Tailwind CSS** for utility-first styling with custom design tokens
- **Custom theme** implementing the "Monarch" color palette (gold #D4AF37, deep red #8B0000, black backgrounds)
- **Typography**: Inter for body text, Playfair Display for headings and quotes
- **Design tokens**: HSL-based color system with CSS variables for consistent theming

**Quiz System**
- 30 daily quizzes auto-generated on first access with 4 question types:
  - 15 Multiple Choice Questions (MCQ)
  - 5 True/False questions
  - 5 Short Answer questions
  - 5 Scenario-based questions
- Stored in `daily_quiz` table in PostgreSQL
- Weekly quiz system tracks 40-question reviews
- Quiz routes: `/api/quiz/:dayNumber`, `/api/weekly-quiz/:weekNumber`

**State Management Strategy**
- Server state managed through TanStack Query with infinite stale time and disabled refetching by default
- Optimistic updates for task completion and progress tracking
- Query invalidation pattern for syncing related data (progress, streaks, lessons)
- No global client state management library - relying on React Query cache and local component state

**Key UI Patterns**
- Card-based layouts with hover elevation effects for visual hierarchy
- Modal dialogs for quiz interactions using Radix Dialog primitives
- Toast notifications for user feedback
- Progressive disclosure for lesson content and weekly reviews
- Mobile-responsive navigation with sticky header

### Backend Architecture

**Server Framework**
- **Express.js** on Node.js for HTTP server and API endpoints
- **TypeScript** in ESM module format for type safety across the stack
- Separate entry points for development (`index-dev.ts` with Vite middleware) and production (`index-prod.ts` serving static files)

**API Design**
- RESTful JSON API with resource-based endpoints (`/api/lessons`, `/api/progress`, `/api/streak`)
- Mock authentication using a hardcoded default user (`student@monarch-defi.com`) for MVP simplicity
- No session management or authentication middleware currently implemented
- Request/response logging middleware for development debugging

**Data Layer**
- **Drizzle ORM** for type-safe database queries and schema management
- Storage abstraction layer (`IStorage` interface) for potential database swapping
- Seeded lesson data from `lessonsSeed.ts` populated on server startup if database is empty
- Schema-driven validation using `drizzle-zod` for runtime type checking

**Database Schema Design**
```
users: id (UUID), email, password, createdAt
dailyLessons: id, dayNumber (unique), weekNumber, title, description, readingLinks[], tasks[], quizQuestions (JSONB)
userProgress: id, userId, dayNumber, completedTasks[], notes, quizScore, completed, completedAt
streaks: id, userId (unique), currentStreak, lastCompletedDay, lastActiveDate, longestStreak
weeklyReviews: id, userId, weekNumber, reviewNotes, quizScore, completed, completedAt
```

**Business Logic**
- Lesson progression: 30 days organized into weeks (4-5 days per week)
- Streak calculation: Based on daily lesson completion with tracking of current and longest streaks
- Quiz system: 3 questions per lesson with score tracking
- Task completion: Checkbox-based task lists with persistent state
- Weekly reviews: Unlocked only after completing all lessons in a week

### External Dependencies

**Database**
- **Neon Serverless PostgreSQL** via `@neondatabase/serverless` with WebSocket support
- Connection pooling configured through `DATABASE_URL` environment variable
- Drizzle Kit for schema migrations in `./migrations` directory

**Email Service**
- **Resend** API integration for sending lesson notes via email
- Connector-based credential management using Replit's connector API
- Dynamic client creation (non-cached) due to token expiration concerns
- Configured to send from custom domain via `from_email` setting

**UI Libraries**
- **Radix UI** suite (20+ component primitives): Dialog, Dropdown, Popover, Progress, Toast, etc.
- **Lucide React** for icon components
- **embla-carousel-react** for carousel functionality
- **react-day-picker** for calendar/date selection
- **cmdk** for command palette functionality
- **react-hook-form** with **@hookform/resolvers** and **zod** for form validation

**Development Tools**
- **Replit Vite Plugins**: Runtime error modal, cartographer, dev banner (development only)
- **tsx** for running TypeScript files directly in development
- **esbuild** for production backend bundling
- **drizzle-kit** for database schema management and migrations

**Type Safety**
- Shared type definitions in `shared/schema.ts` using Drizzle's table schemas
- Zod schemas generated from Drizzle schemas for runtime validation
- Path aliases configured (`@/`, `@shared/`, `@assets/`) for clean imports

**Design System Integration**
- Custom Tailwind configuration extending default theme with Monarch color palette
- CSS custom properties for dynamic theming
- Font loading from Google Fonts (Inter, Playfair Display)
- PostCSS with Autoprefixer for cross-browser compatibility