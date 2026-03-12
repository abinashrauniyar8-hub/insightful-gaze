# FaceInsight — Customer Sentiment & Demographic Analysis System

> **Final Year Project**  
> **Author:** Abinash Rauniyar  
> **Version:** 1.0.0  
> **Date:** 2026

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Problem Statement](#problem-statement)
3. [Objectives](#objectives)
4. [Features](#features)
5. [System Architecture](#system-architecture)
6. [Technology Stack](#technology-stack)
7. [Machine Learning Models](#machine-learning-models)
8. [Data Flow & Privacy Architecture](#data-flow--privacy-architecture)
9. [Database Schema](#database-schema)
10. [Application Pages](#application-pages)
11. [Component Structure](#component-structure)
12. [Installation & Setup](#installation--setup)
13. [Configuration](#configuration)
14. [Usage Guide](#usage-guide)
15. [API & Hooks Reference](#api--hooks-reference)
16. [Security & Privacy](#security--privacy)
17. [Testing](#testing)
18. [Limitations & Future Work](#limitations--future-work)
19. [Screenshots](#screenshots)
20. [References](#references)
21. [License](#license)

---

## Project Overview

**FaceInsight** is a privacy-focused, real-time facial analysis web application designed for retail stores, cafés, and service environments. It uses browser-based machine learning to detect faces from a webcam feed and analyze customer emotions, age groups, and gender — all without transmitting or storing any facial images.

The system provides a comprehensive analytics dashboard with sentiment trends, demographic breakdowns, and actionable insights to help businesses understand customer engagement and satisfaction levels.

### Key Highlights
- 🧠 **100% Browser-Based ML** — No server-side processing of video/images
- 🔒 **Privacy by Design** — No facial images stored or transmitted
- 📊 **Real-Time Analytics** — Live dashboards with multiple chart types
- 👥 **Multi-Face Support** — Simultaneously analyze multiple faces
- 🎯 **7 Emotion Classes** — Happy, Sad, Angry, Neutral, Surprised, Fearful, Disgusted
- 📱 **Responsive Design** — Works on desktop and tablet devices

---

## Problem Statement

Traditional customer feedback mechanisms (surveys, reviews, feedback forms) suffer from low response rates and selection bias. Businesses lack real-time visibility into customer sentiment and demographics. Existing facial analysis solutions raise significant privacy concerns by transmitting facial data to cloud servers.

**FaceInsight** addresses these challenges by providing:
- Real-time, passive customer sentiment monitoring
- Complete privacy preservation through client-side ML processing
- Actionable demographic and emotional analytics
- Zero friction for customers (no participation required)

---

## Objectives

1. **Design and implement** a real-time face detection system using browser-based machine learning
2. **Classify customer emotions** into 7 categories with confidence scores
3. **Predict demographic attributes** (age group, gender) from facial features
4. **Build a comprehensive analytics dashboard** for visualizing sentiment trends and demographics
5. **Ensure complete privacy** by processing all video locally and storing only anonymized statistics
6. **Create an intuitive, responsive UI** suitable for retail and hospitality environments

---

## Features

### 1. Real-Time Face Detection
- Live webcam feed with face bounding box overlays
- Multi-face simultaneous detection
- Configurable detection interval (100ms–2000ms)
- Camera device selection support

### 2. Emotion Recognition
Classifies facial expressions into 7 emotions using deep learning:

| Emotion | Emoji | Category |
|---------|-------|----------|
| Happy | 😊 | Positive |
| Surprised | 😲 | Positive |
| Neutral | 😐 | Neutral |
| Sad | 😢 | Negative |
| Angry | 😠 | Negative |
| Fearful | 😨 | Negative |
| Disgusted | 🤢 | Negative |

### 3. Demographic Analysis
- **Age Groups:** Child (0–12), Teen (13–19), Adult (20–59), Senior (60+)
- **Gender:** Male, Female
- Confidence percentages for each prediction

### 4. Analytics Dashboard
- **Total Faces Analyzed** — Running counter
- **Sentiment Score** — Composite gauge (0–100)
- **Emotion Distribution** — Animated pie chart
- **Sentiment Trend** — Hourly line chart (positive vs negative vs neutral)
- **Age Group Distribution** — Bar chart
- **Emotion by Gender** — Grouped bar chart
- **Peak Unhappy Times** — Highlight cards showing worst time slots
- **Time Range Filters** — Today, This Week, This Month, All Time

### 5. Settings & Data Management
- Camera device selection
- Detection interval adjustment
- Toggle database saving on/off
- Export analytics data as JSON
- Clear all stored data

---

## System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Client Browser                        │
│                                                          │
│  ┌──────────┐    ┌───────────────┐    ┌──────────────┐  │
│  │  Webcam   │───▶│  face-api.js  │───▶│  React UI    │  │
│  │  Stream   │    │ (TensorFlow.js)│   │  Components  │  │
│  └──────────┘    └───────┬───────┘    └──────┬───────┘  │
│                          │                    │          │
│                  ┌───────▼───────┐            │          │
│                  │  Anonymized   │            │          │
│                  │  Data Only    │            │          │
│                  │  (no images)  │            │          │
│                  └───────┬───────┘            │          │
└──────────────────────────┼────────────────────┼──────────┘
                           │                    │
                   ┌───────▼────────────────────▼──────┐
                   │         Firebase Firestore         │
                   │     (Anonymized Statistics Only)   │
                   │                                    │
                   │  • emotion, confidence             │
                   │  • age_group, age_estimate          │
                   │  • gender, gender_confidence        │
                   │  • timestamp, session_id            │
                   └────────────────────────────────────┘
```

### Data Flow

1. **Video Capture** — Browser captures frames from the user's webcam
2. **Local ML Processing** — face-api.js (built on TensorFlow.js) processes each frame entirely in the browser
3. **Feature Extraction** — The ML models extract emotion, age, and gender predictions
4. **Anonymization** — Only statistical labels and confidence scores are retained; no facial features, embeddings, or images
5. **Storage** — Anonymized records are saved to Firebase Firestore
6. **Visualization** — The dashboard queries stored data and renders interactive charts

---

## Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend Framework** | React 18.3 + TypeScript | Component-based UI |
| **Build Tool** | Vite 5.4 | Fast dev server and bundling |
| **Styling** | Tailwind CSS 3.4 | Utility-first CSS framework |
| **UI Components** | shadcn/ui (Radix UI) | Accessible component primitives |
| **Charts** | Recharts 2.15 | Data visualization |
| **ML Framework** | face-api.js 0.22 (TensorFlow.js) | Browser-based face analysis |
| **Database** | Firebase Firestore | Real-time NoSQL cloud database |
| **Routing** | React Router DOM 6.30 | Client-side routing |
| **State Management** | TanStack React Query 5 | Server state management |
| **Icons** | Lucide React | Icon library |
| **Notifications** | Sonner | Toast notifications |
| **Date Utilities** | date-fns 3.6 | Date formatting and manipulation |
| **Form Handling** | React Hook Form + Zod | Form validation |

---

## Machine Learning Models

FaceInsight uses **face-api.js**, a JavaScript API built on top of TensorFlow.js, which provides pre-trained deep learning models for face analysis.

### Models Used

| Model | File | Purpose | Architecture |
|-------|------|---------|--------------|
| **Tiny Face Detector** | `tiny_face_detector_model` | Face detection & localization | MobileNetV1-based SSD |
| **Face Landmark 68** | `face_landmark_68_model` | 68-point facial landmark detection | CNN |
| **Face Expression** | `face_expression_model` | 7-class emotion classification | CNN |
| **Age & Gender** | `age_gender_model` | Age estimation & gender classification | CNN |
| **Face Recognition** | `face_recognition_model` | Face descriptor extraction | ResNet-34 |

### Model Loading Strategy
- Models are loaded asynchronously on application mount
- All 5 models load in parallel via `Promise.all()`
- A singleton loading promise prevents duplicate loads
- Models are served from `/public/models/` directory
- Total model size: ~6MB (sharded weight files)

### Detection Pipeline
```
Video Frame
    │
    ▼
TinyFaceDetector (detect face bounding boxes)
    │
    ▼
FaceLandmark68Net (locate 68 facial landmarks)
    │
    ▼
FaceExpressionNet (classify emotion from expression)
    │
    ▼
AgeGenderNet (estimate age and classify gender)
    │
    ▼
Structured Detection Result
```

### Detection Options
```typescript
new faceapi.TinyFaceDetectorOptions({
  inputSize: 416,      // Input resolution
  scoreThreshold: 0.5  // Minimum confidence threshold
})
```

---

## Data Flow & Privacy Architecture

### What IS Stored (Anonymized)
| Field | Type | Example |
|-------|------|---------|
| `emotion` | string | `"happy"` |
| `emotion_confidence` | float | `0.92` |
| `age_group` | string | `"Adult"` |
| `age_estimate` | integer | `28` |
| `gender` | string | `"male"` |
| `gender_confidence` | float | `0.95` |
| `session_id` | UUID | `"a1b2c3d4-..."` |
| `timestamp` | ISO string | `"2026-03-12T10:30:00Z"` |

### What is NEVER Stored
- ❌ Face images or video frames
- ❌ Facial landmarks or geometry
- ❌ Face embeddings / descriptors
- ❌ Personal identifiers
- ❌ IP addresses or location data

### Privacy Guarantees
1. **Client-Side Processing** — All ML inference runs in the browser's JavaScript engine
2. **No Network Transmission** — Video frames never leave the client device
3. **Irreversible Anonymization** — Stored data cannot be reverse-engineered to reconstruct faces
4. **Session Isolation** — Each browser session gets a random UUID, unlinked to user identity
5. **Data Deletion** — Users can export and/or delete all stored data at any time

---

## Database Schema

### Firebase Firestore Collection: `face_analytics`

```
face_analytics/
├── {document_id}
│   ├── emotion: string           // "happy", "sad", "angry", etc.
│   ├── emotion_confidence: number // 0.0 – 1.0
│   ├── age_group: string          // "Child", "Teen", "Adult", "Senior"
│   ├── age_estimate: number       // Estimated age (e.g., 25)
│   ├── gender: string             // "male" or "female"
│   ├── gender_confidence: number  // 0.0 – 1.0
│   ├── session_id: string         // Random UUID per browser session
│   ├── timestamp: string          // ISO 8601 timestamp
│   └── created_at: string         // ISO 8601 creation time
```

### Indexing
- Primary index on `timestamp` (descending) for time-range queries
- Compound queries use `timestamp` + `where` filters for date ranges

---

## Application Pages

### 1. Landing Page (`/`)
The entry point showcasing the system's capabilities and privacy commitment.

**Sections:**
- Hero banner with gradient text and CTA buttons
- Feature grid (6 cards: Detection, Emotions, Demographics, Dashboard, Privacy, Insights)
- Privacy commitment section with visual shield icon
- "How It Works" 3-step flow (Camera → AI Analysis → Insights)
- Call-to-action footer

### 2. Live Analysis (`/analyze`)
The core analysis page with webcam integration.

**Components:**
- Start/Stop analysis toggle button
- Live face count and total analyzed counters
- Video feed with face detection overlays (bounding boxes, labels)
- Each detected face shows: emotion emoji, emotion label, confidence %, age group, gender
- Privacy badge confirming local-only processing

### 3. Analytics Dashboard (`/dashboard`)
Comprehensive data visualization page.

**Widgets & Charts:**
- **Stat Cards** — Total Analyzed, Sentiment Score, Positive %, Negative %
- **Emotion Pie Chart** — Distribution of detected emotions with percentages
- **Sentiment Trend** — Hourly line chart showing positive/negative/neutral over time
- **Age Group Chart** — Bar chart of Child/Teen/Adult/Senior distribution
- **Gender × Emotion Chart** — Grouped bar chart showing emotions per gender
- **Unhappy Times Card** — Top 3 peak negative-sentiment hours
- **Sentiment Gauge** — Visual 0–100 gauge with color coding
- **Time Range Selector** — Filter: Today / Week / Month / All

### 4. Settings (`/settings`)
Configuration and data management.

**Options:**
- Camera device selection dropdown
- Detection interval slider (100ms–2000ms)
- Save-to-database toggle
- Export data as JSON file
- Clear all analytics data (with confirmation)
- App information (version, ML framework, storage backend)

---

## Component Structure

```
src/
├── App.tsx                          # Root component with routing
├── main.tsx                         # Application entry point
├── index.css                        # Global styles & design tokens
│
├── components/
│   ├── layout/
│   │   └── Header.tsx               # Navigation header with links
│   │
│   ├── detection/
│   │   ├── CameraView.tsx           # Webcam feed + detection controls
│   │   └── FaceOverlay.tsx          # Bounding box + label overlay per face
│   │
│   ├── dashboard/
│   │   ├── StatCard.tsx             # Metric card (icon + value + label)
│   │   ├── EmotionPieChart.tsx      # Pie chart of emotion distribution
│   │   ├── SentimentTrendChart.tsx  # Hourly sentiment line chart
│   │   ├── AgeGroupChart.tsx        # Age group bar chart
│   │   ├── GenderEmotionChart.tsx   # Gender × emotion grouped bars
│   │   ├── SentimentGauge.tsx       # 0–100 sentiment gauge
│   │   ├── UnhappyTimesCard.tsx     # Peak negative-sentiment hours
│   │   └── TimeRangeSelector.tsx    # Today/Week/Month/All filter
│   │
│   └── ui/                          # shadcn/ui component library
│       ├── button.tsx
│       ├── card.tsx
│       ├── select.tsx
│       ├── slider.tsx
│       ├── switch.tsx
│       ├── chart.tsx
│       └── ... (40+ reusable components)
│
├── hooks/
│   ├── useFaceDetection.ts          # Face detection logic & camera control
│   ├── useAnalytics.ts             # Dashboard data fetching & computation
│   ├── use-mobile.tsx              # Mobile breakpoint detection
│   └── use-toast.ts               # Toast notification hook
│
├── lib/
│   ├── faceApi.ts                  # face-api.js wrapper & utilities
│   └── utils.ts                    # General utility functions (cn, etc.)
│
├── integrations/
│   └── firebase/
│       └── client.ts               # Firebase initialization & Firestore exports
│
└── pages/
    ├── Index.tsx                    # Landing page
    ├── Analyze.tsx                  # Live analysis page
    ├── Dashboard.tsx               # Analytics dashboard
    ├── Settings.tsx                # Configuration page
    └── NotFound.tsx                # 404 page
```

---

## Installation & Setup

### Prerequisites
- **Node.js** ≥ 18.x
- **npm** or **bun** package manager
- A modern browser with WebRTC support (Chrome, Firefox, Edge)
- Webcam access

### Steps

```bash
# 1. Clone the repository
git clone <repository-url>
cd faceinsight

# 2. Install dependencies
npm install

# 3. Download ML models (if not already present)
node download-models.js
# Or on Windows PowerShell:
# ./download-models.ps1

# 4. Start development server
npm run dev

# 5. Open in browser
# Navigate to http://localhost:5173
```

### ML Model Files
The following model files must exist in `public/models/`:

```
public/models/
├── tiny_face_detector_model-shard1
├── tiny_face_detector_model-weights_manifest.json
├── face_landmark_68_model-shard1
├── face_landmark_68_model-weights_manifest.json
├── face_expression_model-shard1
├── face_expression_model-weights_manifest.json
├── age_gender_model-shard1
├── age_gender_model-weights_manifest.json
├── face_recognition_model-shard1
├── face_recognition_model-shard2
└── face_recognition_model-weights_manifest.json
```

---

## Configuration

### Firebase Configuration
Firebase is configured in `src/integrations/firebase/client.ts` with the following services:
- **Firestore** — Document database for analytics storage
- **Analytics** — Firebase Analytics for app usage tracking

### Environment Variables
| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Supabase project URL (auto-configured) |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Supabase anon key (auto-configured) |
| `VITE_SUPABASE_PROJECT_ID` | Supabase project ID (auto-configured) |

### Detection Configuration
Adjustable via the Settings page:
| Setting | Default | Range |
|---------|---------|-------|
| Detection Interval | 500ms | 100ms – 2000ms |
| Save to Database | Enabled | On/Off |
| Camera | First available | Device selection |

---

## Usage Guide

### Starting Live Analysis
1. Navigate to the **Analyze** page
2. Click **"Start Analysis"** — the browser will request camera permission
3. Allow camera access when prompted
4. Face detection begins automatically at the configured interval
5. Detected faces show bounding boxes with emotion labels, age, and gender
6. Click **"Stop Analysis"** to end the session

### Viewing Analytics
1. Navigate to the **Dashboard** page
2. Use the time range selector to filter data (Today / Week / Month / All)
3. Charts update in real-time as new detections are saved
4. Review stat cards for quick metrics (total analyzed, sentiment score)
5. Check "Peak Unhappy Times" to identify problematic time periods

### Exporting Data
1. Navigate to **Settings**
2. Click **"Export Data (JSON)"**
3. A JSON file downloads containing all stored analytics records
4. Data can be imported into Excel, Python, or any analytics tool

### Clearing Data
1. Navigate to **Settings**
2. Click **"Clear All Data"**
3. Confirm the action in the dialog
4. All stored analytics are permanently deleted

---

## API & Hooks Reference

### `useFaceDetection(options)`
Core hook for managing webcam and face detection.

```typescript
interface UseFaceDetectionOptions {
  autoStart?: boolean;        // Auto-start detection on mount (default: false)
  detectionInterval?: number; // Ms between detections (default: 500)
  saveToDatabase?: boolean;   // Persist results to Firestore (default: true)
}

// Returns
{
  isLoading: boolean;          // True while ML models are loading
  error: string | null;        // Error message if any
  isRunning: boolean;          // True when detection is active
  detections: FaceDetection[]; // Current frame's detected faces
  modelsReady: boolean;        // True when all ML models are loaded
  totalAnalyzed: number;       // Running count of faces analyzed
  startDetection: (deviceId?: string) => Promise<boolean>;
  stopDetection: () => void;
  setVideoElement: (el: HTMLVideoElement | null) => void;
  videoRef: React.RefObject<HTMLVideoElement>;
}
```

### `useAnalytics(timeRange)`
Hook for fetching and computing dashboard analytics.

```typescript
type TimeRange = 'today' | 'week' | 'month' | 'all';

// Returns
{
  data: AnalyticsData[];   // Raw analytics records
  stats: {
    total: number;
    emotionCounts: Record<string, number>;
    ageGroupCounts: Record<string, number>;
    genderCounts: Record<string, number>;
    sentimentScore: number;       // 0–100
    positive: number;
    negative: number;
    neutral: number;
    hourlyData: Record<string, {...}>;
    emotionByGender: Record<string, Record<string, number>>;
    peakUnhappyHours: { hour: string; count: number }[];
  };
  isLoading: boolean;
  error: string | null;
}
```

### `FaceDetection` Interface
```typescript
interface FaceDetection {
  id: string;
  box: { x: number; y: number; width: number; height: number };
  emotion: string;           // One of 7 emotion labels
  emotionConfidence: number; // 0.0 – 1.0
  age: number;               // Estimated age in years
  ageGroup: string;          // "Child" | "Teen" | "Adult" | "Senior"
  gender: string;            // "male" | "female"
  genderConfidence: number;  // 0.0 – 1.0
}
```

### Utility Functions (`src/lib/faceApi.ts`)
| Function | Description |
|----------|-------------|
| `loadModels()` | Loads all face-api.js models from `/models/` |
| `isModelsLoaded()` | Returns `true` if models are ready |
| `detectFaces(video)` | Runs detection on a video element, returns `FaceDetection[]` |
| `getAgeGroup(age)` | Maps numeric age to group label |
| `getEmotionEmoji(emotion)` | Returns emoji for emotion string |
| `getEmotionColor(emotion)` | Returns HSL color for emotion |

---

## Security & Privacy

### Threat Model
| Threat | Mitigation |
|--------|-----------|
| Face image exfiltration | All processing is client-side; no images sent to any server |
| Identity tracking | No facial embeddings or biometric data stored |
| Data re-identification | Only aggregate labels stored; impossible to reconstruct faces |
| Unauthorized data access | Firebase security rules; data export/delete in settings |
| Session correlation | Random UUID per session; no cookies or login required |

### Privacy Compliance
- **GDPR Alignment** — No personal data collected; only anonymous statistics
- **Data Minimization** — Only essential fields stored (emotion, age group, gender)
- **Right to Deletion** — One-click data clearing in Settings
- **Transparency** — Privacy notice displayed on landing page and analysis page

---

## Testing

### Running Tests
```bash
# Run all tests
npm test

# Watch mode
npm run test:watch
```

### Test Configuration
- **Framework:** Vitest 3.2
- **DOM Environment:** jsdom
- **Utilities:** @testing-library/react, @testing-library/jest-dom

---

## Limitations & Future Work

### Current Limitations
1. **Lighting Sensitivity** — Detection accuracy decreases in poor lighting
2. **Angle Dependency** — Best results with frontal face orientation
3. **Age Estimation Variance** — ML age predictions can have ±5–10 year error margins
4. **Browser Compatibility** — Requires modern browser with WebRTC and WebGL support
5. **Single-Tab Operation** — Multiple tabs may cause camera conflicts
6. **No User Authentication** — Open access by design (educational project)

### Future Enhancements
1. **Email Alerts** — Notify when negative sentiment exceeds threshold
2. **PDF Report Generation** — Daily/weekly summary reports with charts
3. **Period Comparison** — Compare sentiment across different time ranges
4. **Heatmap Visualization** — Time-of-day × day-of-week sentiment heatmap
5. **Multi-Camera Support** — Monitor multiple camera feeds simultaneously
6. **Offline Mode** — Queue analytics locally when network is unavailable
7. **Custom Emotion Groups** — Let users define positive/negative categories
8. **A/B Testing Integration** — Correlate sentiment with store layout changes

---

## Screenshots

> *Screenshots can be added here showing:*
> 1. Landing page hero section
> 2. Live analysis with face detection overlays
> 3. Analytics dashboard with charts
> 4. Settings page

---

## References

1. **face-api.js** — Justadudewhohacks. "face-api.js — JavaScript API for Face Detection and Face Recognition in the Browser." GitHub. https://github.com/justadudewhohacks/face-api.js
2. **TensorFlow.js** — Google. "TensorFlow.js: Machine Learning for the Web and Beyond." https://www.tensorflow.org/js
3. **React** — Meta. "React — A JavaScript Library for Building User Interfaces." https://react.dev
4. **Recharts** — "Recharts — A composable charting library built on React components." https://recharts.org
5. **Tailwind CSS** — "A utility-first CSS framework for rapidly building custom designs." https://tailwindcss.com
6. **shadcn/ui** — "Beautifully designed components built with Radix UI and Tailwind CSS." https://ui.shadcn.com
7. **Firebase** — Google. "Firebase — App development platform." https://firebase.google.com
8. **Ekman, P.** (1992). "An Argument for Basic Emotions." *Cognition & Emotion*, 6(3-4), 169-200.
9. **Viola, P. & Jones, M.** (2001). "Rapid Object Detection using a Boosted Cascade of Simple Features." *CVPR*.
10. **Howard, A.G., et al.** (2017). "MobileNets: Efficient Convolutional Neural Networks for Mobile Vision Applications." *arXiv:1704.04861*.

---

## License

This project is developed as a final year academic project by **Abinash Rauniyar**.  
All rights reserved © 2026.

---

<p align="center">
  <strong>FaceInsight</strong> — Understanding customers, respecting privacy.
</p>
