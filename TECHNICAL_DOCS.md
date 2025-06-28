# Technical Documentation

## Architecture Overview

This weather dashboard is built as a **frontend-only React application** that directly integrates with the Open-Meteo Archive API. The application uses modern React patterns with TypeScript for type safety and professional UI components.

## Project Architecture

### Frontend Architecture
```
src/
├── components/
│   ├── Charts/              # Data visualization components
│   ├── Controls/            # User input controls
│   ├── Pages/               # Page-level components
│   └── ui/                  # Reusable UI primitives
├── hooks/                   # Custom React hooks
├── lib/                     # Utility libraries
├── types/                   # TypeScript definitions
└── utils/                   # Helper functions & API calls
```

### Key Design Patterns

1. **Component Composition** - Modular components that can be combined
2. **Props Interface** - Strongly typed component interfaces
3. **Custom Hooks** - Reusable stateful logic
4. **API Layer** - Centralized data fetching with React Query

## Technology Stack Details

### Core Dependencies

#### Frontend Framework
```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "typescript": "5.6.3"
}
```

#### Build Tools
```json
{
  "vite": "^5.4.19",
  "@vitejs/plugin-react": "^4.3.2",
  "esbuild": "^0.25.0"
}
```

#### UI Framework
```json
{
  "tailwindcss": "^3.4.17",
  "@tailwindcss/typography": "^0.5.15",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "tailwind-merge": "^2.6.0"
}
```

#### UI Components (Radix UI)
```json
{
  "@radix-ui/react-dialog": "^1.1.7",
  "@radix-ui/react-dropdown-menu": "^2.1.7",
  "@radix-ui/react-select": "^2.1.7",
  "@radix-ui/react-tabs": "^1.1.4",
  "@radix-ui/react-calendar": "included in react-day-picker"
}
```

#### Data Visualization
```json
{
  "recharts": "^2.15.2"
}
```

#### State Management & Forms
```json
{
  "@tanstack/react-query": "^5.60.5",
  "react-hook-form": "^7.55.0",
  "@hookform/resolvers": "^3.10.0"
}
```

#### Validation & Types
```json
{
  "zod": "^3.24.2",
  "zod-validation-error": "^3.4.0"
}
```

#### Date Handling
```json
{
  "react-date-range": "^2.0.1",
  "react-day-picker": "^8.10.1",
  "date-fns": "^3.6.0"
}
```

#### Icons & Animations
```json
{
  "lucide-react": "^0.453.0",
  "react-icons": "^5.4.0",
  "framer-motion": "^11.13.1"
}
```

#### Routing
```json
{
  "wouter": "^3.3.5"
}
```

## Development Setup

### Environment Configuration

#### Vite Configuration (`vite.config.js`)
```javascript
export default defineConfig({
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "./src"),
      "@assets": path.resolve(process.cwd(), "./attached_assets"),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5000,
    allowedHosts: true,
    disableHostCheck: true,
    hmr: {
      host: '0.0.0.0',
      clientPort: 5000
    }
  },
  plugins: [react()],
});
```

#### TypeScript Configuration (`tsconfig.json`)
- Strict type checking enabled
- Modern ES modules
- React JSX support
- Path mapping for clean imports

#### Tailwind Configuration (`tailwind.config.ts`)
- Custom color palette
- Dark mode support
- Extended spacing and typography
- Animation utilities

### Development Scripts

```bash
# Development server with hot reload
npm run dev

# Type checking
npm run check

# Production build
npm run build

# Production server
npm run start
```

## API Integration

### Open-Meteo Archive API

**Base URL:** `https://archive-api.open-meteo.com/v1/archive`

#### Supported Parameters
- `latitude` - Geographic coordinate
- `longitude` - Geographic coordinate  
- `start_date` - Start date (YYYY-MM-DD)
- `end_date` - End date (YYYY-MM-DD)
- `daily` - Daily weather parameters
- `hourly` - Hourly weather parameters
- `timezone` - Timezone for date formatting

#### Daily Parameters
- `temperature_2m_max` - Maximum temperature at 2 meters
- `temperature_2m_min` - Minimum temperature at 2 meters
- `temperature_2m_mean` - Mean temperature at 2 meters
- `precipitation_sum` - Total precipitation
- `wind_speed_10m_max` - Maximum wind speed at 10 meters

#### Hourly Parameters
- `temperature_2m` - Temperature at 2 meters
- `relative_humidity_2m` - Relative humidity at 2 meters
- `apparent_temperature` - Apparent temperature
- `precipitation` - Precipitation amount
- `surface_pressure` - Surface air pressure
- `wind_speed_10m` - Wind speed at 10 meters

### API Client Implementation

```typescript
// utils/weatherApi.ts
export const fetchWeatherData = async (
  locations: Location[],
  startDate: string,
  endDate: string,
  parameters: string[]
): Promise<WeatherData | null>
```

## Component Architecture

### Chart Components

#### Base Chart Structure
```typescript
interface ChartProps {
  weatherData: WeatherData | null;
  onChartClick?: () => void;
  selectedParameters?: string[];
}
```

#### Chart Types
1. **TemperatureChart** - Line chart for temperature trends
2. **PrecipitationChart** - Bar chart for precipitation data
3. **WindSpeedChart** - Area chart for wind speed
4. **DetailChart** - Multi-parameter line chart

### Control Components

#### Date Range Control
```typescript
interface DateRangeControlProps {
  startDate: string;
  endDate: string;
  onDateChange: (startDate: string, endDate: string) => void;
}
```

#### Location Control
```typescript
interface LocationControlProps {
  selectedLocations: string[];
  onLocationChange: (locations: string[]) => void;
}
```

#### Parameter Selector
```typescript
interface ParameterSelectorProps {
  selectedParameters: string[];
  onParameterChange: (parameters: string[]) => void;
  multiple?: boolean;
  title?: string;
}
```

## State Management

### React Query Configuration

```typescript
// lib/queryClient.ts
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
    },
  },
});
```

### Data Flow
1. User selects parameters via controls
2. Components trigger API calls through React Query
3. Data is cached and shared across components
4. Charts automatically update when data changes

## Type Definitions

### Core Types (`src/types/weather.ts`)

```typescript
export interface WeatherData {
  time: string[];
  temperature_2m_mean?: number[];
  temperature_2m_max?: number[];
  temperature_2m_min?: number[];
  precipitation_sum?: number[];
  wind_speed_10m_max?: number[];
  // Hourly data
  temperature_2m?: number[];
  relative_humidity_2m?: number[];
  apparent_temperature?: number[];
  precipitation?: number[];
  surface_pressure?: number[];
  wind_speed_10m?: number[];
}

export interface Location {
  name: string;
  lat: number;
  lon: number;
}

export interface Parameter {
  key: string;
  label: string;
  color: string;
}
```

## Styling System

### Tailwind CSS Setup
- **Utility-first** approach for rapid development
- **Custom CSS variables** for theme consistency
- **Responsive design** with mobile-first breakpoints
- **Dark mode** support with CSS variables

### Component Library (shadcn/ui)
- **Radix UI primitives** for accessibility
- **Custom styling** with Tailwind CSS
- **Consistent design system** across components
- **Reusable patterns** for common UI elements

## Performance Optimizations

### Code Splitting
- **Route-based splitting** with dynamic imports
- **Component lazy loading** for large components
- **Bundle optimization** with Vite

### Data Caching
- **React Query** for API response caching
- **Stale-while-revalidate** pattern
- **Background data updates**

### Rendering Optimizations
- **React.memo** for expensive components
- **useMemo/useCallback** for derived values
- **Virtualization** for large datasets (if needed)

## Build & Deployment

### Build Process
1. **TypeScript compilation** with type checking
2. **Asset optimization** with Vite
3. **Bundle splitting** for optimal loading
4. **Source map generation** for debugging

### Deployment Options
- **Replit Deployments** (recommended)
- **Vercel** for frontend hosting
- **Netlify** for static sites
- **Railway** for full-stack apps

### Environment Variables
```bash
# Development
NODE_ENV=development

# Production
NODE_ENV=production
```

## Testing Strategy

### Recommended Testing Setup
```json
{
  "@testing-library/react": "^13.4.0",
  "@testing-library/jest-dom": "^5.16.5",
  "vitest": "^0.34.0"
}
```

### Testing Patterns
- **Component testing** with React Testing Library
- **Integration testing** for data flows
- **E2E testing** with Playwright (optional)
- **API mocking** for reliable tests

## Security Considerations

### API Security
- **No API keys required** for Open-Meteo
- **CORS handling** properly configured
- **Rate limiting** awareness

### Content Security
- **XSS prevention** through React's built-in escaping
- **Input validation** with Zod schemas
- **Secure headers** in production

## Monitoring & Analytics

### Error Handling
- **Error boundaries** for graceful failures
- **Logging strategy** for debugging
- **User feedback** for error reporting

### Performance Monitoring
- **Core Web Vitals** tracking
- **Bundle size monitoring**
- **API response times**

## Future Enhancements

### Potential Features
- **Weather forecasts** (current + future data)
- **Weather alerts** and notifications
- **Data export** functionality
- **More chart types** and visualizations
- **Geolocation** for automatic location detection
- **Progressive Web App** features

### Technical Improvements
- **Service Worker** for offline functionality
- **Database integration** for user preferences
- **User authentication** for personalized experience
- **Real-time updates** with WebSockets