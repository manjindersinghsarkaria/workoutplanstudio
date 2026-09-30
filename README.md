# Workout Plan Studio

A modern, progressive web application (PWA) for managing and tracking your gym workout routines. Built with React, Firebase, and Clerk authentication, this app helps you plan workouts, track progress, and maintain a complete history of your training sessions.

🚀 **Live Demo**: [https://workoutplanstudio.ca](https://workoutplanstudio.ca)

## Features

- **Workout Planning**: Create and customize multi-day workout plans with exercises, sets, and reps
- **Real-time Tracking**: Track your workout progress with an intuitive interface
- **Session History**: View complete history of all completed workout sessions
- **Progressive Web App**: Install on mobile devices for an app-like experience
- **Dark Mode**: Toggle between light and dark themes
- **Wake Lock**: Keep your screen awake during workouts (optional)
- **Timer & Sound**: Built-in rest timer with audio notifications
- **Cloud Sync**: Sync your data across devices using Firebase Firestore
- **Secure Authentication**: User authentication powered by Clerk

## Tech Stack

- **Frontend**: React 19, Vite, TailwindCSS
- **Backend**: Firebase (Firestore, Authentication, Cloud Functions)
- **Authentication**: Clerk
- **Deployment**: Vercel
- **Testing**: Vitest, Testing Library, Fast-check (property-based testing)

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Git**

You'll also need accounts for:

- [Firebase](https://firebase.google.com/) - for database and backend services
- [Clerk](https://clerk.com/) - for authentication
- [Vercel](https://vercel.com/) (optional) - for deployment

## Local Development Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd workoutplanstudio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Firebase Setup

#### Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (or use an existing one)
3. Enable **Firestore Database**
4. Enable **Authentication** (Email/Password provider)
5. Create a **service account** for Firebase Admin:
   - Go to Project Settings → Service Accounts
   - Click "Generate New Private Key"
   - Save the JSON file securely (DO NOT commit this to git)

#### Get Firebase Configuration

From your Firebase project settings, copy your web app configuration values.

### 4. Clerk Setup

1. Go to [Clerk Dashboard](https://dashboard.clerk.com/)
2. Create a new application (or use an existing one)
3. Configure your authentication providers
4. Note your Clerk Issuer URL (found in API Keys section)

### 5. Environment Variables

Create a `.env.local` file in the project root directory by copying the example:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and fill in your credentials:

```env
# Browser-side Firebase config (VITE_ prefix = exposed to browser)
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=1:your-sender-id:web:your-app-id
VITE_FIREBASE_MEASUREMENTID=G-YOUR-MEASUREMENT-ID

# Server-side Firebase Admin config (NO VITE_ prefix = server only)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# Clerk configuration
CLERK_ISSUER=https://your-clerk-instance.clerk.accounts.dev
```

**Important Notes:**
- `.env.local` is gitignored and will NOT be committed
- Use a separate Firebase project for development to avoid affecting production data
- Never commit API keys or private keys to version control

### 6. Firestore Security Rules

Deploy your Firestore security rules:

```bash
firebase deploy --only firestore:rules
```

The rules are defined in `firestore.rules`.

### 7. Firebase Functions (Optional)

If you need to deploy Firebase Cloud Functions:

```bash
cd functions
npm install
cd ..
firebase deploy --only functions
```

### 8. Start Development Server

You have two options for local development:

#### Option A: Quick UI Testing (No Firebase/API needed)

For testing UI changes without needing Firebase or the API server:

1. Add this line to your `.env.local`:
   ```env
   VITE_SKIP_FIREBASE_AUTH=true
   ```

2. Start the dev server:
   ```bash
   npm run dev
   ```

The app will be available at `http://localhost:5173`

**Note**: With this option, data won't persist (no Firestore), but you can test all UI features after signing in with Clerk.

#### Option B: Full Development (With Firebase & API)

For testing with full Firebase integration and data persistence:

```bash
npm run dev:full
```

This runs both Vite and Vercel dev server concurrently. The app will be available at `http://localhost:5173` and the API at `http://localhost:3000`.

### 9. Run with Vercel Dev (Optional)

To test serverless functions locally:

```bash
npm run dev:full
```

This runs both Vite and Vercel dev server concurrently.

## Available Scripts

- `npm run dev` - Start Vite development server
- `npm run dev:full` - Start Vite + Vercel dev server (for testing serverless functions)
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run test` - Run tests with Vitest

## Project Structure

```
workoutplanstudio/
├── api/                          # Vercel serverless functions
├── functions/                    # Firebase Cloud Functions
├── public/                       # Static assets
│   ├── icons/                    # PWA icons
│   ├── manifest.json             # PWA manifest
│   └── sw.js                     # Service worker
├── src/
│   ├── components/
│   │   ├── layout/               # Header, navigation components
│   │   ├── pages/                # Landing, sign-in, sign-up pages
│   │   ├── ui/                   # Reusable UI components
│   │   └── views/                # Main app views (Workout, Plan, History)
│   ├── contexts/                 # React contexts
│   ├── hooks/                    # Custom React hooks
│   ├── services/                 # Business logic services
│   ├── test/                     # Test files
│   ├── types/                    # TypeScript type definitions
│   ├── utils/                    # Utility functions
│   ├── App.jsx                   # Main app component
│   ├── Router.jsx                # App routing
│   ├── firebase.js               # Firebase configuration
│   └── main.jsx                  # App entry point
├── .env                          # Production environment variables (committed)
├── .env.local.example            # Example local environment variables
├── .gitignore                    # Git ignore rules
├── firebase.json                 # Firebase configuration
├── firestore.rules               # Firestore security rules
├── package.json                  # Dependencies and scripts
├── tailwind.config.js            # TailwindCSS configuration
├── vercel.json                   # Vercel deployment configuration
└── vite.config.js                # Vite configuration
```

## Testing

Run the test suite:

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
3. Set environment variables in Vercel dashboard
4. Deploy: `vercel --prod`

### Deploy Firebase Functions

```bash
firebase deploy --only functions
```

### Deploy Firestore Rules

```bash
firebase deploy --only firestore:rules
```

## Security Considerations

- All sensitive credentials are stored in `.env.local` (gitignored)
- Use separate Firebase projects for development and production
- Firestore security rules enforce user-level data isolation
- Clerk handles authentication securely
- Never commit API keys, private keys, or service account credentials

## Environment Variable Strategy

The app uses a layered environment variable approach:

- `.env` - Production config (committed to git)
- `.env.local` - Local development config (gitignored, overrides `.env`)

This ensures:
- Production credentials stay in `.env` for deployment
- Local development uses separate credentials in `.env.local`
- No risk of accidentally using production data during development

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests: `npm run test`
4. Run linter: `npm run lint`
5. Submit a pull request

## License

[Your License Here]

## Support

For issues or questions, please open an issue on GitHub.
