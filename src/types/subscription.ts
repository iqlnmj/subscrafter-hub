
export interface Subscription {
  id: string;
  name: string;
  description?: string;
  logo?: string;
  amount: number;
  currency: string;
  cycle: 'monthly' | 'yearly' | 'weekly' | 'quarterly';
  category: string;
  color?: string;
  startDate: Date;
  nextBillingDate: Date;
  active: boolean;
  url?: string;
}

export interface SubscriptionStats {
  totalMonthly: number;
  totalYearly: number;
  byCategory: {
    [category: string]: number;
  };
  upcoming: Subscription[];
}

export enum SubscriptionCategory {
  Entertainment = 'Entertainment',
  Productivity = 'Productivity',
  Utilities = 'Utilities',
  Health = 'Health',
  Finance = 'Finance',
  Food = 'Food',
  Shopping = 'Shopping',
  Other = 'Other'
}
