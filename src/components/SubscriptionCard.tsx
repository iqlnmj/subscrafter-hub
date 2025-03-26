
import React from 'react';
import { Subscription } from '@/types/subscription';
import { cn } from '@/lib/utils';

interface SubscriptionCardProps {
  subscription: Subscription;
  onClick?: (subscription: Subscription) => void;
  onDelete?: () => void;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  subscription,
  onClick,
  onDelete,
}) => {
  const {
    name,
    description,
    logo,
    amount,
    currency,
    cycle,
    category,
    color,
    nextBillingDate,
    active
  } = subscription;
  
  // Format the next billing date
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(nextBillingDate);
  
  // Format the amount with currency
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
  
  // Handle frequency text
  const frequencyText = cycle === 'monthly' ? '/mo' : 
    cycle === 'yearly' ? '/yr' : 
    cycle === 'weekly' ? '/wk' : '/qtr';

  const handleCardClick = (e: React.MouseEvent) => {
    onClick?.(subscription);
  }

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.();
  }

  return (
    <div 
      className={cn(
        "relative overflow-hidden rounded-2xl transition-all duration-300",
        "bg-white border border-border hover:shadow-lg cursor-pointer",
        "group flex flex-col h-full"
      )}
      onClick={handleCardClick}
      style={{ borderLeft: color ? `4px solid ${color}` : undefined }}
    >
      <div className="p-6 flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            {logo ? (
              <div className="w-10 h-10 rounded-md overflow-hidden flex items-center justify-center bg-muted">
                <img src={logo} alt={name} className="w-8 h-8 object-contain" />
              </div>
            ) : (
              <div 
                className="w-10 h-10 rounded-md flex items-center justify-center text-white text-lg font-semibold"
                style={{ backgroundColor: color || '#3B82F6' }}
              >
                {name.charAt(0)}
              </div>
            )}
            <div>
              <h3 className="font-medium text-foreground">{name}</h3>
              <span className="text-xs text-muted-foreground font-medium">
                {category}
              </span>
            </div>
          </div>
          
          <div className="flex flex-col items-end">
            <span className="font-semibold text-foreground">{formattedAmount}</span>
            <span className="text-xs text-muted-foreground">{frequencyText}</span>
          </div>
        </div>
        
        {description && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{description}</p>
        )}
        
        <div className="mt-auto flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center">
            <span className="text-xs font-medium text-muted-foreground">Next payment</span>
            <span className="ml-2 text-xs font-semibold">{formattedDate}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className={cn(
              "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
              active 
                ? "bg-green-100 text-green-800" 
                : "bg-gray-100 text-gray-800"
            )}>
              {active ? 'Active' : 'Inactive'}
            </div>
            
            {onDelete && (
              <button 
                onClick={handleDeleteClick}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-red-100 text-red-500"
                aria-label="Delete subscription"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6h18"></path>
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </div>
  );
};

export default SubscriptionCard;
