import * as faceapi from 'face-api.js';

let modelsLoaded = false;
let loadingPromise: Promise<void> | null = null;

const MODEL_URL = '/models';

export async function loadModels(): Promise<void> {
  if (modelsLoaded) return;

  if (loadingPromise) {
    return loadingPromise;
  }

  loadingPromise = (async () => {
    try {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL),
      ]);
      modelsLoaded = true;
      console.log('Face-api.js models loaded successfully');
    } catch (error) {
      console.error('Error loading face-api.js models:', error);
      loadingPromise = null;
      throw error;
    }
  })();

  return loadingPromise;
}

export function isModelsLoaded(): boolean {
  return modelsLoaded;
}

export interface FaceDetection {
  id: string;
  box: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  emotion: string;
  emotionConfidence: number;
  age: number;
  ageGroup: string;
  gender: string;
  genderConfidence: number;
}

export function getAgeGroup(age: number): string {
  if (age <= 12) return 'Child';
  if (age <= 19) return 'Teen';
  if (age <= 59) return 'Adult';
  return 'Senior';
}

export function getEmotionEmoji(emotion: string): string {
  const emojiMap: Record<string, string> = {
    happy: '😊',
    sad: '😢',
    angry: '😠',
    neutral: '😐',
    surprised: '😲',
    fearful: '😨',
    disgusted: '🤢',
  };
  return emojiMap[emotion] || '😐';
}

export function getEmotionColor(emotion: string): string {
  const colorMap: Record<string, string> = {
    happy: 'hsl(var(--emotion-happy))',
    sad: 'hsl(var(--emotion-sad))',
    angry: 'hsl(var(--emotion-angry))',
    neutral: 'hsl(var(--emotion-neutral))',
    surprised: 'hsl(var(--emotion-surprised))',
    fearful: 'hsl(var(--emotion-fearful))',
    disgusted: 'hsl(var(--emotion-disgusted))',
  };
  return colorMap[emotion] || colorMap.neutral;
}

export async function detectFaces(
  video: HTMLVideoElement
): Promise<FaceDetection[]> {
  if (!modelsLoaded) {
    throw new Error('Models not loaded');
  }

  const detections = await faceapi
    .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
    .withFaceLandmarks()
    .withFaceExpressions()
    .withAgeAndGender();

  return detections.map((detection, index) => {
    const expressions = detection.expressions;
    const dominantExpression = Object.entries(expressions).reduce((a, b) =>
      a[1] > b[1] ? a : b
    );

    return {
      id: `face-${index}-${Date.now()}`,
      box: {
        x: detection.detection.box.x,
        y: detection.detection.box.y,
        width: detection.detection.box.width,
        height: detection.detection.box.height,
      },
      emotion: dominantExpression[0],
      emotionConfidence: dominantExpression[1],
      age: Math.round(detection.age),
      ageGroup: getAgeGroup(detection.age),
      gender: detection.gender,
      genderConfidence: detection.genderProbability,
    };
  });
}

export { faceapi };
