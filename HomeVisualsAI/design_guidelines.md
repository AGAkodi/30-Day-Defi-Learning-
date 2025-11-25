# Design Guidelines: Monarch's DeFi Learning Platform

## Design Approach
**Educational Excellence** - A premium learning platform with regal aesthetics that embodies the "Monarch King" identity. Professional, sophisticated, and empowering, designed to make DeFi education feel both accessible and aspirational.

## Core Design Principles
1. **Regal Sophistication**: Gold accents on dark backgrounds convey authority and premium quality
2. **Knowledge Empowerment**: "To know is to be free" - always visible, always inspiring
3. **Progressive Achievement**: Streaks, progress bars, and completion states motivate daily learning
4. **Mobile-First Learning**: Seamless experience across all devices for learning on-the-go

## Color Palette - Monarch Theme
```css
--monarch-gold: #D4AF37 (primary accents, highlights, CTAs)
--monarch-deep-red: #8B0000 (alerts, active states, emphasis)
--monarch-black: #000000 (primary background)
--monarch-gray: #1D1D1D (card backgrounds, elevated surfaces)
--monarch-white: #FFFFFF (primary text)
--monarch-gold-muted: #B8962E (secondary gold for borders/subtle elements)
```

### Color Usage
- **Backgrounds**: Black for main layout, dark gray (#1D1D1D) for cards and elevated surfaces
- **Text**: White for primary content, gold for headings and emphasis
- **Accents**: Gold for interactive elements, deep red for important actions
- **Borders**: Subtle gold borders on cards and dividers

## Typography System
- **Primary Font**: Inter - clean, modern sans-serif for body text
- **Accent Font**: Playfair Display - elegant serif for special headings and quotes
- **Hierarchy**:
  - Page Titles: text-4xl md:text-5xl, font-bold, text-[#D4AF37]
  - Section Headers: text-2xl md:text-3xl, font-semibold
  - Card Titles: text-xl, font-medium
  - Body Copy: text-base, regular weight
  - Small Labels: text-sm
  - Quote ("To know is to be free"): text-lg, italic, font-serif (Playfair Display)

## Layout System
**Spacing Primitives**: Use units of **4, 8, 12, 16, 20, 24** for rhythm
- Container: max-w-7xl with px-4 md:px-8
- Section Padding: py-12 md:py-16
- Card Padding: p-6 md:p-8
- Component Gaps: gap-6 for grids, gap-4 for lists

## Component Library

### Navigation Header
- Sticky header with dark background
- Logo/brand "MONARCH" in gold on left
- Navigation links (Home, Streak, Profile) in white
- Current streak badge with fire icon
- Height: h-16 md:h-20
- Gold bottom border (1px)

### Daily Lesson Card (Home Page)
- Dark gray background (#1D1D1D)
- Gold accent border on left (4px)
- Day number badge in gold
- Lesson title in white, large and bold
- Description in muted white
- Reading links as gold underlined links
- Progress indicators (tasks completed x/y)
- Padding: p-6 md:p-8

### Task Checklist
- Checkboxes with gold check on completion
- Strike-through completed tasks
- Subtle hover state with gold glow
- Each task item: min-h-[44px] for mobile touch

### Quiz Modal
- Full-screen overlay with dark background (rgba(0,0,0,0.95))
- Centered card with gray background
- Question counter at top
- Multiple choice options as cards with gold border on selection
- Submit button in gold
- Score display with congratulatory message

### Streak Counter
- Large flame icon in gold/red gradient
- Current streak number (text-5xl, bold)
- "day streak" label beneath
- Heatmap calendar showing activity
- Grid of days with gold fill for completed days

### Weekly Review Card
- Special elevated card with gold border
- "Week X Review" heading
- Summary of completed days
- Review quiz CTA
- Lock icon if not yet unlocked
- Completion checkmark in gold when done

### Progress Bar
- Full width bar
- Dark gray background
- Gold fill showing percentage
- Smooth transition animation
- Height: h-2
- Rounded ends

### Notes Submission Form
- Dark textarea with white text
- Gold focus ring
- Character counter
- "Submit & Email" button in gold
- Success message in gold text

### Footer
- Dark background matching header
- "To know is to be free" in italic Playfair Display, centered, gold color
- Padding: py-8
- Always visible at bottom of viewport

## Page Layouts

### Home Page
- Hero section with current day lesson
- Task checklist
- Notes submission form
- Quiz CTA button
- Streak display (compact)
- Navigation to previous/next days

### Day Detail Page (/day/:id)
- Full lesson content
- All reading links
- Complete task list
- Quiz section
- Notes area
- Day navigation arrows

### Week Overview (/week/:number)
- Grid of 7 day cards (2 cols mobile, 3-4 desktop)
- Each card shows completion status
- Weekly review section at bottom
- Locked state for incomplete weeks

### Streak Page
- Large streak counter
- Calendar heatmap (grid of 30-90 days)
- Stats: longest streak, current streak, total days
- Motivational message based on streak

### Profile Page
- User email
- Overall progress (X/30 lessons completed)
- Total quiz score
- Badges/achievements
- Settings (future)

## Iconography
Use **Lucide React** icons:
- Flame (streak)
- CheckCircle (completed tasks)
- Circle (incomplete tasks)
- BookOpen (lessons)
- Award (achievements)
- Mail (email)
- Calendar (dates)
- Lock/Unlock (weekly reviews)
- ChevronLeft/Right (navigation)

## Interactions & Animations
- **Hover States**: 
  - Buttons: slight gold glow (shadow)
  - Cards: subtle lift with shadow
  - Links: underline appears
- **Active States**: Deeper gold color
- **Transitions**: All 200-300ms ease-in-out
- **Loading**: Gold spinner or skeleton with shimmer
- **Streak Fire**: Subtle pulse animation when active

## Responsive Behavior
- **Mobile (< 768px)**: 
  - Single column layouts
  - Stack day cards
  - Full-width buttons
  - Collapsible sections
- **Tablet (768px - 1024px)**: 
  - 2-column grids
  - Sidebar possible
- **Desktop (> 1024px)**: 
  - 3-4 column grids
  - Max width containers
  - More spacious padding

## Special Elements

### "To Know is to be Free" Quote
- Always visible in footer
- Italic Playfair Display font
- Gold color (#D4AF37)
- text-lg md:text-xl
- Centered
- Can also appear as subtle watermark on hero sections

### Completion States
- Checkmarks in gold
- Success messages with gold accent
- Confetti or subtle celebration on quiz completion
- Progressive disclosure of next content

### Error States
- Deep red (#8B0000) for errors
- Clear error messages
- Gold "Try Again" buttons

## Accessibility
- High contrast (white text on black/dark gray)
- Focus states with gold outline
- Keyboard navigation support
- ARIA labels on interactive elements
- Minimum 44px touch targets
- Screen reader friendly

## Data Visualization
- Progress bars: gold on dark gray
- Streak heatmap: gradient from dark gray to gold
- Quiz scores: circular progress in gold
- Completion percentages: large numbers in gold

## Brand Voice in UI
- Empowering and regal
- "Master DeFi", "Build Your Kingdom", "Unlock Knowledge"
- Congratulatory messages: "Well done, Monarch!", "Your reign continues!"
- Educational but inspiring tone
