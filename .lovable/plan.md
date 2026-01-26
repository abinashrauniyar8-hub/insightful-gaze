

# Facial Recognition Customer Sentiment & Demographic Analysis System

## Overview
A privacy-focused, real-time facial analysis dashboard that runs entirely in the browser. Detects faces from webcam, predicts emotions, age groups, and gender, then displays beautiful analytics dashboards - all without storing any images.

---

## Core Features

### 1. Live Camera Detection View
- **Webcam integration** with permission handling and camera selection
- **Real-time face detection** using TensorFlow.js face-api.js models
- **Visual overlays** showing:
  - Bounding boxes around detected faces
  - Emotion label with confidence score
  - Age group prediction
  - Gender prediction
- **Multi-face support** - analyze multiple customers simultaneously
- **Privacy indicator** showing "No images stored" badge

### 2. Emotion Classification
Detect and classify 7 emotions:
- 😊 Happy
- 😢 Sad  
- 😠 Angry
- 😐 Neutral
- 😲 Surprised
- 😨 Fearful
- 🤢 Disgusted

### 3. Demographic Analysis
- **Age Groups:** Child (0-12), Teen (13-19), Adult (20-59), Senior (60+)
- **Gender:** Male, Female
- All predictions displayed in real-time with confidence percentages

### 4. Analytics Dashboard
Beautiful responsive dashboard with:

**Real-Time Widgets:**
- Total faces analyzed today (counter)
- Current sentiment score (positive vs negative)
- Live emotion distribution (animated pie chart)

**Historical Charts:**
- Hourly sentiment trend (line chart)
- Emotion breakdown by gender (grouped bar chart)
- Age group distribution (donut chart)
- Peak activity times (heatmap-style visualization)
- Unhappy time slots highlighting

**Time Range Filters:**
- Today, Last 7 days, Last 30 days, Custom range

### 5. Data Storage (Supabase)
Store anonymized analytics only:
- Emotion label
- Age group
- Gender
- Timestamp
- Confidence scores

**NO storage of:**
- Face images
- Facial embeddings
- Personal identifiers

---

## User Experience

### Pages
1. **Home/Landing** - Project overview with privacy commitment
2. **Live Analysis** - Camera view with real-time detection and overlays
3. **Dashboard** - Full analytics with charts and insights
4. **Settings** - Camera selection, detection sensitivity, data export

### Design
- Modern, professional dark theme (ideal for retail/café environments)
- Clean card-based layouts
- Smooth animations on charts
- Responsive design (works on tablets too)
- Clear privacy disclaimer prominently displayed

---

## Technical Approach

### ML Models (All Browser-Based)
- **face-api.js** (TensorFlow.js wrapper) for:
  - Face detection (SSD MobileNet)
  - Face landmarks (68 points)
  - Expression recognition (7 emotions)
  - Age estimation
  - Gender classification

### Data Flow
1. Webcam captures frames → 
2. TensorFlow.js processes in-browser → 
3. Anonymized results sent to Supabase → 
4. Dashboard queries and visualizes data

### Privacy Architecture
- Video frames never leave the browser
- No network transmission of face images
- Only aggregate statistics stored
- Optional: No database at all (session-only mode)

---

## Pages Breakdown

| Page | Purpose |
|------|---------|
| **/** | Landing page with project info and privacy policy |
| **/analyze** | Live camera feed with face detection overlays |
| **/dashboard** | Full analytics with all charts and insights |
| **/settings** | Configuration options |

---

## Deliverables

✅ Working webcam integration with multi-face detection  
✅ Real-time emotion, age, and gender predictions with overlays  
✅ Comprehensive analytics dashboard with 6+ chart types  
✅ Supabase integration for persistent analytics  
✅ Privacy-first design (no image storage)  
✅ Responsive, modern UI with dark theme  
✅ Settings page for customization  
✅ Clear documentation and privacy notices

