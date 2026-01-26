import { Header } from '@/components/layout/Header';
import { CameraView } from '@/components/detection/CameraView';

export default function Analyze() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Live Face Analysis</h1>
          <p className="text-muted-foreground">
            Real-time emotion, age, and gender detection using your camera
          </p>
        </div>

        <CameraView saveToDatabase={true} />
      </main>
    </div>
  );
}
