# AGENTS.md

This file contains information to help AI agents work effectively with this codebase.

## Project Overview

SvelteKit application with Zero (real-time sync), Better Auth, and Drizzle ORM for database management.

## Tech Stack

- **Framework**: SvelteKit 2.x with Svelte 5.x
- **Language**: TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Real-time Sync**: Rocicorp Zero
- **Authentication**: Better Auth
- **Testing**: Vitest with browser testing support
- **Styling**: Graffiti UI components

## Common Commands

### Development
- `npm run dev` - Start full development environment (database, Zero cache, and Vite)
- `npm run dev:app` - Start only the Vite dev server
- `npm run dev:zero` - Start only the Zero cache development server

### Build & Type Checking
- `npm run build` - Build for production
- `npm run check` - Run Svelte type checking
- `npm run check:watch` - Run Svelte type checking in watch mode
- `npm run preview` - Preview production build

### Testing
- `npm run test` - Run all tests once
- `npm run test:unit` - Run tests in watch mode

### Code Quality
- `npm run lint` - Check code formatting with Prettier
- `npm run format` - Format code with Prettier

### Database
- `npm run db:start` - Start PostgreSQL database via Docker Compose
- `npm run db:push` - Push schema changes to database
- `npm run db:generate` - Generate Drizzle migrations
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Drizzle Studio (database GUI)
- `npm run db:seed` - Seed database with initial data
- `npm run generate-zero-schema` - Generate Zero schema from Drizzle schema

## Project Structure

- `src/lib/` - Shared components and utilities
- `src/routes/` - SvelteKit routes and pages
- `src/schema.ts` - Database schema definition
- `src/schema.gen.ts` - Generated Zero schema (do not edit manually)
- `scripts/` - Utility scripts (e.g., database seeding)
- `drizzle/` - Database migrations

## Important Notes

- The project uses Svelte 5 with experimental async compiler options
- Database runs in Docker via `compose.yaml`
- Schema is defined in `src/schema.ts` and generates both Drizzle and Zero schemas
- Environment variables should be defined in `.env` (see `.env.example`)

## Development Workflow

1. Ensure Docker is running for the database
2. Run `npm run dev` to start all services
3. Access the app at the URL shown in the terminal
4. Changes to schema require running `npm run generate-zero-schema` and `npm run db:push`
