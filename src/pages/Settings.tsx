import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Camera, Download, Trash2, Settings as SettingsIcon, Info } from 'lucide-react';
import { db, collection, getDocs, query, orderBy, deleteDoc, doc } from '@/integrations/firebase/client';
import { toast } from 'sonner';

interface CameraDevice {
  deviceId: string;
  label: string;
}

export default function Settings() {
  const [cameras, setCameras] = useState<CameraDevice[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<string>('');
  const [saveToDatabase, setSaveToDatabase] = useState(true);
  const [detectionInterval, setDetectionInterval] = useState(500);
  const [isExporting, setIsExporting] = useState(false);
  const [isClearing, setIsClearing] = useState(false);

  useEffect(() => {
    async function getCameras() {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices
          .filter((device) => device.kind === 'videoinput')
          .map((device) => ({
            deviceId: device.deviceId,
            label: device.label || `Camera ${device.deviceId.slice(0, 8)}`,
          }));
        setCameras(videoDevices);
        if (videoDevices.length > 0 && !selectedCamera) {
          setSelectedCamera(videoDevices[0].deviceId);
        }
      } catch (error) {
        console.error('Error getting cameras:', error);
      }
    }

    getCameras();
  }, []);

  const handleExportData = async () => {
    setIsExporting(true);
    try {
      const q = query(
        collection(db, 'face_analytics'),
        orderBy('timestamp', 'desc')
      );
      const snap = await getDocs(q);
      const documents = snap.docs.map(d => ({ id: d.id, ...d.data() }));

      const blob = new Blob([JSON.stringify(documents, null, 2)], {
        type: 'application/json',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `face-analytics-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success('Data exported successfully');
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export data');
    } finally {
      setIsExporting(false);
    }
  };

  const handleClearData = async () => {
    if (!confirm('Are you sure you want to delete all analytics data? This cannot be undone.')) {
      return;
    }

    setIsClearing(true);
    try {
      const q = query(collection(db, 'face_analytics'));
      const snap = await getDocs(q);
      const batchDeletes = snap.docs.map(d => deleteDoc(doc(db, 'face_analytics', d.id)));
      await Promise.all(batchDeletes);

      toast.success('All data cleared successfully');
    } catch (error) {
      console.error('Clear error:', error);
      toast.error('Failed to clear data');
    } finally {
      setIsClearing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Configure camera, detection, and data preferences
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Camera Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Camera Settings
              </CardTitle>
              <CardDescription>
                Configure which camera to use for face detection
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="camera">Select Camera</Label>
                <Select value={selectedCamera} onValueChange={setSelectedCamera}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a camera" />
                  </SelectTrigger>
                  <SelectContent>
                    {cameras.map((camera) => (
                      <SelectItem key={camera.deviceId} value={camera.deviceId}>
                        {camera.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {cameras.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    No cameras found. Please allow camera access.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Detection Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="h-5 w-5" />
                Detection Settings
              </CardTitle>
              <CardDescription>
                Adjust detection frequency and behavior
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Save to Database</Label>
                  <p className="text-sm text-muted-foreground">
                    Store analytics data for dashboard visualization
                  </p>
                </div>
                <Switch checked={saveToDatabase} onCheckedChange={setSaveToDatabase} />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Detection Interval</Label>
                  <span className="text-sm text-muted-foreground">
                    {detectionInterval}ms
                  </span>
                </div>
                <Slider
                  value={[detectionInterval]}
                  onValueChange={([value]) => setDetectionInterval(value)}
                  min={100}
                  max={2000}
                  step={100}
                />
                <p className="text-xs text-muted-foreground">
                  Lower values = more frequent detection (higher CPU usage)
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Data Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Data Management
              </CardTitle>
              <CardDescription>Export or clear your analytics data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={handleExportData}
                disabled={isExporting}
              >
                <Download className="h-4 w-4 mr-2" />
                {isExporting ? 'Exporting...' : 'Export Data (JSON)'}
              </Button>

              <Button
                variant="destructive"
                className="w-full"
                onClick={handleClearData}
                disabled={isClearing}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                {isClearing ? 'Clearing...' : 'Clear All Data'}
              </Button>
            </CardContent>
          </Card>

          {/* About */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                About
              </CardTitle>
              <CardDescription>
                Information about this application
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Version</span>
                  <span>1.0.0</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">ML Framework</span>
                  <span>TensorFlow.js / face-api.js</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Storage</span>
                  <span>Lovable Cloud</span>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-medium mb-2">Privacy Notice</h4>
                <p className="text-sm text-muted-foreground">
                  This application processes all video frames locally in your browser.
                  No face images are ever stored or transmitted. Only anonymized
                  statistics (emotion, age group, gender) are saved to help generate
                  analytics insights.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
