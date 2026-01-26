import { FaceDetection, getEmotionEmoji, getEmotionColor } from '@/lib/faceApi';

interface FaceOverlayProps {
  detection: FaceDetection;
  videoWidth: number;
  videoHeight: number;
  containerWidth: number;
  containerHeight: number;
}

export function FaceOverlay({
  detection,
  videoWidth,
  videoHeight,
  containerWidth,
  containerHeight,
}: FaceOverlayProps) {
  // Calculate scale factors
  const scaleX = containerWidth / videoWidth;
  const scaleY = containerHeight / videoHeight;

  const style = {
    left: detection.box.x * scaleX,
    top: detection.box.y * scaleY,
    width: detection.box.width * scaleX,
    height: detection.box.height * scaleY,
    borderColor: getEmotionColor(detection.emotion),
  };

  const confidence = Math.round(detection.emotionConfidence * 100);

  return (
    <div className="face-overlay animate-scale-in" style={style}>
      <div 
        className="face-label"
        style={{ backgroundColor: getEmotionColor(detection.emotion) }}
      >
        <span className="text-background font-semibold">
          {getEmotionEmoji(detection.emotion)} {detection.emotion} ({confidence}%)
        </span>
      </div>
      <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 bg-card px-3 py-2 rounded-lg text-xs space-y-1 min-w-max shadow-lg">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Age:</span>
          <span className="font-medium">{detection.age} ({detection.ageGroup})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Gender:</span>
          <span className="font-medium capitalize">{detection.gender}</span>
          <span className="text-muted-foreground">({Math.round(detection.genderConfidence * 100)}%)</span>
        </div>
      </div>
    </div>
  );
}
