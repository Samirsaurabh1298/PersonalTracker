# Historical Weather Data Dashboard

An interactive, data-rich weather dashboard built with **React** and **TypeScript**, powered by the [Open-Meteo Archive API](https://open-meteo.com/). Visualize historical weather trends with responsive charts, professional UI, and smooth user interactions.

![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-blue)
![Vite](https://img.shields.io/badge/Vite-5.4.19-646CFF)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.17-38B2AC)

---

## 🌟 Features

### 📊 Two Main Views

* **Overview Page**:

  * Daily weather data with 3 chart types:

    * Temperature trends (min/max/mean)
    * Precipitation bar chart
    * Wind speed overview
* **Detailed Insights Page**:

  * Hourly weather data with multi-parameter line charts
  * Compare up to 2 parameters simultaneously

### 🧽 Interactive Controls

* **Date Range Picker** – User-friendly calendar interface
* **Location Selector** – Multi-location dropdown for weather stations
* **Parameter Selector** – Choose multiple weather metrics

### 💻 Responsive UI

* Mobile-first layout using Tailwind CSS
* Built with Radix UI primitives
* Dark/light theme support
* Smooth animations (Framer Motion)

---

## 🛠️ Tech Stack

### Frontend

* **React 18.3.1**
* **TypeScript 5.6.3**
* **Vite 5.4.19**

### Styling & UI

* **Tailwind CSS**
* **Radix UI** (accessible components)
* **Lucide React** (icons)
* **Framer Motion** (animations)

### Charts & Data

* **Recharts** – Chart visualizations
* **React Date Range** – Date picker
* **TanStack Query** – Data fetching and caching
* **React Hook Form** – Form handling
* **Zod** – Schema validation

### Routing & Utilities

* **Wouter** – Minimal React router
* **ESBuild**, **PostCSS**, **Autoprefixer**, **TSX**

---

## 📁 Project Structure

```
├── src/
│   ├── components/
│   │   ├── Charts/
│   │   │   ├── TemperatureChart.tsx
│   │   │   ├── WindSpeedChart.tsx
│   │   │   ├── PrecipitationChart.tsx
│   │   │   └── ChartSection.tsx
│   │   ├── Controls/
│   │   │   ├── DateRangeControl.tsx
│   │   │   ├── LocationControl.tsx
│   │   │   └── ParameterSelector.tsx
│   │   ├── Pages/
│   │   │   ├── OverviewPage.tsx
│   │   │   └── DetailsPage.tsx
│   │   ├── ui/
│   │   ├── Sidebar.tsx
│   │   └── LoadingState.tsx
│   ├── hooks/
│   ├── lib/
│   ├── types/
│   ├── utils/
│   └── App.tsx
├── public/
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

* Node.js (v18+)
* npm or yarn

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/your-username/weather-dashboard.git
cd weather-dashboard

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Visit the app
http://localhost:5000
```

### Available Scripts

| Script            | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start local dev server   |
| `npm run build`   | Create production build  |
| `npm run preview` | Preview production build |

---

## 🌐 API Integration: Open-Meteo Archive

* ✅ No API key required
* 🌎 Global coverage
* 🗕️ Historical data for decades

**Supported Parameters:**

* Temperature (min, max, mean)
* Precipitation sum
* Wind speed
* Humidity
* Apparent temperature
* Surface pressure

---

## 📊 Visualizations

| Chart Type        | Description                             |
| ----------------- | --------------------------------------- |
| Line Charts       | Temperature & hourly breakdowns         |
| Bar Charts        | Precipitation volume                    |
| Multi-Line Charts | Side-by-side parameter comparison       |
| Interactions      | Tooltips, responsive layout, navigation |

---

## 🎨 Design System

* **Typography & Colors** – Tailwind-based
* **Animations** – Smooth transitions via Framer Motion
* **Reusable Components** – Built with Radix UI + custom styling

---

## 🔧 Config

### vite.config.ts

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  server: {
    host: "localhost",
    port: 5000,
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
```

---

## 🚀 Deployment

### Production Build

```bash
npm run build
```

### Hosting Options

* **Netlify** *(Recommended)*
* **Vercel**
* **GitHub Pages**

---

## 👍 Contributing

```bash
# Fork → Clone → Create Branch
git checkout -b feature/your-feature

# Make changes → Commit
git commit -m "feat: add new feature"

# Push → Open Pull Request
```

---

## 📝 License

Licensed under the **MIT License**.
See the [LICENSE](./LICENSE) file for details.

---

## 🙏 Acknowledgments

* [Open-Meteo](https://open-meteo.com/)
* [Recharts](https://recharts.org/)
* [Radix UI](https://www.radix-ui.com/)
* [shadcn/ui](https://ui.shadcn.com/)

---

**Built with ❤️ using modern web technologies**
