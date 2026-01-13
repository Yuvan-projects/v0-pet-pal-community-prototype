"use client"

import { Button } from "@/components/ui/button"
import { PawPrint, Users, MessageCircle, Heart, Sparkles, ArrowRight } from "lucide-react"

interface HeroSectionProps {
  onGetStarted: () => void
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  const features = [
    {
      icon: Users,
      title: "Community Support",
      description: "Connect with pet owners nearby who understand your challenges",
    },
    {
      icon: Sparkles,
      title: "AI Pet Assistant",
      description: "Get instant advice on behavior, nutrition, and first aid",
    },
    {
      icon: MessageCircle,
      title: "Problem Forum",
      description: "Ask questions and share solutions with the community",
    },
    {
      icon: Heart,
      title: "Local Meetups",
      description: "Find pet-friendly events and gatherings in your area",
    },
  ]

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/happy-golden-retriever-dog-and-tabby-cat-sitting-t.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        {/* Hero Content */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-accent/80 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <PawPrint className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-accent-foreground">Your Digital Town Square for Pet Owners</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 leading-tight text-balance">
            Solve Pet Problems <span className="text-primary">Together</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto text-pretty">
            Join a caring community of pet owners who help each other. Get AI-powered advice, share experiences, and
            find local meetups for you and your furry friends.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={onGetStarted}
              className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-8 gap-2 shadow-lg shadow-primary/30 text-lg h-12"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={onGetStarted}
              className="rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 text-lg h-12 bg-transparent"
            >
              Explore Community
            </Button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-border/50"
            >
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-card-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-card/80 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto border border-border/50">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "10K+", label: "Pet Owners" },
              { value: "5K+", label: "Problems Solved" },
              { value: "500+", label: "Monthly Meetups" },
              { value: "24/7", label: "AI Support" },
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-3xl font-extrabold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
