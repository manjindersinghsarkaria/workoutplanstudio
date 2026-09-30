# Workout Plan Studio

A modern, progressive web application (PWA) for managing and tracking your gym workout routines. Built with React and TailwindCSS, the app helps you plan workouts, track progress, and maintain a complete history of your training sessions — no account required, everything stored locally in your browser.

🚀 **Live Demo**: [https://workoutplanstudio.ca](https://workoutplanstudio.ca)

## Features

- **Workout Planning**: Create and customize multi-day workout plans with exercises, sets, and reps
- **Real-time Tracking**: Track your workout progress with an intuitive interface
- **Session History**: View complete history of all completed workout sessions
- **Local Persistence**: All data stored locally in your browser via IndexedDB — no account or server needed
- **Progressive Web App**: Install on mobile devices for an app-like experience
- **Dark Mode**: Toggle between light and dark themes
- **Wake Lock**: Keep your screen awake during workouts (optional)
- **Timer & Sound**: Built-in rest timer with audio notifications
- **Plan Templates**: Browse and load pre-built workout plan templates
- **Affiliate Gear**: Curated gym gear recommendations

## Tech Stack

- **Frontend**: React 19, Vite, TailwindCSS
- **Storage**: IndexedDB via Dexie.js (fully client-side, no backend)
- **Routing**: React Router v7
- **Deployment**: Vercel
- **Testing**: Vitest, Testing Library, Fast-check (property-based testing)

## Prerequisites

- **Node.js** (v18 or higher)
- **npm**

That's it — no external services or accounts required.

## Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/manjindersinghsarkaria/workoutplanstudio.git
cd workoutplanstudio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### 4. Environment Variables (Optional)

The app runs without any environment variables. Optionally you can create a `.env.local` file for:

```env
# Google Analytics GA4 (optional)
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Google AdSense (optional)
VITE_ADSENSE_PUBLISHER_ID=ca-pub-XXXXXXXXXXXXXXXX
```

## Available Scripts

- `npm run dev` — Start Vite development server
- `npm run build` — Build for production
- `npm run preview` — Preview production build locally
- `npm run lint` — Run ESLint
- `npm run test` — Run tests with Vitest

## Project Structure

```
workoutplanstudio/
├── public/                       # Static assets
│   ├── icons/                    # PWA icons
│   ├── manifest.json             # PWA manifest
│   └── sw.js                     # Service worker
├── src/
│   ├── components/
│   │   ├── layout/               # Header, navigation components
│   │   ├── pages/                # Landing page, tool pages, blog, etc.
│   │   ├── ui/                   # Reusable UI components
│   │   └── views/                # Main app views (Workout, Plan, History)
│   ├── data/                     # Static data (plan templates, exercise library, blog posts)
│   ├── hooks/                    # Custom React hooks
│   ├── services/                 # Business logic (plan parsing, storage)
│   ├── test/                     # Test files
│   ├── types/                    # TypeScript type definitions
│   ├── utils/                    # Utility functions
│   ├── App.jsx                   # Main app component
│   ├── Router.jsx                # App routing
│   └── main.jsx                  # App entry point
├── .env                          # Base config (no secrets)
├── .env.local.example            # Example local environment variables
├── .gitignore                    # Git ignore rules
├── package.json                  # Dependencies and scripts
├── tailwind.config.js            # TailwindCSS configuration
├── vercel.json                   # Vercel deployment configuration
└── vite.config.js                # Vite configuration
```

## Testing

```bash
npm run test
```

The project includes:
- Unit tests for hooks and services
- Component tests with React Testing Library
- Property-based tests with fast-check

## Deployment

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Link your project: `vercel link`
3. Set any optional environment variables in the Vercel dashboard
4. Deploy: `vercel --prod`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `npm run test`
5. Run linter: `npm run lint`
6. Submit a pull request

## License

[Your License Here]

## Support

For issues or questions, please open an issue on GitHub.
