# Quick Installation Guide

## Prerequisites
- **Node.js 18+** - Download from [nodejs.org](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **Git** - For cloning the repository

## Step-by-Step Installation

### 1. Clone the Repository
```bash
git clone [your-repository-url]
cd weather-dashboard
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Open in Browser
Navigate to: `http://localhost:5000`

## Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run check` | Run TypeScript type checking |

## Project Structure
```
weather-dashboard/
├── src/                    # Source code
│   ├── components/         # React components
│   ├── types/             # TypeScript definitions
│   ├── utils/             # Utility functions
│   └── App.tsx            # Main app component
├── public/                # Static assets
├── package.json           # Dependencies
└── vite.config.js        # Build configuration
```

## Quick Start Guide

1. **Select Date Range** - Use the calendar picker to choose your date range
2. **Choose Locations** - Select from predefined weather stations
3. **Pick Parameters** - Choose weather metrics to visualize
4. **View Charts** - Switch between Overview and Detailed views

## Need Help?
- Check the full [README.md](./README.md) for detailed documentation
- Review [TECHNICAL_DOCS.md](./TECHNICAL_DOCS.md) for architecture details
- Look through the component examples in the `src/components/` directory

## Common Issues

### Port Already in Use
```bash
# Kill process using port 5000
sudo lsof -t -i tcp:5000 | xargs kill -9
```

### Node Modules Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors
```bash
# Run type checking
npm run check
```