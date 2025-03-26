
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from '@/components/Navbar';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-secondary/30">
      <Navbar />
      
      <div className="container max-w-7xl mx-auto px-6 pt-32 pb-16">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
              <circle cx="12" cy="12" r="10" />
              <path d="m15 9-6 6" />
              <path d="m9 9 6 6" />
            </svg>
          </div>
          
          <h1 className="text-5xl font-bold mb-4">404</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-md">
            Oops! We couldn't find the page you're looking for.
          </p>
          
          <Link
            to="/"
            className="inline-flex h-12 items-center justify-center rounded-full px-8 bg-primary text-white hover:bg-primary/90 transition-colors text-base font-medium"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
