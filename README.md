# RecipeGram - A Culinary Network

RecipeGram is an AI-enhanced digital cookbook platform, made specifically for Advanced Software Engineering Masters of Science, that combines social recipe sharing with intelligent culinary assistance. Built with Next.js 15, TypeScript, and Prisma it features AI-powered recipe generation, cultural insights, and personalised cooking recommendations.

## Features

### Core Functionality
- Create, share, and discover recipes with social media-style interactions.
- Multiple AI personalities generate personalized recipes based on user preferences.
- AI-powered dietary analysis, cultural context, and cooking tips.
- Follow users, like recipes, save to cookbook, and comment on dishes on your feed.
- AI search with filtering by cuisine, difficulty, dietary restrictions.
- AI seasonal cooking narratives and ingredient spotlights.
- Custom recipe generation based on individual taste preferences and history.

### Technical Features
- Secure user authentication with NextAuth.js
- Cloudinary integration for recipe image uploads.
- React Query for data fetching and caching.
- Mobile-first design with Tailwind CSS.
- PostgreSQL with Prisma ORM for type-safe database operations.
- Anthropic Claude API for recipe generation and content analysis.
- DALL-E API for image generations.

## Technology Stack

- Framework is Next.js 15 with App Router.
- Coded in TypeScript.
- PostgreSQL Database with Prisma ORM.
- Authentication with NextAuth.js.
- Styling with Tailwind CSS and with Framer Motion animations.
- AI Services include Anthropic Claude API, and DALL-E for image generations.
- Image Storage from Cloudinary.
- State Management using React Query (TanStack Query).
- UI Components using Radix UI primitives.

## Prerequisites

Before running this project, make sure you have:

- Node.js 18.x or higher
- PostgreSQL 12 or higher running on your system
- npm or yarn package manager

## Installation

1. Clone this repository
   ```bash
   git clone https://campus.cs.le.ac.uk/gitlab/pgt_project/24_25_summer/lu17
   cd grams
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Environment Config
   
   Create a `.env` file in the root directory with the following variables:

   ```env
   # Database Configuration
   DATABASE_URL=
   
   # Authentication
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=
   
   # API Config
   NEXT_PUBLIC_API_URL=http://localhost:3000/api
   
   # AI Service (Anthropic Claude)
   ANTHROPIC_API_KEY=
   
   # AI Service (DALL-E)
   OPENAI_API_KEY=
   
   # Image Storage (Cloudinary)
   CLOUDINARY_CLOUD_NAME=
   CLOUDINARY_API_KEY=
   CLOUDINARY_API_SECRET=
   ```

## API Keys Setup

### Required API Keys

1. Anthropic Claude API. Used for AI recipe generation and content analysis.
   - Visit: https://console.anthropic.com/
   - Create an account and generate an API key.

2. Cloudinary Account Used for recipe image uploads and transformations.
   - Visit: https://cloudinary.com/
   - Create a free account.
   - Get your Cloud Name, API Key, and API Secret from the dashboard.

3. OpenAI API. Used for DALL-E's image generations.
   - Visit: https://platform.openai.com/
   - Generate an API key.

## Database Setup

1. Make sure PostgreSQL is running on your system:
   ```bash
   # Windows
   net start postgresql-x64-14
   
   # macOS (with Homebrew)
   brew services start postgresql
   
   # Linux
   sudo systemctl start postgresql
   ```

2. Create Database
   ```bash
   createdb recipegram
   ```

3. **Run Database Setup**
   ```bash
   npm run setup
   ```
   
   This command will:
   - Generate Prisma client
   - Push database schema
   - Verify database connection
   - Display current data statistics

## Development

### Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Full Development Setup
```bash
npm run dev:full
```

This command runs database setup AND starts the development server in one step.

### Database Operations

```bash
# Generate Prisma client after schema changes
npm run db:generate

# Push schema changes to database
npm run db:push

# Open Prisma Studio in your browser
npm run db:studio

# Test database connection
npm run test:db
```
