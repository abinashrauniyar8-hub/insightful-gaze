import { useRef, useState, useEffect } from 'react';
import { useFaceDetection } from '@/hooks/useFaceDetection';
import { FaceOverlay } from './FaceOverlay';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, CameraOff, Loader2, Shield, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CameraViewProps {
  saveToDatabase?: boolean;
}

export function CameraView({ saveToDatabase = true }: CameraViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [videoSize, setVideoSize] = useState({ width: 1280, height: 720 });

  const {
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
  } = useFaceDetection({ saveToDatabase });

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      const handleLoadedMetadata = () => {
        if (videoRef.current) {
          setVideoSize({
            width: videoRef.current.videoWidth,
            height: videoRef.current.videoHeight,
          });
        }
      };
      videoRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
      return () => {
        videoRef.current?.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
    }
  }, [videoRef]);

  const handleToggle = () => {
    if (isRunning) {
      stopDetection();
    } else {
      startDetection();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            onClick={handleToggle}
            disabled={isLoading || !modelsReady}
            variant={isRunning ? 'destructive' : 'default'}
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Loading Models...
              </>
            ) : isRunning ? (
              <>
                <CameraOff className="h-5 w-5" />
                Stop Analysis
              </>
            ) : (
              <>
                <Camera className="h-5 w-5" />
                Start Analysis
              </>
            )}
          </Button>

          {isRunning && (
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-success pulse-glow" />
              <span className="text-sm text-muted-foreground">Live</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">Faces detected:</span>
            <span className="font-bold text-foreground">{detections.length}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Total analyzed:</span>
            <span className="font-bold text-primary">{totalAnalyzed}</span>
          </div>
        </div>
      </div>

      {error && (
        <Card className="border-destructive bg-destructive/10">
          <CardContent className="py-4">
            <p className="text-destructive text-sm">{error}</p>
          </CardContent>
        </Card>
      )}

      <Card className="overflow-hidden">
        <div
          ref={containerRef}
          className={cn(
            'relative aspect-video bg-muted',
            !isRunning && 'flex items-center justify-center'
          )}
        >
          <video
            ref={(el) => setVideoElement(el)}
            className={cn(
              'w-full h-full object-cover',
              !isRunning && 'hidden'
            )}
            muted
            playsInline
          />

          {!isRunning && (
            <div className="text-center space-y-4">
              <Camera className="h-16 w-16 mx-auto text-muted-foreground/50" />
              <div>
                <p className="text-lg font-medium text-muted-foreground">
                  Camera preview will appear here
                </p>
                <p className="text-sm text-muted-foreground/70">
                  Click "Start Analysis" to begin face detection
                </p>
              </div>
            </div>
          )}

          {isRunning &&
            detections.map((detection) => (
              <FaceOverlay
                key={detection.id}
                detection={detection}
                videoWidth={videoSize.width}
                videoHeight={videoSize.height}
                containerWidth={containerSize.width}
                containerHeight={containerSize.height}
              />
            ))}
        </div>
      </Card>

      <Card className="border-success/30 bg-success/5">
        <CardContent className="py-4">
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-success" />
            <div>
              <p className="font-medium text-success">Privacy Protected</p>
              <p className="text-sm text-muted-foreground">
                All face detection runs locally in your browser. No images are stored or transmitted.
                Only anonymized statistics are saved.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
