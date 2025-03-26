
import React, { useState } from 'react';
import { Subscription } from '@/types/subscription';
import SubscriptionCard from './SubscriptionCard';

interface SubscriptionListProps {
  subscriptions: Subscription[];
  onSelect?: (subscription: Subscription) => void;
  onDelete?: (id: string) => void;
}

const SubscriptionList: React.FC<SubscriptionListProps> = ({ 
  subscriptions,
  onSelect,
  onDelete
}) => {
  const [filter, setFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');

  // Filter subscriptions
  const filteredSubscriptions = subscriptions.filter(sub => {
    if (filter === 'all') return true;
    if (filter === 'active') return sub.active;
    if (filter === 'inactive') return !sub.active;
    return sub.category.toLowerCase() === filter.toLowerCase();
  });

  // Sort subscriptions
  const sortedSubscriptions = [...filteredSubscriptions].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'amount') return a.amount - b.amount;
    if (sortBy === 'date') return a.nextBillingDate.getTime() - b.nextBillingDate.getTime();
    return 0;
  });

  // Get unique categories for filter
  const categories = ['all', 'active', 'inactive', ...new Set(subscriptions.map(sub => sub.category.toLowerCase()))];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${
                filter === category
                  ? 'bg-primary text-white'
                  : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
        
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="text-sm border rounded-md px-3 py-1 bg-white text-foreground"
        >
          <option value="name">Sort by Name</option>
          <option value="amount">Sort by Amount</option>
          <option value="date">Sort by Next Payment</option>
        </select>
      </div>

      {sortedSubscriptions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedSubscriptions.map((subscription, index) => (
            <div
              key={subscription.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <SubscriptionCard 
                subscription={subscription} 
                onClick={onSelect}
                onDelete={onDelete ? () => onDelete(subscription.id) : undefined}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
          <div className="rounded-full bg-secondary w-16 h-16 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M3 9h18" />
              <path d="M9 21V9" />
            </svg>
          </div>
          <h3 className="text-lg font-medium mb-1">No subscriptions found</h3>
          <p className="text-muted-foreground max-w-md">
            No subscriptions match your current filters. Try changing your filter criteria or add a new subscription.
          </p>
        </div>
      )}
    </div>
  );
};

export default SubscriptionList;
