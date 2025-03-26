
import React, { useState, useEffect } from 'react';
import { Subscription } from '@/types/subscription';
import Navbar from '@/components/Navbar';
import SubscriptionList from '@/components/SubscriptionList';
import SubscriptionStats from '@/components/SubscriptionStats';
import AddSubscriptionForm from '@/components/AddSubscriptionForm';
import { mockSubscriptions, calculateSubscriptionStats } from '@/utils/mockData';
import { toast } from '@/components/ui/use-toast';

const Dashboard = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [stats, setStats] = useState(calculateSubscriptionStats([]));
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingSubscription, setEditingSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Load initial data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setSubscriptions(mockSubscriptions);
      setStats(calculateSubscriptionStats(mockSubscriptions));
      setLoading(false);
    }, 800);
  }, []);

  // Handle add new subscription
  const handleAddSubscription = (data: Omit<Subscription, 'id'>) => {
    const newSubscription: Subscription = {
      ...data,
      id: Date.now().toString(),
    };
    
    const updatedSubscriptions = [...subscriptions, newSubscription];
    setSubscriptions(updatedSubscriptions);
    setStats(calculateSubscriptionStats(updatedSubscriptions));
    setShowAddForm(false);
    
    toast({
      title: "Subscription added",
      description: `${data.name} has been added to your subscriptions.`,
    });
  };

  // Handle edit subscription
  const handleEditSubscription = (data: Omit<Subscription, 'id'>) => {
    if (!editingSubscription) return;
    
    const updatedSubscriptions = subscriptions.map(sub => {
      if (sub.id === editingSubscription.id) {
        return { ...data, id: sub.id };
      }
      return sub;
    });
    
    setSubscriptions(updatedSubscriptions);
    setStats(calculateSubscriptionStats(updatedSubscriptions));
    setEditingSubscription(null);
    
    toast({
      title: "Subscription updated",
      description: `${data.name} has been updated.`,
    });
  };

  // Handle delete subscription
  const handleDeleteSubscription = (id: string) => {
    const subscription = subscriptions.find(sub => sub.id === id);
    if (!subscription) return;
    
    const updatedSubscriptions = subscriptions.filter(sub => sub.id !== id);
    setSubscriptions(updatedSubscriptions);
    setStats(calculateSubscriptionStats(updatedSubscriptions));
    
    toast({
      title: "Subscription deleted",
      description: `${subscription.name} has been removed from your subscriptions.`,
      variant: "destructive",
    });
  };

  // Handle subscription selection
  const handleSelectSubscription = (subscription: Subscription) => {
    setEditingSubscription(subscription);
  };

  return (
    <div className="min-h-screen bg-secondary/30 overflow-x-hidden">
      <Navbar />
      
      <main className="container max-w-7xl mx-auto px-6 pt-24 pb-16 overflow-y-auto">
        <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Subscription Dashboard</h1>
            <p className="text-muted-foreground">Track and manage all your subscriptions</p>
          </div>
          
          <button
            onClick={() => {
              setShowAddForm(true);
              setEditingSubscription(null);
            }}
            className="inline-flex items-center justify-center rounded-full bg-primary text-white px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Add Subscription
          </button>
        </div>
        
        {/* Stats Section */}
        <div className="mb-8 animate-fade-in">
          <SubscriptionStats stats={stats} />
        </div>
        
        {/* Main Content */}
        <div className="bg-white rounded-2xl border border-border shadow-sm p-6 mb-8">
          {loading ? (
            <div className="py-12 text-center">
              <div className="inline-block w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
              <p className="mt-4 text-muted-foreground">Loading your subscriptions...</p>
            </div>
          ) : showAddForm || editingSubscription ? (
            <div>
              <div className="mb-6 flex items-center">
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingSubscription(null);
                  }}
                  className="mr-4 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </button>
                <h2 className="text-xl font-semibold">
                  {editingSubscription ? 'Edit Subscription' : 'Add New Subscription'}
                </h2>
              </div>
              
              <AddSubscriptionForm
                onSubmit={editingSubscription ? handleEditSubscription : handleAddSubscription}
                onCancel={() => {
                  setShowAddForm(false);
                  setEditingSubscription(null);
                }}
                initialData={editingSubscription || undefined}
              />
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-semibold mb-6">Your Subscriptions</h2>
              
              <SubscriptionList 
                subscriptions={subscriptions} 
                onSelect={handleSelectSubscription}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
