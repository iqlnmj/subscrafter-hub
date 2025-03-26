
import { Subscription, SubscriptionCategory } from "../types/subscription";

// Helper to generate random date within a range
const randomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

// Helper to generate random color
const getRandomColor = () => {
  const colors = [
    '#3B82F6', // blue-500
    '#10B981', // emerald-500
    '#6366F1', // indigo-500
    '#F59E0B', // amber-500
    '#EC4899', // pink-500
    '#8B5CF6', // violet-500
    '#F97316', // orange-500
    '#14B8A6', // teal-500
  ];
  
  return colors[Math.floor(Math.random() * colors.length)];
};

// Create mock subscriptions
export const generateMockSubscriptions = (count: number = 10): Subscription[] => {
  const subscriptions: Subscription[] = [
    {
      id: '1',
      name: 'Netflix',
      description: 'Streaming service for movies and TV shows',
      amount: 15.99,
      currency: 'USD',
      cycle: 'monthly',
      category: SubscriptionCategory.Entertainment,
      color: '#E50914',
      startDate: new Date('2023-01-15'),
      nextBillingDate: new Date(new Date().setDate(new Date().getDate() + 7)),
      active: true,
      url: 'https://netflix.com',
      logo: 'https://cdn.iconscout.com/icon/free/png-256/free-netflix-3521600-2945044.png'
    },
    {
      id: '2',
      name: 'Spotify',
      description: 'Music streaming service',
      amount: 9.99,
      currency: 'USD',
      cycle: 'monthly',
      category: SubscriptionCategory.Entertainment,
      color: '#1DB954',
      startDate: new Date('2023-02-10'),
      nextBillingDate: new Date(new Date().setDate(new Date().getDate() + 15)),
      active: true,
      url: 'https://spotify.com',
      logo: 'https://cdn.iconscout.com/icon/free/png-256/free-spotify-36-721973.png'
    },
    {
      id: '3',
      name: 'Adobe Creative Cloud',
      description: 'Suite of design software',
      amount: 52.99,
      currency: 'USD',
      cycle: 'monthly',
      category: SubscriptionCategory.Productivity,
      color: '#FF0000',
      startDate: new Date('2023-03-05'),
      nextBillingDate: new Date(new Date().setDate(new Date().getDate() + 10)),
      active: true,
      url: 'https://adobe.com',
      logo: 'https://cdn.iconscout.com/icon/free/png-256/free-adobe-1869025-1583149.png'
    }
  ];

  // Add additional random subscriptions if requested
  if (count > 3) {
    const services = [
      { name: 'Disney+', category: SubscriptionCategory.Entertainment, amount: 7.99, color: '#0063E5' },
      { name: 'Amazon Prime', category: SubscriptionCategory.Shopping, amount: 14.99, color: '#00A8E1' },
      { name: 'YouTube Premium', category: SubscriptionCategory.Entertainment, amount: 11.99, color: '#FF0000' },
      { name: 'Microsoft 365', category: SubscriptionCategory.Productivity, amount: 6.99, color: '#0078D4' },
      { name: 'HBO Max', category: SubscriptionCategory.Entertainment, amount: 14.99, color: '#5822B4' },
      { name: 'iCloud+', category: SubscriptionCategory.Utilities, amount: 2.99, color: '#007AFF' },
      { name: 'Notion', category: SubscriptionCategory.Productivity, amount: 5, color: '#000000' },
      { name: 'Grammarly', category: SubscriptionCategory.Productivity, amount: 11.66, color: '#15C39A' },
      { name: 'Dropbox', category: SubscriptionCategory.Utilities, amount: 9.99, color: '#0061FF' },
      { name: 'Hulu', category: SubscriptionCategory.Entertainment, amount: 7.99, color: '#1CE783' },
      { name: 'Canva Pro', category: SubscriptionCategory.Productivity, amount: 12.99, color: '#00C4CC' },
      { name: 'New York Times', category: SubscriptionCategory.Other, amount: 4.99, color: '#000000' }
    ];

    for (let i = 3; i < count; i++) {
      const service = services[i % services.length];
      subscriptions.push({
        id: (i + 1).toString(),
        name: service.name,
        description: `Subscription for ${service.name}`,
        amount: service.amount,
        currency: 'USD',
        cycle: Math.random() > 0.7 ? 'yearly' : 'monthly',
        category: service.category,
        color: service.color,
        startDate: randomDate(new Date(2022, 0, 1), new Date()),
        nextBillingDate: randomDate(new Date(), new Date(new Date().setMonth(new Date().getMonth() + 2))),
        active: Math.random() > 0.1, // 90% are active
        url: `https://${service.name.toLowerCase().replace(/\s+/g, '')}.com`
      });
    }
  }

  return subscriptions;
};

// Calculate subscription statistics
export const calculateSubscriptionStats = (subscriptions: Subscription[]) => {
  const activeSubscriptions = subscriptions.filter(sub => sub.active);
  
  // Calculate total monthly cost
  const totalMonthly = activeSubscriptions.reduce((total, sub) => {
    if (sub.cycle === 'monthly') return total + sub.amount;
    if (sub.cycle === 'yearly') return total + (sub.amount / 12);
    if (sub.cycle === 'weekly') return total + (sub.amount * 4.33); // Average weeks per month
    if (sub.cycle === 'quarterly') return total + (sub.amount / 3);
    return total;
  }, 0);

  // Calculate total yearly cost
  const totalYearly = totalMonthly * 12;

  // Calculate cost by category
  const byCategory = activeSubscriptions.reduce<{[category: string]: number}>((categories, sub) => {
    const monthlyAmount = 
      sub.cycle === 'monthly' ? sub.amount : 
      sub.cycle === 'yearly' ? (sub.amount / 12) :
      sub.cycle === 'weekly' ? (sub.amount * 4.33) :
      (sub.amount / 3); // quarterly
      
    categories[sub.category] = (categories[sub.category] || 0) + monthlyAmount;
    return categories;
  }, {});

  // Sort upcoming subscriptions by next billing date
  const upcoming = [...activeSubscriptions]
    .sort((a, b) => a.nextBillingDate.getTime() - b.nextBillingDate.getTime())
    .slice(0, 5);

  return {
    totalMonthly,
    totalYearly,
    byCategory,
    upcoming
  };
};

// Initial mock data
export const mockSubscriptions = generateMockSubscriptions(12);
export const mockStats = calculateSubscriptionStats(mockSubscriptions);
