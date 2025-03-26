
import React from 'react';
import { Subscription, SubscriptionStats as Stats } from '@/types/subscription';
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip } from 'recharts';
import { cn } from '@/lib/utils';

interface SubscriptionStatsProps {
  stats: Stats;
  className?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    payload: {
      name: string;
      value: number;
      color: string;
    };
  }>;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (!active || !payload || !payload.length) {
    return null;
  }

  const data = payload[0];
  
  return (
    <div className="bg-white p-3 shadow-lg rounded-lg border border-border">
      <p className="font-medium">{data.name}</p>
      <p className="text-sm text-muted-foreground">
        ${data.value.toFixed(2)} / month
      </p>
    </div>
  );
};

const SubscriptionStats: React.FC<SubscriptionStatsProps> = ({ stats, className }) => {
  // Format currency values
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Prepare data for the pie chart
  const pieData = Object.entries(stats.byCategory).map(([name, value]) => ({
    name,
    value,
    color: getCategoryColor(name),
  }));

  // Function to get a color for each category
  function getCategoryColor(category: string): string {
    const colorMap: Record<string, string> = {
      'entertainment': '#3B82F6', // blue-500
      'productivity': '#10B981', // emerald-500
      'utilities': '#6366F1',    // indigo-500
      'health': '#F59E0B',       // amber-500
      'finance': '#EC4899',      // pink-500
      'food': '#8B5CF6',         // violet-500
      'shopping': '#F97316',     // orange-500
      'other': '#14B8A6',        // teal-500
    };
    
    return colorMap[category.toLowerCase()] || '#64748B'; // slate-500 as default
  }

  return (
    <div className={cn("bg-white rounded-2xl border border-border shadow-sm", className)}>
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-6">Subscription Overview</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div className="bg-secondary/50 rounded-xl p-4">
            <p className="text-sm font-medium text-muted-foreground mb-1">Monthly Spending</p>
            <h3 className="text-2xl font-bold">{formatCurrency(stats.totalMonthly)}</h3>
          </div>
          <div className="bg-secondary/50 rounded-xl p-4">
            <p className="text-sm font-medium text-muted-foreground mb-1">Yearly Spending</p>
            <h3 className="text-2xl font-bold">{formatCurrency(stats.totalYearly)}</h3>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <h3 className="text-lg font-medium mb-3">Spending by Category</h3>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {pieData.map((entry) => (
                <div key={entry.name} className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-xs text-muted-foreground">{entry.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-medium mb-3">Upcoming Payments</h3>
            <div className="space-y-3">
              {stats.upcoming.map((sub) => (
                <div key={sub.id} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-8 h-8 rounded flex items-center justify-center text-white text-xs"
                      style={{ backgroundColor: sub.color || getCategoryColor(sub.category) }}
                    >
                      {sub.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{sub.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Intl.DateTimeFormat('en-US', {
                          month: 'short',
                          day: 'numeric'
                        }).format(sub.nextBillingDate)}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: sub.currency,
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 2,
                    }).format(sub.amount)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionStats;
