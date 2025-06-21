# Weather Dashboard Application

## Overview

This is a full-stack weather dashboard application built with React, Express, and TypeScript. The application provides weather data visualization with daily overviews and detailed hourly charts. It uses the Open-Meteo API for weather data and features a clean, modern UI built with shadcn/ui components.

## System Architecture

The application follows a monorepo structure with clear separation between client and server code:

- **Frontend**: React 18 with TypeScript, using Vite for development and building
- **Backend**: Express.js server with TypeScript
- **Database**: PostgreSQL with Drizzle ORM (configured but not actively used in weather features)
- **UI Framework**: shadcn/ui components with Tailwind CSS
- **State Management**: React hooks with TanStack Query for data fetching
- **Build System**: Vite for frontend, esbuild for backend bundling

## Key Components

### Frontend Architecture
- **Component Structure**: Organized into pages, controls, charts, and UI components
- **State Management**: Local React state with custom hooks
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Charts**: Recharts library for data visualization
- **Type Safety**: Full TypeScript implementation with shared types

### Backend Architecture
- **Server Framework**: Express.js with middleware for logging and error handling
- **Database Layer**: Drizzle ORM with PostgreSQL support
- **Storage Interface**: Abstracted storage layer with memory implementation
- **Static Serving**: Serves built frontend in production

### Database Schema
- **Users Table**: Basic user management with username/password (not used in weather features)
- **Schema Location**: `shared/schema.ts` with Drizzle ORM definitions
- **Migration Support**: Drizzle Kit for database migrations

## Data Flow

1. **Weather Data**: Fetched from Open-Meteo API on the frontend
2. **Location Management**: Predefined locations stored in constants
3. **Chart Data**: Transformed from API responses for visualization
4. **Navigation**: Client-side routing between overview and detail pages
5. **User Interactions**: Date range selection, location filtering, parameter selection

## External Dependencies

### Weather API
- **Open-Meteo Archive API**: Historical weather data source
- **Endpoints**: Daily and hourly weather parameters
- **Location Support**: 8 predefined locations across different continents

### UI Dependencies
- **shadcn/ui**: Complete UI component library
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library

### Development Tools
- **Vite**: Frontend development server and bundler
- **TypeScript**: Type safety across the stack
- **Drizzle Kit**: Database migration tool
- **PostCSS**: CSS processing

## Deployment Strategy

### Development
- **Command**: `npm run dev`
- **Server**: TSX for TypeScript execution
- **Port**: 5000 (configured in Replit)
- **Hot Reload**: Vite HMR for frontend changes

### Production Build
- **Frontend**: `vite build` outputs to `dist/public`
- **Backend**: `esbuild` bundles server to `dist/index.js`
- **Static Assets**: Express serves built frontend files
- **Environment**: NODE_ENV=production

### Replit Configuration
- **Modules**: Node.js 20, Web, PostgreSQL 16
- **Auto-scaling**: Configured for deployment
- **Port Mapping**: Internal 5000 to external 80

## Changelog

- June 21, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.