import { useState, useEffect, useRef, useCallback } from 'react';
import { loadModels, detectFaces, FaceDetection, isModelsLoaded } from '@/lib/faceApi';
import { supabase } from '@/integrations/supabase/client';

interface UseFaceDetectionOptions {
  autoStart?: boolean;
  detectionInterval?: number;
  saveToDatabase?: boolean;
}

export function useFaceDetection(options: UseFaceDetectionOptions = {}) {
  const { 
    autoStart = false, 
    detectionInterval = 500,
    saveToDatabase = true 
  } = options;

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [detections, setDetections] = useState<FaceDetection[]>([]);
  const [modelsReady, setModelsReady] = useState(false);
  const [totalAnalyzed, setTotalAnalyzed] = useState(0);
  
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const sessionIdRef = useRef<string>(crypto.randomUUID());

  // Load models on mount
  useEffect(() => {
    loadModels()
      .then(() => {
        setModelsReady(true);
        setIsLoading(false);
      })
      .catch((err) => {
        setError('Failed to load ML models. Please refresh the page.');
        setIsLoading(false);
        console.error(err);
      });

    return () => {
      stopDetection();
    };
  }, []);

  const saveAnalytics = useCallback(async (detection: FaceDetection) => {
    if (!saveToDatabase) return;

    try {
      await supabase.from('face_analytics').insert({
        emotion: detection.emotion,
        emotion_confidence: detection.emotionConfidence,
        age_group: detection.ageGroup,
        age_estimate: detection.age,
        gender: detection.gender,
        gender_confidence: detection.genderConfidence,
        session_id: sessionIdRef.current,
      });
    } catch (err) {
      console.error('Failed to save analytics:', err);
    }
  }, [saveToDatabase]);

  const runDetection = useCallback(async () => {
    if (!videoRef.current || !isModelsLoaded()) return;

    try {
      const faces = await detectFaces(videoRef.current);
      setDetections(faces);
      
      // Save each face detection to database
      for (const face of faces) {
        await saveAnalytics(face);
        setTotalAnalyzed(prev => prev + 1);
      }
    } catch (err) {
      console.error('Detection error:', err);
    }
  }, [saveAnalytics]);

  const startCamera = useCallback(async (deviceId?: string) => {
    try {
      const constraints: MediaStreamConstraints = {
        video: deviceId 
          ? { deviceId: { exact: deviceId } }
          : { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      return true;
    } catch (err) {
      setError('Failed to access camera. Please allow camera permissions.');
      console.error(err);
      return false;
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, []);

  const startDetection = useCallback(async (deviceId?: string) => {
    if (!modelsReady) {
      setError('Models not ready yet. Please wait.');
      return false;
    }

    const cameraStarted = await startCamera(deviceId);
    if (!cameraStarted) return false;

    setIsRunning(true);
    setError(null);

    // Wait for video to be ready
    await new Promise(resolve => setTimeout(resolve, 500));

    intervalRef.current = setInterval(runDetection, detectionInterval);
    return true;
  }, [modelsReady, startCamera, runDetection, detectionInterval]);

  const stopDetection = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    stopCamera();
    setIsRunning(false);
    setDetections([]);
  }, [stopCamera]);

  const setVideoElement = useCallback((element: HTMLVideoElement | null) => {
    videoRef.current = element;
  }, []);

  // Auto-start if enabled
  useEffect(() => {
    if (autoStart && modelsReady && !isRunning) {
      startDetection();
    }
  }, [autoStart, modelsReady, isRunning, startDetection]);

  return {
    isLoading,
    error,
    isRunning,
    detections,
    modelsReady,
    totalAnalyzed,
    startDetection,
    stopDetection,
    setVideoElement,
    videoRef,
  };
}
