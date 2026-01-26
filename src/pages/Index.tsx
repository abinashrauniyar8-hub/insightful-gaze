import { Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Camera,
  BarChart3,
  Shield,
  Zap,
  Users,
  Brain,
  ArrowRight,
  Lock,
  Eye,
  Smile,
} from 'lucide-react';

const features = [
  {
    icon: Camera,
    title: 'Real-Time Detection',
    description: 'Advanced face detection running directly in your browser using TensorFlow.js',
  },
  {
    icon: Smile,
    title: 'Emotion Recognition',
    description: 'Classify 7 emotions: Happy, Sad, Angry, Neutral, Surprised, Fearful, Disgusted',
  },
  {
    icon: Users,
    title: 'Demographic Analysis',
    description: 'Predict age groups and gender with confidence scores',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Beautiful visualizations with real-time charts and insights',
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'All processing happens locally. No images ever leave your device',
  },
  {
    icon: Zap,
    title: 'Instant Insights',
    description: 'Get actionable customer sentiment data in real-time',
  },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 lg:py-32">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
          <div className="container relative">
            <div className="mx-auto max-w-3xl text-center space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm text-primary">
                <Lock className="h-4 w-4" />
                100% Privacy Protected
              </div>

              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                <span className="gradient-text">Customer Sentiment</span>
                <br />
                <span className="text-foreground">Analysis System</span>
              </h1>

              <p className="text-xl text-muted-foreground">
                Real-time facial recognition for cafés and retail stores. Understand your
                customers' emotions, demographics, and engagement—all while respecting their
                privacy.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg" className="gap-2">
                  <Link to="/analyze">
                    <Camera className="h-5 w-5" />
                    Start Live Analysis
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="gap-2">
                  <Link to="/dashboard">
                    <BarChart3 className="h-5 w-5" />
                    View Dashboard
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Everything you need to understand your customers better, powered by
                cutting-edge machine learning running entirely in your browser.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature) => (
                <Card key={feature.title} className="group hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Privacy Section */}
        <section className="py-20">
          <div className="container">
            <Card className="border-success/30 bg-gradient-to-br from-success/5 to-transparent">
              <CardContent className="p-8 lg:p-12">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <Shield className="h-10 w-10 text-success" />
                      <h2 className="text-3xl font-bold">Privacy by Design</h2>
                    </div>
                    <p className="text-lg text-muted-foreground">
                      We take privacy seriously. Our system is designed from the ground up to
                      protect your customers' identities while still providing valuable
                      insights.
                    </p>
                    <ul className="space-y-3">
                      {[
                        'All processing happens locally in your browser',
                        'No face images are ever stored or transmitted',
                        'Only anonymized statistics are saved',
                        'No facial recognition or identity tracking',
                        'Compliant with privacy regulations',
                      ].map((item) => (
                        <li key={item} className="flex items-center gap-3">
                          <div className="h-2 w-2 rounded-full bg-success" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-success/20 blur-3xl rounded-full" />
                      <div className="relative flex h-48 w-48 items-center justify-center rounded-full bg-success/10 border-2 border-success/30">
                        <Eye className="h-24 w-24 text-success" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Simple setup, powerful insights. Get started in seconds.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: 1,
                  icon: Camera,
                  title: 'Allow Camera Access',
                  description: 'Grant permission for your webcam to capture video frames',
                },
                {
                  step: 2,
                  icon: Brain,
                  title: 'AI Analysis',
                  description: 'TensorFlow.js models detect faces and analyze emotions in real-time',
                },
                {
                  step: 3,
                  icon: BarChart3,
                  title: 'View Insights',
                  description: 'Explore the analytics dashboard for customer sentiment trends',
                },
              ].map((item) => (
                <div key={item.step} className="text-center space-y-4">
                  <div className="relative inline-block">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                      <item.icon className="h-10 w-10 text-primary" />
                    </div>
                    <span className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container">
            <div className="text-center space-y-8">
              <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Start analyzing customer sentiment in real-time. No signup required.
              </p>
              <Button asChild size="lg" className="gap-2">
                <Link to="/analyze">
                  <Camera className="h-5 w-5" />
                  Launch Live Analysis
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Camera className="h-5 w-5 text-primary" />
              <span className="font-semibold">FaceInsight</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Built with privacy in mind. All processing happens in your browser.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
