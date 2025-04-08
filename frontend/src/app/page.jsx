import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Mic,
  Play,
  Headphones,
  Search,
  VolumeX,
  Volume2,
  FastForward,
  Rewind,
  ChevronRight,
} from "lucide-react";

const LandingPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Mic className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">PodStream</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Home
            </Link>
            <Link
              href="/browse-podcast"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Browse
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium transition-colors hover:text-primary hidden md:block"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="text-sm font-medium transition-colors hover:text-primary hidden md:block"
            >
              Register
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Discover and Listen to Podcasts with Just Your Voice
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    The world's first fully voice-o``perated podcast platform.
                    Search, play, and control your favorite shows using natural
                    voice commands.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="gap-1">
                    Try Voice Commands <Mic className="h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Play className="h-4 w-4" />
                    <span>10M+ podcasts</span>
                  </div>
                  <div className="h-1 w-1 rounded-full bg-muted-foreground"></div>
                  <div className="flex items-center gap-1">
                    <Headphones className="h-4 w-4" />
                    <span>5M+ active users</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[450px] w-[300px] overflow-hidden rounded-xl bg-gradient-to-b from-primary/20 to-primary/10 p-4 shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="relative z-10 flex h-full flex-col">
                    <div className="flex-1">
                      <div className="mt-8 flex justify-center">
                        <div className="h-24 w-24 rounded-full bg-primary/20 flex items-center justify-center">
                          <Mic className="h-12 w-12 text-primary animate-pulse" />
                        </div>
                      </div>
                      <div className="mt-6 text-center">
                        <p className="text-sm text-muted-foreground">
                          Listening for command...
                        </p>
                        <p className="mt-2 text-lg font-medium">
                          "Play the latest episode of Tech Talk"
                        </p>
                      </div>
                    </div>
                    <div className="rounded-lg bg-card p-4 shadow">
                      <div className="flex items-center gap-3">
                        <Image
                          src="/thumbnail.webp"
                          width={60}
                          height={60}
                          alt="Podcast cover"
                          className="rounded-md"
                        />
                        <div>
                          <h3 className="font-medium">Tech Talk</h3>
                          <p className="text-xs text-muted-foreground">
                            The Future of AI
                          </p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="h-1 w-full rounded-full bg-muted">
                          <div className="h-1 w-1/3 rounded-full bg-primary"></div>
                        </div>
                        <div className="mt-2 flex items-center justify-between text-xs">
                          <span>12:34</span>
                          <span>36:45</span>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <Rewind className="h-5 w-5" />
                        <Play className="h-8 w-8 text-primary" />
                        <FastForward className="h-5 w-5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                  Voice-First Design
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Speak to Control Everything
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our advanced voice recognition technology understands natural
                  language commands, making podcast discovery and listening
                  effortless.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <div className="grid gap-4 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mx-auto">
                  <Search className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Voice Search</h3>
                <p className="text-muted-foreground">
                  "Find podcasts about space exploration" or "Search for
                  interviews with Elon Musk"
                </p>
              </div>
              <div className="grid gap-4 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mx-auto">
                  <Play className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Playback Control</h3>
                <p className="text-muted-foreground">
                  "Play," "Pause," "Skip forward 30 seconds," or "Jump to 15
                  minutes"
                </p>
              </div>
              <div className="grid gap-4 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mx-auto">
                  <Volume2 className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Volume & Speed</h3>
                <p className="text-muted-foreground">
                  "Increase volume," "Decrease volume," "Play at 1.5x speed"
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  How It Works
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Using VoiceCast is as simple as speaking to a friend. Our
                  advanced AI understands your commands and preferences.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3">
              <div className="grid gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  1
                </div>
                <h3 className="text-xl font-bold">Activate Voice Mode</h3>
                <p className="text-muted-foreground">
                  Say "Hey VoiceCast" or tap the microphone button to activate
                  voice command mode.
                </p>
              </div>
              <div className="grid gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  2
                </div>
                <h3 className="text-xl font-bold">Speak Your Command</h3>
                <p className="text-muted-foreground">
                  Use natural language to tell VoiceCast what you want to do,
                  like "Find true crime podcasts" or "Play my favorites."
                </p>
              </div>
              <div className="grid gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  3
                </div>
                <h3 className="text-xl font-bold">Enjoy Hands-Free</h3>
                <p className="text-muted-foreground">
                  Control playback, adjust volume, bookmark episodes, and
                  more—all with just your voice.
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative rounded-xl overflow-hidden w-full max-w-4xl h-[400px] bg-muted">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button size="lg" className="gap-2">
                    <Play className="h-5 w-5" /> Watch Demo
                  </Button>
                </div>
                <Image
                  src="/user1.jpg"
                  width={800}
                  height={400}
                  alt="Voice podcast app demo"
                  className="w-full h-full object-cover opacity-50"
                />
              </div>
            </div>
          </div>
        </section>

        <section
          id="testimonials"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  What Our Users Say
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Thousands of podcast lovers are already enjoying the
                  hands-free experience.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="flex items-center gap-4">
                  <Image
                    src="/user1.jpg"
                    width={50}
                    height={50}
                    alt="User avatar"
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="font-bold">Sarah Johnson</h3>
                    <p className="text-sm text-muted-foreground">
                      Podcast Enthusiast
                    </p>
                  </div>
                </div>
                <p className="mt-4">
                  "I listen to podcasts while cooking, and VoiceCast has been a
                  game-changer. I can control everything without touching my
                  phone with messy hands!"
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="flex items-center gap-4">
                  <Image
                    src="/user2.jpg"
                    width={50}
                    height={50}
                    alt="User avatar"
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="font-bold">Michael Chen</h3>
                    <p className="text-sm text-muted-foreground">
                      Daily Commuter
                    </p>
                  </div>
                </div>
                <p className="mt-4">
                  "The voice search is incredibly accurate. I can find exactly
                  what I'm looking for without typing or scrolling through
                  endless lists."
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="flex items-center gap-4">
                  <Image
                    src="/user3.jpg"
                    width={50}
                    height={50}
                    alt="User avatar"
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="font-bold">Alex Rodriguez</h3>
                    <p className="text-sm text-muted-foreground">
                      Fitness Trainer
                    </p>
                  </div>
                </div>
                <p className="mt-4">
                  "I use VoiceCast during workouts. Being able to control
                  playback with voice commands while keeping my form is
                  perfect."
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Simple, Transparent Pricing
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose the plan that works best for your podcast listening
                  habits.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-bold">Free</h3>
                  <p className="text-muted-foreground">
                    Basic voice commands and podcast access
                  </p>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-bold">$0</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </div>
                <ul className="mt-6 space-y-2">
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-primary" />
                    <span>Basic voice commands</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-primary" />
                    <span>Access to 100,000+ podcasts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-primary" />
                    <span>Ad-supported listening</span>
                  </li>
                </ul>
                <Button className="mt-6 w-full">Get Started</Button>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-sm relative">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  Most Popular
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-bold">Premium</h3>
                  <p className="text-muted-foreground">
                    Enhanced voice features and ad-free experience
                  </p>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-bold">$9.99</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </div>
                <ul className="mt-6 space-y-2">
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-primary" />
                    <span>Advanced voice commands</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-primary" />
                    <span>Ad-free listening</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-primary" />
                    <span>Offline downloads</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-primary" />
                    <span>Higher audio quality</span>
                  </li>
                </ul>
                <Button className="mt-6 w-full">Subscribe Now</Button>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-bold">Family</h3>
                  <p className="text-muted-foreground">
                    Share premium features with up to 6 family members
                  </p>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-bold">$14.99</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </div>
                <ul className="mt-6 space-y-2">
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-primary" />
                    <span>All Premium features</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-primary" />
                    <span>Up to 6 family members</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-primary" />
                    <span>Family podcast sharing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-primary" />
                    <span>Parental controls</span>
                  </li>
                </ul>
                <Button className="mt-6 w-full">Get Family Plan</Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                    Ready to Try Voice-Powered Podcasts?
                  </h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Join thousands of podcast lovers who have transformed their
                    listening experience with VoiceCast.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="gap-1">
                    Get Started Free <Mic className="h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline">
                    Schedule a Demo
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                      <Headphones className="h-10 w-10 text-primary" />
                    </div>
                    <span className="text-center text-sm font-medium">
                      10M+ Podcasts
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                      <Mic className="h-10 w-10 text-primary" />
                    </div>
                    <span className="text-center text-sm font-medium">
                      Voice Control
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                      <VolumeX className="h-10 w-10 text-primary" />
                    </div>
                    <span className="text-center text-sm font-medium">
                      Ad-Free Option
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex items-center gap-2">
            <Mic className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">VoiceCast</span>
          </div>
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} VoiceCast. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
