
import React, { useState, useEffect } from 'react';
import { Subscription } from '@/types/subscription';
import Navbar from '@/components/Navbar';
import SubscriptionList from '@/components/SubscriptionList';
import SubscriptionStats from '@/components/SubscriptionStats';
import AddSubscriptionForm from '@/components/AddSubscriptionForm';
import { mockSubscriptions, calculateSubscriptionStats } from '@/utils/mockData';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { PlusIcon, ArrowLeftIcon } from 'lucide-react';

const Dashboard = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [stats, setStats] = useState(calculateSubscriptionStats([]));
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingSubscription, setEditingSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Load mock data
  useEffect(() => {
    const loadData = () => {
      try {
        setSubscriptions(mockSubscriptions);
        setStats(calculateSubscriptionStats(mockSubscriptions));
      } catch (err) {
        console.error('Error loading mock data:', err);
        toast({
          title: "Error loading data",
          description: "There was a problem loading your subscription data.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    // Add a small delay to simulate API call
    const timer = setTimeout(loadData, 800);
    return () => clearTimeout(timer);
  }, []);

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

  const handleSelectSubscription = (subscription: Subscription) => {
    setEditingSubscription(subscription);
  };

  return (
    <div className="min-h-screen flex flex-col bg-secondary/30">
      <Navbar />
      
      <div className="flex-1 pt-16 overflow-hidden">
        <div className="container max-w-7xl mx-auto px-4 py-8 h-full overflow-y-auto">
          <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Subscription Dashboard</h1>
              <p className="text-muted-foreground">Track and manage all your subscriptions</p>
            </div>
            
            <Button
              onClick={() => {
                setShowAddForm(true);
                setEditingSubscription(null);
              }}
              className="inline-flex items-center"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Subscription
            </Button>
          </div>
          
          <div className="mb-8 animate-fade-in">
            <SubscriptionStats stats={stats} />
          </div>
          
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
                    <ArrowLeftIcon className="h-5 w-5" />
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
                  onDelete={handleDeleteSubscription}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
