# Historical Weather Data Dashboard

A comprehensive, interactive weather dashboard built with React and TypeScript that visualizes historical weather data using the Open-Meteo Archive API. The application provides detailed weather insights through responsive charts and intuitive controls.

![Weather Dashboard](https://img.shields.io/badge/React-18.3.1-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-blue) ![Vite](https://img.shields.io/badge/Vite-5.4.19-646CFF) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.17-38B2AC)

## 🌟 Features

### Two Main Views
- **Overview Page**: Daily weather data with three separate chart visualizations
  - Temperature trends (min/max/mean)
  - Precipitation bar chart
  - Wind speed analysis
- **Detailed Insights Page**: Hourly weather data with multi-parameter line charts
  - Compare up to 2 parameters simultaneously
  - Detailed hourly breakdowns

### Interactive Controls
- **Date Range Picker**: Professional calendar interface for selecting custom date ranges
- **Location Selector**: Multi-location dropdown with predefined weather stations
- **Parameter Selector**: Choose from various weather metrics for detailed analysis

### Responsive Design
- Mobile-first approach with responsive grid layouts
- Professional UI components using Radix UI primitives
- Dark/light theme support
- Smooth animations and transitions

## 🛠️ Tech Stack

### Frontend Framework
- **React 18.3.1** - Modern React with hooks and functional components
- **TypeScript 5.6.3** - Type-safe development
- **Vite 5.4.19** - Fast build tool and development server

### UI & Styling
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **Radix UI** - Accessible, unstyled UI primitives
  - Dialog, Dropdown Menu, Select, Calendar, and more
- **Lucide React** - Beautiful & consistent icon set
- **Framer Motion** - Smooth animations and transitions

### Data Visualization
- **Recharts 2.15.2** - Composable charting library built on D3
- **React Date Range** - Professional date picker component

### State Management & Data Fetching
- **TanStack Query (React Query) 5.60.5** - Powerful data synchronization
- **React Hook Form 7.55.0** - Performant forms with minimal re-renders
- **Zod 3.24.2** - TypeScript-first schema validation

### Development Tools
- **ESBuild** - Fast JavaScript bundler
- **PostCSS & Autoprefixer** - CSS processing
- **TSX** - TypeScript execution environment

### Routing & Navigation
- **Wouter 3.3.5** - Minimalist routing library

## 📁 Project Structure

```
├── src/
│   ├── components/
│   │   ├── Charts/           # Chart components
│   │   │   ├── ChartSection.tsx
│   │   │   ├── DetailChart.tsx
│   │   │   ├── OverviewChart.tsx
│   │   │   ├── PrecipitationChart.tsx
│   │   │   ├── TemperatureChart.tsx
│   │   │   └── WindSpeedChart.tsx
│   │   ├── Controls/         # Input controls
│   │   │   ├── DateRangeControl.tsx
│   │   │   ├── LocationControl.tsx
│   │   │   └── ParameterSelector.tsx
│   │   ├── Pages/           # Page components
│   │   │   ├── DetailsPage.tsx
│   │   │   └── OverviewPage.tsx
│   │   ├── ui/              # Reusable UI components (shadcn/ui)
│   │   ├── Header.tsx
│   │   ├── LoadingState.tsx
│   │   └── Sidebar.tsx
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility libraries
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Utility functions & API calls
│   └── App.tsx             # Main application component
├── server/                 # Development server setup
├── public/                 # Static assets
└── package.json           # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd weather-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   Navigate to http://localhost:5000
   ```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run check` - Run TypeScript type checking

## 🌐 API Integration

### Open-Meteo Archive API
The application integrates with the [Open-Meteo Archive API](https://open-meteo.com/) to fetch historical weather data.

**Features:**
- No API key required
- Historical weather data dating back decades
- Multiple weather parameters
- Global coverage

**Supported Parameters:**
- Temperature (2m mean, max, min)
- Precipitation sum
- Wind speed (10m max)
- Relative humidity
- Apparent temperature
- Surface pressure

## 📊 Weather Data Visualization

### Chart Types
1. **Line Charts** - Temperature trends and continuous data
2. **Bar Charts** - Precipitation and discrete measurements
3. **Multi-parameter Charts** - Compare different weather metrics

### Interactive Features
- Hover tooltips with detailed information
- Responsive charts that adapt to screen size
- Click-through navigation between overview and detail views
- Dynamic parameter selection

## 🎨 UI Components

### Custom Components
Built using Radix UI primitives with custom styling:
- **Charts** - Recharts-based weather visualizations
- **Date Picker** - Professional date range selection
- **Dropdowns** - Location and parameter selectors
- **Cards** - Content containers with consistent styling
- **Loading States** - Skeleton loaders and spinners

### Design System
- **Typography** - Consistent text hierarchy
- **Colors** - Professional color palette with theme support
- **Spacing** - Tailwind's spacing scale
- **Animations** - Smooth transitions using Framer Motion

## 🔧 Configuration

### Vite Configuration
```javascript
// vite.config.js
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5000,
    allowedHosts: true,
    disableHostCheck: true
  },
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "./src"),
      "@assets": path.resolve(process.cwd(), "./attached_assets")
    }
  }
});
```

### Tailwind Configuration
- Custom color variables
- Component-specific utilities
- Responsive breakpoints
- Animation extensions

## 🌍 Deployment

### Production Build
```bash
npm run build
```

### Deployment Platforms
- **Replit Deployments** - Recommended for this project
- **Vercel** - Frontend deployment
- **Netlify** - Static site hosting
- **Railway** - Full-stack deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Open-Meteo](https://open-meteo.com/) for providing free weather data API
- [Recharts](https://recharts.org/) for excellent charting components
- [Radix UI](https://www.radix-ui.com/) for accessible UI primitives
- [shadcn/ui](https://ui.shadcn.com/) for beautiful component designs

## 📞 Support

If you encounter any issues or have questions:
1. Check the [documentation](#-getting-started)
2. Look through existing [issues](../../issues)
3. Create a new issue with detailed information

---

**Built with ❤️ using modern web technologies**
