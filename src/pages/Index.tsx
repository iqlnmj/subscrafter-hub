
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { cn } from '@/lib/utils';

const Index = () => {
  // Refs for animated sections
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -10% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe each section
    if (heroRef.current) observer.observe(heroRef.current);
    if (featuresRef.current) observer.observe(featuresRef.current);
    if (ctaRef.current) observer.observe(ctaRef.current);

    return () => observer.disconnect();
  }, []);

  // Features list
  const features = [
    {
      title: 'Track All Your Subscriptions',
      description: 'Keep track of all your subscriptions in one place. Never forget what you\'re paying for again.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="M3 9h18" />
          <path d="M9 21V9" />
        </svg>
      )
    },
    {
      title: 'Smart Reminders',
      description: 'Get notified before payments, so you always know what\'s coming up and can budget accordingly.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      )
    },
    {
      title: 'Beautiful Analytics',
      description: 'Visualize your spending habits with powerful charts and insights to optimize your budget.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
          <path d="M3 3v18h18" />
          <path d="m19 9-5 5-4-4-3 3" />
        </svg>
      )
    },
    {
      title: 'Cancel Unused Services',
      description: 'Identify subscriptions you don\'t use and easily manage cancellations to save money.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
          <path d="M2 20h.01" />
          <path d="M7 20v-4" />
          <path d="M12 20v-8" />
          <path d="M17 20V8" />
          <path d="M22 4v16" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div ref={heroRef} className="container max-w-7xl mx-auto px-6 opacity-0 transition-opacity duration-1000">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-1/2 space-y-6">
              <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 mb-4">
                <span className="text-xs font-medium text-primary">Manage your subscriptions effortlessly</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
                Take control of your <span className="text-gradient">subscriptions</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl">
                Subsy helps you track, manage, and optimize all your recurring expenses in one beautiful dashboard.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  to="/dashboard"
                  className={cn(
                    "inline-flex h-12 items-center justify-center rounded-full px-8",
                    "bg-primary text-white hover:bg-primary/90 transition-colors",
                    "text-base font-medium"
                  )}
                >
                  Get Started
                </Link>
                <a
                  href="#features"
                  className={cn(
                    "inline-flex h-12 items-center justify-center rounded-full px-8",
                    "bg-secondary text-foreground hover:bg-secondary/90 transition-colors",
                    "text-base font-medium"
                  )}
                >
                  Learn More
                </a>
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 glass">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent pointer-events-none" />
                <img 
                  src="https://via.placeholder.com/800x500?text=Dashboard+Preview" 
                  alt="Dashboard Preview"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -z-10 top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/20 rounded-full blur-[100px]" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 relative">
        <div ref={featuresRef} className="container max-w-7xl mx-auto px-6 opacity-0 transition-opacity duration-1000">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything you need to manage your subscriptions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Designed for simplicity and convenience, our platform provides all the tools you need to stay on top of your recurring expenses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-secondary/50">
        <div ref={ctaRef} className="container max-w-7xl mx-auto px-6 opacity-0 transition-opacity duration-1000">
          <div className="bg-white rounded-3xl shadow-xl border border-border overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to simplify your subscription management?
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Join thousands of users who have gained control of their recurring expenses with Subsy.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/dashboard"
                    className={cn(
                      "inline-flex h-12 items-center justify-center rounded-full px-8",
                      "bg-primary text-white hover:bg-primary/90 transition-colors",
                      "text-base font-medium"
                    )}
                  >
                    Get Started Free
                  </Link>
                </div>
              </div>
              <div className="hidden lg:block relative">
                <img
                  src="https://via.placeholder.com/600x400?text=App+Preview"
                  alt="App Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white border-t border-border">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <span className="text-2xl font-bold text-primary">Subsy</span>
              <p className="text-sm text-muted-foreground mt-2">
                © {new Date().getFullYear()} Subsy. All rights reserved.
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="space-y-2">
                <h4 className="font-medium">Product</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Integrations</a></li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Company</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Legal</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Terms</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Security</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
